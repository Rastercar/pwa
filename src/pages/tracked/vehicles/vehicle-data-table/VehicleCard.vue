<script setup lang="ts">
import { computed } from 'vue'
import { vehicleColumns } from './vehicle-datatable.common'

const props = defineProps({
  vehicle: { type: Object, required: true },
})

const photoSrc = computed(() => {
  return props.vehicle.photo && typeof props.vehicle.photo === 'string'
    ? `${process.env.RASTERCAR_UPLOADS_URL}/${props.vehicle.photo}`
    : 'https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202202/20220207/HONDA-CIVIC-2.0-16V-FLEXONE-EX-4P-CVT-wmimagem12353504220.jpg'
})
</script>

<template>
  <!-- Do not change this id -->
  <q-card :id="`vehicle-row-${vehicle.id}`" flat bordered>
    <img :src="photoSrc" />

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
