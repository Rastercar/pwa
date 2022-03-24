<script setup lang="ts">
import {
  OnTrackerPositionRecievedDocument,
  TrackerModel,
} from '../../../../../graphql/generated/graphql-operations'
import { useTrackedMap } from 'src/state/tracked-map.state'
import Marker from 'src/components/google-maps/Marker.vue'
import { useSubscription } from '@vue/apollo-composable'

defineEmits<{
  (event: 'tracker:selected', tracker: TrackerModel): void
}>()

const { state } = useTrackedMap()

const square = {
  path: 'M -7,-2 7,-2 7,2 -7,2 z',
  strokeColor: '#dbdbdb',
  fillColor: '#dbdbdb',
  fillOpacity: 1,
  scale: 4.5,
}

const { result, start } = useSubscription(OnTrackerPositionRecievedDocument)

start()
</script>

<template>
  <Marker
    v-for="tracker in state.selectedTrackers"
    :key="tracker.id"
    :options="{
      position: result?.onPositionRecieved as any,
      label: 'ASD3343',
      icon: square
    }"
    @click="$emit('tracker:selected', tracker)"
  />
</template>
