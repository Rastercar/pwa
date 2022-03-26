<script setup lang="ts">
import {
  ListActiveTrackersDocument,
  TrackerModel,
} from '../../../../../graphql/generated/graphql-operations'
import Marker from 'src/components/google-maps/Marker.vue'
import { useTrackedMap } from 'src/state/tracked-map.state'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'

defineEmits<{
  (event: 'tracker:selected', tracker: TrackerModel): void
}>()

const markerIcon = {
  path: 'M -7,-2 7,-2 7,2 -7,2 z',
  fillColor: '#dbdbdb',
  strokeColor: '#dbdbdb',
  scale: 4.5,
  fillOpacity: 1,
}

const { result } = useQuery(ListActiveTrackersDocument)

const { state: trackedMapState } = useTrackedMap()

const trackersToShow = computed(() => {
  const all = result.value?.allActiveTrackers ?? []

  return all.filter((t) => trackedMapState.selectedTrackerIds.includes(t.id))
})
</script>

<template>
  <Marker
    v-for="tracker in trackersToShow"
    :key="tracker.id"
    :options="{
      icon: markerIcon,
      label: tracker.vehicle.plate,
      position: tracker.lastPosition ?? { lat: 0, lng: 0 },
    }"
    @click="$emit('tracker:selected', tracker as any)"
  />
</template>
