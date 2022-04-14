<script setup lang="ts">
import type { TrackerModel } from 'src/graphql/generated/graphql-operations'
import { FullVehicleQuery } from 'src/graphql/generated/graphql-operations'
import AddTrackerForm from './add-tracker-form/AddTrackerForm.vue'
import TrackerCard from './TrackerCard.vue'
import { PropType } from 'vue'

defineProps({
  vehicle: {
    type: Object as PropType<NonNullable<FullVehicleQuery['vehicle']>>,
    required: true,
  },
})
</script>

<template>
  <div v-if="vehicle.trackers.length === 0">
    <div class="text-h6">Nenhum rastreador instalado</div>

    <q-separator class="q-my-md" />

    <AddTrackerForm :vehicle-id="vehicle.id" />
  </div>

  <TrackerCard
    v-for="tracker in vehicle.trackers"
    v-else
    :key="`tracker-${tracker.id}`"
    :tracker="(tracker as TrackerModel)"
  />
</template>
