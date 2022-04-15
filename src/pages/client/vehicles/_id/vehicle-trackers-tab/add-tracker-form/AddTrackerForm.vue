<script setup lang="ts">
import { SetVehicleTrackersDocument } from 'src/graphql/generated/graphql-operations'
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import { trackerModel, HOMOLOGATED_TRACKER } from 'src/constants/tracker'
import SelectTracker from 'src/components/select/SelectTracker.vue'
import AddSimCardForm from './add-sim-form/AddSimCardForm.vue'
import { useMutation } from '@vue/apollo-composable'
import { computed, ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'

const props = defineProps({
  /**
   * The vehicle to add trackers on
   */
  vehicleId: {
    type: Number,
    required: true,
  },
})

interface NewSimCard {
  ssn: string
  phoneNumber: string
  apnUser: string
  apnAddress: string
  apnPassword: string
}

const model = ref<trackerModel | null>(null)

const useExistingTracker = ref(false)
const selectedTrackerId = ref<number | null>(null)

const simCardSlotsForModel = computed(() =>
  model.value ? HOMOLOGATED_TRACKER[model.value].simCardSlots : 0
)

const simCards = ref<(NewSimCard | number)[]>([])

const resetForm = () => {
  model.value = null
  selectedTrackerId.value = null
}

watch(useExistingTracker, resetForm)

const v = useVuelidate()

const { mutate: setTrackers, loading: settingTrackers } = useMutation(
  SetVehicleTrackersDocument
)

const submit = () => {
  if (v.value.$invalid) return

  if (useExistingTracker.value && selectedTrackerId.value) {
    setTrackers({
      id: props.vehicleId,
      trackerIds: [selectedTrackerId.value],
    }).catch(console.error)
  }
}
</script>

<template>
  <div>
    <q-btn-group outline style="width: 100%" class="q-mb-md">
      <q-btn
        :outline="!useExistingTracker"
        :color="useExistingTracker ? 'primary' : 'grey'"
        :disable="settingTrackers"
        label="Usar existente"
        class="col-6"
        @click="useExistingTracker = true"
      />
      <q-btn
        :outline="useExistingTracker"
        :color="!useExistingTracker ? 'primary' : 'grey'"
        :disable="settingTrackers"
        class="col-6"
        label="Cadastrar novo"
        @click="useExistingTracker = false"
      />
    </q-btn-group>

    <template v-if="useExistingTracker">
      <SelectTracker v-model="selectedTrackerId" />
    </template>

    <template v-else>
      <TrackerModelInput v-model="model" />

      <AddSimCardForm
        v-for="index in simCardSlotsForModel"
        :key="`sim-card-form-${index}`"
        v-model="simCards[index - 1]"
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
