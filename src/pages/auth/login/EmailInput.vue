<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { email, helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  /**
   * Indicates that the search for a user with the current
   * email address in the modelValue prop failed
   */
  userWithEmailNotFound: {
    type: Boolean,
    default: false,
  },
})

const { withMessage } = helpers

const rules = {
  modelValue: {
    required: withMessage('Campo obrigatório', required),
    email: withMessage('Email inválido', email),
    isNotMarkedAsNotFound: withMessage(
      'Email não encontrado',
      () => !props.userWithEmailNotFound
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
    type="email"
    label="Email"
  />
</template>
