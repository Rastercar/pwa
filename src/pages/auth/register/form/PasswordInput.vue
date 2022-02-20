<script setup lang="ts">
import { requiredIf, maxLength, helpers } from '@vuelidate/validators'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { useVuelidate } from '@vuelidate/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['update:visible'])

const { withMessage } = helpers

const rules = computed(() => ({
  modelValue: {
    required: withMessage('Campo obrigatório', requiredIf(props.required)),

    minLength: withMessage('Mínimo 5 caractéres', (value: string) => {
      if (!props.required && !value) return true
      return value.length > 5
    }),

    maxLength: withMessage('Máximo 200 caractéres', maxLength(200)),

    containsUppercase: withMessage(
      'Deve conter um caractére maiúsculo',
      (value: string) => {
        if (!props.required && !value) return true
        return /[A-Z]/.test(value ?? '')
      }
    ),

    containsLowercase: withMessage(
      'Deve conter um caractére minúsculo',
      (value: string) => {
        if (!props.required && !value) return true
        return /[a-z]/.test(value ?? '')
      }
    ),

    containsNumber: withMessage('Deve conter um número', (value: string) => {
      if (!props.required && !value) return true
      return /[0-9]/.test(value ?? '')
    }),

    containsSpecial: withMessage(
      'Deve conter um caractére especial (exemplo: #?!@$%^&*-)',
      (value: string) => {
        if (!props.required && !value) return true
        return /[#?!@$%^&*-]/.test(value ?? '')
      }
    ),
  },
}))

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
        :name="visible ? 'fa fa-eye' : 'fa fa-eye-slash'"
        class="cursor-pointer"
        @click="$emit('update:visible', !visible)"
      />
    </template>
  </q-input>
</template>
