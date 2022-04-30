<script setup lang="ts">
import type {
  SimCardModel,
  TrackerModel,
  VehicleModel,
} from 'src/graphql/generated/graphql-operations'
import { FullVehicleQuery } from 'src/graphql/generated/graphql-operations'
import TrackerCard from './TrackerCard.vue'
import { PropType, ref } from 'vue'
import RemoveTrackerDialog from 'src/components/dialog/RemoveTrackerDialog.vue'
import AddTrackerOverlay from 'src/components/overlay/AddTrackerOverlay.vue'
import AddTrackerForm from 'src/components/form/AddTrackerForm.vue'
import AddSimCardOverlay from 'src/components/overlay/AddSimCardOverlay.vue'
import RemoveSimCardDialog from 'src/components/dialog/RemoveSimCardDialog.vue'

defineProps({
  vehicle: {
    type: Object as PropType<NonNullable<FullVehicleQuery['vehicle']>>,
    required: true,
  },
})

defineEmits<{
  (event: 'tracker-removed', payload: TrackerModel): void
  (event: 'sim-card-removed', payload: SimCardModel): void
}>()

const trackerToRemove = ref<TrackerModel | null>(null)
const simCardToRemove = ref<SimCardModel | null>(null)

const overlayInView = ref<'add-tracker-overlay' | 'add-sim-overlay' | null>(
  null
)

const showRmTrackerDialog = ref(false)
const showRmSimDialog = ref(false)

const onRmTrackerBtnClick = (tracker: TrackerModel) => {
  trackerToRemove.value = tracker
  showRmTrackerDialog.value = true
}

const trackerToInstallSimCardOn = ref<TrackerModel | null>(null)

const onAddSimCardToTrackerClicked = (tracker: TrackerModel) => {
  trackerToInstallSimCardOn.value = tracker
  overlayInView.value = 'add-sim-overlay'
}

const onRemoveSimCardClicked = (simToRemove: SimCardModel) => {
  simCardToRemove.value = simToRemove
  showRmSimDialog.value = true
}
</script>

<template>
  <div v-if="vehicle.trackers.length === 0">
    <div class="text-h6">Nenhum rastreador instalado</div>

    <q-separator class="q-my-md" />

    <AddTrackerForm :vehicle="(vehicle as VehicleModel)" />
  </div>

  <TrackerCard
    v-for="(tracker, i) in vehicle.trackers"
    v-else
    :key="`tracker-${tracker.id}`"
    :show-add-tracker-btn="i < 3"
    :slot-index="i + 1"
    :tracker="(tracker as TrackerModel)"
    :class="{ 'q-mb-md': i + 1 !== vehicle.trackers.length }"
    @add-sim-clicked="() => onAddSimCardToTrackerClicked(tracker as TrackerModel)"
    @remove-sim-clicked="onRemoveSimCardClicked"
  >
    <template #header>
      <q-card-section class="flex ext-center q-py-md items-center">
        <span class="text-grey-8">Rastreador {{ i + 1 }} - Modelo:</span>
        <strong class="q-ml-sm">{{ tracker.model }}</strong>

        <q-space />

        <q-btn
          v-if="i < 3"
          push
          color="green"
          size="sm"
          round
          icon="fa fa-plus"
          class="q-mr-md"
          @click="overlayInView = 'add-tracker-overlay'"
        />

        <q-btn
          push
          color="red"
          size="sm"
          round
          icon="fa fa-trash"
          @click="() => onRmTrackerBtnClick(tracker as TrackerModel)"
        />
      </q-card-section>
    </template>
  </TrackerCard>

  <AddTrackerOverlay
    :model-value="overlayInView === 'add-tracker-overlay'"
    :vehicle-to-install-trackers="(vehicle as VehicleModel)"
    :show-excessive-trackers-installed-warning="vehicle.trackers.length >= 1"
    @update:model-value="
      (v) => (overlayInView = v ? 'add-tracker-overlay' : null)
    "
  />

  <AddSimCardOverlay
    v-if="trackerToInstallSimCardOn"
    :model-value="overlayInView === 'add-sim-overlay'"
    :tracker-to-install-sims="trackerToInstallSimCardOn"
    @update:model-value="(v) => (overlayInView = v ? 'add-sim-overlay' : null)"
  />

  <RemoveTrackerDialog
    v-if="trackerToRemove"
    v-model="showRmTrackerDialog"
    :tracker="trackerToRemove"
    :vehicle="(vehicle as VehicleModel)"
    @removal:success="$emit('tracker-removed', trackerToRemove)"
  />

  <RemoveSimCardDialog
    v-if="simCardToRemove"
    v-model="showRmSimDialog"
    :sim-card="simCardToRemove"
    @removal:success="$emit('sim-card-removed', simCardToRemove)"
  />
</template>
