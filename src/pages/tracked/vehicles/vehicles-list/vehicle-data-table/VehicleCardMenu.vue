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
          name: 'veiculo',
          params: { id: vehicle.id },
        }"
        clickable
      >
        <q-item-section>Editar</q-item-section>
      </q-item>

      <q-separator />

      <!-- <q-item clickable :to="{ name: 'vehicle', params: { id: vehicle.id } }">
        <q-item-section>Ver detalhes</q-item-section>
      </q-item> -->
    </q-list>
  </q-menu>
</template>
