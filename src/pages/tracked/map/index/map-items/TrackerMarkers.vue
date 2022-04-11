<script setup lang="ts">
import {
  ListActiveTrackersDocument,
  ListActiveTrackersQuery,
  TrackerModel,
} from '../../../../../graphql/generated/graphql-operations'
import { useTrackedMap } from 'src/state/tracked-map.state'
import Marker from 'src/components/google-maps/Marker.vue'
import { computed, inject, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { MapSymbol } from 'src/components/google-maps/map/GoogleMap'

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

const map = inject(MapSymbol, ref(null))

const { result } = useQuery(ListActiveTrackersDocument)
const { state: trackedMapState } = useTrackedMap()

const trackersToShow = computed(() => {
  const all = result.value?.activeTrackers ?? []

  return all.filter((t) => trackedMapState.selectedTrackerIds.includes(t.id))
})

const fitMapToTrackersBounds = (
  trackers: ListActiveTrackersQuery['activeTrackers']
) => {
  if (!map.value) return

  const bounds = new google.maps.LatLngBounds()

  trackers.forEach((tracker) => {
    if (tracker.lastPosition) bounds.extend(tracker.lastPosition)
  })

  map.value.fitBounds(bounds)
}

watch(
  trackersToShow,
  (trackers) => {
    if (
      trackers.length > 0 &&
      trackedMapState.options.fitMapOnTrackerSelection
    ) {
      fitMapToTrackersBounds(trackers)
    }
  },
  { immediate: true }
)
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
