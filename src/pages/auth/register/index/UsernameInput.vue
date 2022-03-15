<script setup lang="ts">
import { helpers, required, minLength, maxLength } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const { withMessage } = helpers

const rules = {
  modelValue: {
    required: withMessage('Campo obrigatório', required),
    minLength: withMessage('Mínimo 5 caractéres', minLength(5)),
    maxLength: withMessage('Máximo 60 caractéres', maxLength(60)),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    label="Nome de usuário *"
    outlined
  />
</template>
