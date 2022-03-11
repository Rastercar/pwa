<script setup lang="ts">
import { vehicleColumns } from './vehicle-datatable.common'

defineProps({
  vehicle: { type: Object, required: true },
})
</script>

<template>
  <!-- Do not change this id -->
  <q-card :id="`vehicle-row-${vehicle.id}`">
    <img
      src="https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202202/20220207/HONDA-CIVIC-2.0-16V-FLEXONE-EX-4P-CVT-wmimagem12353504220.jpg"
    />

    <q-card-section class="text-center q-pa-sm">
      <span class="text-grey-8">placa: </span>
      <strong>{{ vehicle.plate }}</strong>
    </q-card-section>

    <q-separator />

    <q-card-section class="q-px-none q-py-sm">
      <q-list dense>
        <q-item
          v-for="column in vehicleColumns"
          v-show="column.field !== 'plate'"
          :key="column.field"
          :clickable="!!vehicle[column.field]"
        >
          <q-item-section>
            <div class="flex">
              <div class="text-grey-8 q-mr-sm">
                {{ column.label }}
              </div>
              <div :class="{ 'text-grey-5': !vehicle[column.field] }">
                {{ vehicle[column.field] ?? 'não informado' }}
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
