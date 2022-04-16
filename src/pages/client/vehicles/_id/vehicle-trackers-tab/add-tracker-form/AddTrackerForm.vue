<script setup lang="ts">
import {
  SetVehicleTrackersDocument,
  InstallVehicleTrackerDocument,
  CreateTrackerDto,
} from 'src/graphql/generated/graphql-operations'
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import { trackerModel, HOMOLOGATED_TRACKER } from 'src/constants/tracker'
import SelectTracker from 'src/components/select/SelectTracker.vue'
import AddSimCardForm from './add-sim-form/AddSimCardForm.vue'
import { useMutation } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'

const props = defineProps({
  /**
   * The vehicle to add trackers on
   */
  vehicleId: {
    type: Number,
    required: true,
  },
})

// TODO: FIX TYPES (USE QUERY TYPES ?)
// CLEANUP submit() CODE
// FORMAT PHONE NUMBERS TO E164 BEFORE SENDING

interface NewSimCard {
  ssn: string
  phoneNumber: string
  apnUser: string
  apnAddress: string
  apnPassword: string
}

interface NewTracker {
  model: trackerModel | null
  identifier: string
  simCards: NewSimCard[]
}

const emptyNewTracker = { model: null, identifier: '', simCards: [] }

const newTracker = ref<NewTracker>({ ...emptyNewTracker })

const useExistingTracker = ref(false)
const selectedTrackerId = ref<number | null>(null)

const simCardSlotsForModel = computed(() =>
  newTracker.value.model
    ? HOMOLOGATED_TRACKER[newTracker.value.model]?.simCardSlots || 0
    : 0
)

const resetForm = () => {
  newTracker.value = { ...emptyNewTracker }
  selectedTrackerId.value = null
}

watch(useExistingTracker, resetForm)

const rules = {
  identifier: {
    required: helpers.withMessage(
      'Informe um identificador unico para o rastreador',
      required
    ),
  },
}

const v = useVuelidate(rules, newTracker, { $autoDirty: true })

const { mutate: setTrackers, loading: settingTrackers } = useMutation(
  SetVehicleTrackersDocument
)

const { mutate: installTracker, loading: creatingTracker } = useMutation(
  InstallVehicleTrackerDocument
)

const submit = () => {
  if (v.value.$invalid) return

  if (useExistingTracker.value && selectedTrackerId.value) {
    setTrackers({
      id: props.vehicleId,
      trackerIds: [selectedTrackerId.value],
    }).catch(console.error)
  } else if (newTracker.value.model !== null) {
    installTracker({
      tracker: newTracker.value as CreateTrackerDto,
      id: props.vehicleId,
    }).catch(console.error)
  }
}
</script>

<template>
  <div>
    {{ newTracker }}
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

    <template v-if="useExistingTracker">
      <SelectTracker v-model="selectedTrackerId" />
    </template>

    <template v-else>
      <TrackerModelInput v-model="newTracker.model" />

      <q-input
        v-model="newTracker.identifier"
        label="Identificador"
        filled
        class="q-mb-md"
        :error="v.identifier.$error"
        :error-message="getVuelidateErrorMsg(v.identifier.$errors)"
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
        @click="submit"
      />
    </q-card-section>
  </div>
</template>
