<script setup lang="ts">
import { vehicleColumns } from './vehicle-datatable.common'
import { computed } from 'vue'

const props = defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})

const photoSrc = computed(() => {
  return props.vehicle.photo && typeof props.vehicle.photo === 'string'
    ? `${process.env.RASTERCAR_UPLOADS_URL}/${props.vehicle.photo}`
    : null
})
</script>

<template>
  <!-- Do not change this id -->
  <q-card :id="`vehicle-row-${vehicle.id}`" flat bordered>
    <q-img
      :src="photoSrc || require('../../../../../assets/placeholders/car.png')"
      style="height: 150px"
      fit="cover"
    />

    <q-separator />

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
                {{ vehicle[column.field] || 'não informado' }}
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
