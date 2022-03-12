<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: { type: String, required: true },
})

const oldRgx = /[A-Za-z]{3}[0-9]{4}/
const mercosulRgx = /[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}/

const isOldOrMercosulPattern = (v?: string) => {
  if (!v) return false
  return oldRgx.test(v) || mercosulRgx.test(v)
}

const rules = {
  modelValue: {
    required: helpers.withMessage('Campo obrigatório', required),
    isOldOrMercosulPattern: helpers.withMessage(
      'Deve seguir o padrao aaa-nnnn ou aaa-n-a-nn',
      isOldOrMercosulPattern
    ),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :error="v.modelValue.$error"
    label="Placa"
    maxlength="7"
    input-style="text-transform: uppercase"
  />
</template>
