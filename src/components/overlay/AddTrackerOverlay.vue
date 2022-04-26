<script setup lang="ts">
import { VehicleModel } from 'src/graphql/generated/graphql-operations'
import AddTrackerForm from '../form/AddTrackerForm.vue'
import { ComponentPublicInstance, PropType, ref } from 'vue'

defineProps({
  vehicleToInstallTrackers: {
    type: Object as PropType<VehicleModel>,
    required: true,
  },
  showExcessiveTrackersInstalledWarning: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'update:model-value', payload: boolean): void
}>()

const addTrackerForm = ref<ComponentPublicInstance<{ resetForm: () => void }>>()

const resetAndClose = () => {
  addTrackerForm.value?.resetForm()
  emit('update:model-value', false)
}
</script>

<template>
  <q-drawer
    :width="350"
    side="right"
    bordered
    overlay
    class="bg-grey-2 q-pa-lg"
    elevated
  >
    <div class="row flex-center q-mb-lg">
      <div class="col-10 text-body2 q-pr-sm">
        Instalando novo rastreador no veículo
        <strong>{{ vehicleToInstallTrackers.plate }}</strong>
      </div>

      <div class="col-2 justify-end">
        <q-btn
          push
          size="sm"
          round
          icon="fa fa-arrow-right"
          class="q-mr-md"
          color="red"
          style="font-size: 12px"
          @click="resetAndClose"
        />
      </div>
    </div>

    <div
      v-show="showExcessiveTrackersInstalledWarning"
      class="row q-mb-lg q-px-md q-py-sm bg-primary text-white"
      style="border-radius: 5px"
    >
      <div class="text-body2">
        <q-icon name="fa fa-exclamation-circle" class="q-mr-sm" />
        Este veículo já tem um rastreador associado, recomendamos que associe
        apenas um rastreador por veículo
      </div>
    </div>

    <AddTrackerForm
      ref="addTrackerForm"
      :vehicle="vehicleToInstallTrackers"
      @new-tracker-instaled="$emit('update:model-value', false)"
      @existing-tracker-installed="$emit('update:model-value', false)"
    />
  </q-drawer>
</template>
