<script setup lang="ts">
defineProps({
  vehicle: {
    type: Object,
    required: true,
  },
})

const vehicleColumns = [
  {
    field: 'model',
    label: 'Modelo',
  },
  {
    field: 'color',
    label: 'Cor',
  },
  {
    field: 'renavam',
    label: 'Renavam',
  },
  {
    field: 'chassisNumber',
    label: 'Chassi',
  },
  {
    field: 'modelYear',
    label: 'Ano (modelo)',
  },
  {
    field: 'fabricationYear',
    label: 'Ano (fabricação)',
  },
]
</script>

<template>
  <q-card>
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
          :key="column.field"
          v-ripple
          clickable
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
