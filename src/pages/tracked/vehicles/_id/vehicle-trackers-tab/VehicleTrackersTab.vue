<script setup lang="ts">
import type { TrackerModel } from 'src/graphql/generated/graphql-operations'
import { FullVehicleQuery } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'
import TrackerCard from './TrackerCard.vue'

defineProps({
  vehicle: {
    type: Object as PropType<NonNullable<FullVehicleQuery['vehicle']>>,
    required: true,
  },
})
</script>

<template>
  <!-- TODO: REMOVE ME: com id = 19 sem id = 223  -->
  <div v-if="vehicle.trackers.length === 0">
    <div class="text-h6">
      <q-icon name="fa fa-sim-card" class="q-mr-sm" />
      Nenhum rastreador instalado
    </div>

    <q-btn color="green" icon="fa fa-plus" label="adicionar" size="md" />
  </div>

  <div>
    <TrackerCard
      v-for="tracker in vehicle.trackers"
      :key="`tracker-${tracker.id}`"
      :tracker="(tracker as TrackerModel)"
    />
  </div>
</template>
