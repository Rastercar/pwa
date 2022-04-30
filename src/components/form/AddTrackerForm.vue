<script setup lang="ts">
import {
  SetVehicleTrackersDocument,
  CreateTrackerDto,
  InstallNewTrackerOnVehicleDocument,
  VehicleModel,
} from 'src/graphql/generated/graphql-operations'
import {
  HOMOLOGATED_TRACKER,
  TrackerDescription,
  trackerModel,
} from 'src/constants/tracker'
import TrackerIdentifierInput from 'src/components/input/TrackerIdentifierInput.vue'
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import SelectTracker from 'src/components/select/SelectTracker.vue'
import { useMutation } from '@vue/apollo-composable'
import { computed, PropType, ref, watch } from 'vue'
import { ApolloError } from '@apollo/client'
import useVuelidate from '@vuelidate/core'
import { cloneDeep } from 'lodash-es'
import { useQuasar } from 'quasar'
import AddSimCardForm from 'src/components/form/AddSimCardForm.vue'
import { maskedPhoneNumberToE164 } from 'src/utils/string/phone-number.utils'

const emit = defineEmits<{
  (event: 'new-tracker-instaled'): void
  (event: 'existing-tracker-installed'): void
}>()

const props = defineProps({
  /**
   * The vehicle to add trackers on
   */
  vehicle: {
    type: Object as PropType<VehicleModel>,
    required: true,
  },
})

const v = useVuelidate({ $autoDirty: true })
const quasar = useQuasar()

const trackerIdentifiersInUse = ref<string[]>([])

const emptyNewTracker = { model: '', identifier: '', simCards: [] }

const newTracker = ref<CreateTrackerDto>({ ...emptyNewTracker })

const useExistingTracker = ref(false)
const selectedTrackerId = ref<number | null>(null)

const simCardSlotsForModel = computed(() => {
  const model = newTracker.value.model as trackerModel

  const trackerModelObj: TrackerDescription | undefined =
    HOMOLOGATED_TRACKER[model]

  return trackerModelObj?.simCardSlots || 0
})

const resetForm = () => {
  newTracker.value = { ...emptyNewTracker }
  selectedTrackerId.value = null
  trackerIdentifiersInUse.value = []

  v.value.$reset()
}

watch(useExistingTracker, resetForm)

const { mutate: setTrackers, loading: settingTrackers } = useMutation(
  SetVehicleTrackersDocument
)

const { mutate: installTracker, loading: creatingTracker } = useMutation(
  InstallNewTrackerOnVehicleDocument
)

const setExistingTrackerToVehicle = (trackerId: number) => {
  setTrackers({
    id: props.vehicle.id,
    trackerIds: [...props.vehicle.trackers.map((t) => t.id), trackerId],
  })
    .then(() => {
      emit('existing-tracker-installed')
      resetForm()
    })
    .catch(() => {
      quasar.notify({
        type: 'negative',
        message: 'Erro ao configurar rastreadores do veículo',
      })
    })
}

const installNewTrackersOnVehicle = (dto: CreateTrackerDto) => {
  // Since dto.trackers is a array of refs we need to remove the reactivity to be
  // able to alter the phone number, a lazy solution is to deepClone the object
  const tracker = cloneDeep(dto)

  tracker.simCards.forEach((s) => {
    if (s.dto) s.dto.phoneNumber = maskedPhoneNumberToE164(s.dto.phoneNumber)
  })

  installTracker({
    tracker,
    id: props.vehicle.id,
  })
    .then(() => {
      emit('new-tracker-instaled')
      resetForm()
    })
    .catch(({ graphQLErrors }: ApolloError) => {
      const uniqueViolations =
        getUniqueViolationsFromGraphqlErrors(graphQLErrors)

      if (uniqueViolations.includes('identifier')) {
        trackerIdentifiersInUse.value.push(tracker.identifier)
      } else {
        quasar.notify({
          type: 'negative',
          message: 'Erro ao instalar rastreadores no veículo',
        })
      }
    })
}

const submit = () => {
  if (v.value.$invalid) return

  if (useExistingTracker.value && selectedTrackerId.value) {
    setExistingTrackerToVehicle(selectedTrackerId.value)
  } else if (newTracker.value.model !== null) {
    installNewTrackersOnVehicle(newTracker.value)
  }
}

defineExpose({ resetForm })
</script>

<template>
  <div>
    <q-btn-group outline style="width: 100%" class="q-mb-md">
      <q-btn
        :outline="!useExistingTracker"
        :color="useExistingTracker ? 'primary' : 'grey'"
        :disable="settingTrackers || creatingTracker"
        label="Usar existente"
        class="col-6"
        @click="useExistingTracker = true"
      />

      <q-btn
        :outline="useExistingTracker"
        :color="!useExistingTracker ? 'primary' : 'grey'"
        :disable="settingTrackers || creatingTracker"
        class="col-6"
        label="Cadastrar novo"
        @click="useExistingTracker = false"
      />
    </q-btn-group>

    <SelectTracker v-if="useExistingTracker" v-model="selectedTrackerId" />

    <template v-else>
      <TrackerModelInput v-model="newTracker.model" />

      <TrackerIdentifierInput
        v-model="newTracker.identifier"
        :identifiers-in-use="trackerIdentifiersInUse"
        class="q-mb-md"
      />

      <AddSimCardForm
        v-for="index in simCardSlotsForModel"
        :key="`sim-card-form-${index}`"
        v-model="newTracker.simCards[index - 1]"
        flat
        bordered
      >
        <template #title>
          <q-card-section class="q-pb-none text-body1">
            <q-icon name="fa fa-sim-card" class="q-mr-sm" />
            Slot SIM Card - {{ index }}
          </q-card-section>
        </template>
      </AddSimCardForm>
    </template>

    <q-card-section class="flex q-pb-none q-px-none">
      <q-space />

      <q-btn
        color="green"
        :disable="v.$invalid"
        :label="
          useExistingTracker ? 'Instalar rastreador' : 'Cadastrar Rastreador'
        "
        :loading="settingTrackers || creatingTracker"
        @click="submit"
      />
    </q-card-section>
  </div>
</template>
