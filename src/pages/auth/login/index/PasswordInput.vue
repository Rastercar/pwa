<script setup lang="ts">
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  /**
   * Indicates that there was a failed attempt to login with the
   * password on the modelValue prop
   */
  isInvalid: {
    type: Boolean,
    default: false,
  },
})

const { withMessage } = helpers

const rules = {
  modelValue: {
    required: withMessage('Campo obrigatório', required),
    minLength: withMessage('Mínimo 5 caractéres', minLength(5)),
    maxLength: withMessage('Máximo 200 caractéres', maxLength(200)),
    isNotMarkedAsNotInvalid: withMessage(
      'Senha inválida',
      () => !props.isInvalid
    ),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    outlined
    type="password"
    label="Senha"
  />
</template>
