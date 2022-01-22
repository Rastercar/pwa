<script setup lang="ts">
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
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
})

defineEmits(['update:visible'])

const { withMessage } = helpers

const rules = {
  modelValue: {
    required: withMessage('Campo obrigatório', required),
    minLength: withMessage('Mínimo 5 caractéres', minLength(5)),
    maxLength: withMessage('Máximo 200 caractéres', maxLength(200)),
    containsUppercase: withMessage(
      'Deve conter um caractére maiúsculo',
      (value: string) => /[A-Z]/.test(value ?? '')
    ),
    containsLowercase: withMessage(
      'Deve conter um caractére minúsculo',
      (value: string) => /[a-z]/.test(value ?? '')
    ),
    containsNumber: withMessage('Deve conter um número', (value: string) =>
      /[0-9]/.test(value ?? '')
    ),
    containsSpecial: withMessage(
      'Deve conter um caractére especial (exemplo: #?!@$%^&*-)',
      (value: string) => /[#?!@$%^&*-]/.test(value ?? '')
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
    label="Senha *"
    no-error-icon
    outlined
  >
    <template #append>
      <q-icon
        :name="visible ? 'visibility' : 'visibility_off'"
        class="cursor-pointer"
        @click="$emit('update:visible', !visible)"
      />
    </template>
  </q-input>
</template>
