<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const rules = {
  modelValue: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    type="password"
    label="Senha antiga"
    no-error-icon
    outlined
  />
</template>
