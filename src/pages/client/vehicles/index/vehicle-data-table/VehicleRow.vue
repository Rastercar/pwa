<script setup lang="ts">
import { vehicleColumns } from './vehicle-datatable.common'

defineProps({
  vehicle: { type: Object, required: true },
})
</script>

<template>
  <q-tr :id="`vehicle-row-${vehicle.id}`">
    <q-td v-for="column in vehicleColumns" :key="column.field">
      <span>{{ vehicle[column.field] }}</span>
    </q-td>
  </q-tr>
</template>
