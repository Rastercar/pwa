<script setup lang="ts">
import { QBtnProps } from 'quasar'
import { PropType } from 'vue'

defineProps({
  filter: {
    type: String,
    default: '',
  },
  createBtnProps: {
    type: Object as PropType<QBtnProps>,
    default: () => ({}),
  },
  grid: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:grid', 'update:filter', 'click:new-record'])
</script>

<template>
  <div class="row full-width" :class="{ 'q-mb-sm': grid }">
    <q-icon class="q-mr-md" name="fa fa-car" size="lg" color="grey-8" />

    <div class="text-h6">Meus veículos</div>

    <q-space />

    <q-btn
      v-bind="createBtnProps"
      class="q-mr-md"
      color="green"
      icon="fa fa-plus"
      flat
      outline
      round
      @click="$emit('click:new-record')"
    />

    <div class="bg-grey-2 q-px-sm" style="border-radius: 3px">
      <q-toggle
        :model-value="grid"
        label="visualização detalhada"
        left-label
        @update:model-value="(e) => $emit('update:grid', e)"
      />
    </div>

    <q-input
      :model-value="filter"
      class="q-ml-md"
      dense
      filled
      debounce="300"
      placeholder="Busca por placa"
      @update:model-value="(e) => $emit('update:filter', e)"
    >
      <template #append>
        <q-icon name="fa fa-search" />
      </template>
    </q-input>
  </div>
</template>
