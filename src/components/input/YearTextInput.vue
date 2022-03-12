<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: { type: String, required: true },
})

const maxYear = new Date().getFullYear() + 10

const rules = {
  modelValue: {
    isValidYear: helpers.withMessage('Ano inválido', (v?: string) => {
      if (!v) return true

      const year = parseInt(v)

      if (isNaN(year)) return false

      return year < maxYear && year > 1920
    }),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :error="v.modelValue.$error"
    mask="####"
  />
</template>
