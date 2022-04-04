<script setup lang="ts">
import { TRACKER_MODELS } from 'src/constants/tracker'
import { QSelectProps } from 'quasar'
import { ref } from 'vue'

const mutableTrackerModels = [...TRACKER_MODELS]

const options = ref(mutableTrackerModels)

const model = ref(null)

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  update(() => {
    if (val === '') options.value = mutableTrackerModels
    else {
      const needle = val.toLowerCase()
      options.value = mutableTrackerModels.filter((v) => v.toLowerCase().indexOf(needle) > -1) // prettier-ignore
    }
  })
}
</script>

<template>
  <q-select
    v-model="model"
    filled
    use-input
    input-debounce="0"
    label="Modelo do rastreador"
    :options="options"
    behavior="menu"
    @filter="filterFn"
  />
</template>
