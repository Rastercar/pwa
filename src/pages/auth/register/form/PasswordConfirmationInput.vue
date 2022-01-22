<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  passwordToMatch: {
    type: String,
    required: true,
  },
})

defineEmits(['update:visible'])

const rules = {
  modelValue: {
    equalsPassword: helpers.withMessage(
      'Confirmação inválida',
      (v: string) => v === props.passwordToMatch
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
    :type="!visible ? 'password' : 'text'"
    label="Confirmação de senha *"
    no-error-icon
    outlined
  />
</template>
