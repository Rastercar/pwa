<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, required } from '@vuelidate/validators'
import { TRACKER_MODELS } from 'src/constants/tracker'
import useVuelidate from '@vuelidate/core'
import { QSelectProps } from 'quasar'
import { PropType, ref } from 'vue'

const mutableTrackerModels = [...TRACKER_MODELS]

const options = ref(mutableTrackerModels)

defineEmits<{
  (event: 'update:model-value', value: string): void
}>()

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  update(() => {
    if (val === '') options.value = mutableTrackerModels
    else {
      const needle = val.toLowerCase()
      options.value = mutableTrackerModels.filter((v) => v.toLowerCase().indexOf(needle) > -1) // prettier-ignore
    }
  })
}

const props = defineProps({
  modelValue: {
    type: String as PropType<string | null>,
    required: true,
  },
})

const rules = {
  modelValue: {
    required: helpers.withMessage(
      'Selecione um modelo de rastreador',
      required
    ),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-select
    :model-value="modelValue"
    :options="options"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    label="Modelo do rastreador"
    input-debounce="0"
    behavior="menu"
    filled
    use-input
    @filter="filterFn"
    @update:model-value="(v) => $emit('update:model-value', v)"
  />
</template>
