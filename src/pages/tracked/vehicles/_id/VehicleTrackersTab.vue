<script setup lang="ts">
import { FullVehicleQuery } from 'src/graphql/generated/graphql-operations'
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
    {{ vehicle }}
  </div>
</template>
