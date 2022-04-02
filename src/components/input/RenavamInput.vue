<script setup lang="ts">
import { helpers, minLength } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: { type: String, required: true },
})

const rules = {
  modelValue: {
    minLength: helpers.withMessage('Mínimo 11 caractéres', minLength(11)),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :error="v.modelValue.$error"
    label="Renavam"
    mask="###########"
  />
</template>
