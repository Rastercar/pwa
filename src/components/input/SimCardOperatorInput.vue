<script setup lang="ts">
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import { ref } from 'vue'

const opts = Object.keys(apnsByBrazillianProvider)
opts.unshift('Outro')

const options = ref(opts)

const model = ref(null)
</script>

<template>
  <q-select
    v-model="model"
    filled
    label="Operadora"
    :options="options"
    behavior="menu"
  />
</template>
