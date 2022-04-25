<script setup lang="ts">
import {
  SetVehicleTrackersDocument,
  CreateTrackerDto,
  InstallNewTrackerOnVehicleDocument,
} from 'src/graphql/generated/graphql-operations'
import {
  HOMOLOGATED_TRACKER,
  TrackerDescription,
  trackerModel,
} from 'src/constants/tracker'
import TrackerIdentifierInput from 'src/components/input/TrackerIdentifierInput.vue'
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import SelectTracker from 'src/components/select/SelectTracker.vue'
import AddSimCardForm from './add-sim-form/AddSimCardForm.vue'
import { useMutation } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { cloneDeep } from 'lodash-es'
import { useQuasar } from 'quasar'
import { getUniqueViolationsFromGraphqlErrors } from 'src/graphql/graphql.utils'
import { ApolloError } from '@apollo/client'

const props = defineProps({
  /**
   * The vehicle to add trackers on
   */
  vehicleId: {
    type: Number,
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
}

const fullPhoneNumberToE164 = (phoneNumber: string) => {
  return `+${phoneNumber.replace(/\D/g, '')}`
}

watch(useExistingTracker, resetForm)

const { mutate: setTrackers, loading: settingTrackers } = useMutation(
  SetVehicleTrackersDocument
)

const { mutate: installTracker, loading: creatingTracker } = useMutation(
  InstallNewTrackerOnVehicleDocument
)

const setExistingTrackerToVehicle = (trackerId: number) => {
  setTrackers({ id: props.vehicleId, trackerIds: [trackerId] }).catch(() => {
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
    if (s.dto) s.dto.phoneNumber = fullPhoneNumberToE164(s.dto.phoneNumber)
  })

  installTracker({
    tracker,
    id: props.vehicleId,
  }).catch(({ graphQLErrors }: ApolloError) => {
    const uniqueViolations = getUniqueViolationsFromGraphqlErrors(graphQLErrors)

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
        @update:model-value="(xd) => xd"
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
