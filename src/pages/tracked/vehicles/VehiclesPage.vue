<script setup lang="ts">
import { ref } from 'vue'
import VehicleCard from './VehicleCard.vue'

const columns = [
  { name: 'plate', label: 'Placa', field: 'plate' },
  { name: 'model', label: 'Modelo', field: 'calories' },
  { name: 'color', label: 'Cor', field: 'color' },
  { name: 'renavam', label: 'Renavam', field: 'renavam' },
  { name: 'modelYear', label: 'Ano Modelo', field: 'modelYear' },
  { name: 'chassisNumber', label: 'Chassi', field: 'chassisNumber' },
  {
    name: 'fabricationYear',
    label: 'Ano Fabricação',
    field: 'fabricationYear',
  },
]

const rows = [...Array(20).keys()].map(() => ({
  plate: 'ABC-12873',
  model: Math.random() < 0.5 ? 'civic' : 'corola',
  color: Math.random() < 0.5 ? 'vermelho' : null,
  renavam: Math.random() < 0.5 ? 'asdgasuasdgdda' : null,
  modelYear: Math.random() < 0.5 ? 2018 : null,
  chassisNumber: Math.random() < 0.5 ? '12376811638276' : null,
  fabricationYear: Math.random() < 0.5 ? 2019 : null,
}))

const grid = ref(true)
</script>

<template>
  <q-page padding class="justify-center" style="background-color: #f9f9f9">
    <q-table
      title="Meus Veículos"
      :columns="columns"
      :rows="rows"
      :grid="grid"
      :rows-per-page-options="[10, 20, 30, 50]"
      separator="vertical"
      row-key="field"
    >
      <template #top>
        <q-icon
          :class="{ 'q-mb-sm': grid }"
          class="q-mr-md"
          name="fa fa-car"
          size="lg"
          color="blue-8"
        />
        <div class="text-h6" :class="{ 'q-mb-sm': grid }">Meus veículos</div>
        <q-space />
        <q-toggle
          v-model="grid"
          :class="{ 'q-mb-sm': grid }"
          label="VISUALIZAÇÃO DETALHADA"
          left-label
        />
      </template>

      <template #item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <VehicleCard :vehicle="props.row" />
        </div>
      </template>
    </q-table>
  </q-page>
</template>
