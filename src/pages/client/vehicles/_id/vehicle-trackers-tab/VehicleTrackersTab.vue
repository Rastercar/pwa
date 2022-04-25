<script setup lang="ts">
import type {
  TrackerModel,
  VehicleModel,
} from 'src/graphql/generated/graphql-operations'
import { FullVehicleQuery } from 'src/graphql/generated/graphql-operations'
import AddTrackerForm from './add-tracker-form/AddTrackerForm.vue'
import TrackerCard from './TrackerCard.vue'
import { PropType, ref } from 'vue'
import RemoveTrackerDialog from 'src/components/dialog/RemoveTrackerDialog.vue'

defineProps({
  vehicle: {
    type: Object as PropType<NonNullable<FullVehicleQuery['vehicle']>>,
    required: true,
  },
})

defineEmits<{
  (event: 'tracker-removed', payload: TrackerModel): void
}>()

const trackerToRemove = ref<TrackerModel | null>(null)

const showRmTrakckerDialog = ref(false)

const onRmTrackerBtnClick = (tracker: TrackerModel) => {
  trackerToRemove.value = tracker
  showRmTrakckerDialog.value = true
}
</script>

<template>
  <div v-if="vehicle.trackers.length === 0">
    <div class="text-h6">Nenhum rastreador instalado</div>

    <q-separator class="q-my-md" />

    <AddTrackerForm :vehicle-id="vehicle.id" />
  </div>

  <TrackerCard
    v-for="(tracker, i) in vehicle.trackers"
    v-else
    :key="`tracker-${tracker.id}`"
    :show-add-tracker-btn="i < 3"
    :slot-index="i + 1"
    :tracker="(tracker as TrackerModel)"
    :class="{ 'q-mb-md': i + 1 !== vehicle.trackers.length }"
    @remove-btn-click="() => onRmTrackerBtnClick(tracker as TrackerModel)"
  />

  <RemoveTrackerDialog
    v-if="trackerToRemove"
    v-model="showRmTrakckerDialog"
    :tracker="trackerToRemove"
    :vehicle="(vehicle as VehicleModel)"
    @removal:success="$emit('tracker-removed', trackerToRemove as TrackerModel)"
  />
</template>
