<script setup lang="ts">
import type { VehicleModel } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'

defineProps({
  vehicle: {
    type: Object as PropType<VehicleModel>,
    default: null,
    required: false,
  },
})
</script>

<template>
  <q-menu>
    <q-list v-if="vehicle" style="min-width: 100px">
      <q-item
        :to="{
          name: 'cliente-veiculo',
          params: { id: vehicle.id },
        }"
        clickable
      >
        <q-item-section>Editar</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
