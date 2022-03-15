<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  /**
   * Array of old passwords that were not valid (server responded with INVALID_OLD_PASSWORD)
   */
  invalidOldPasswords: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const rules = {
  modelValue: {
    isNotInvalid: helpers.withMessage(
      'Senha antiga inválida',
      (v: string) => !props.invalidOldPasswords.includes(v)
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
    type="password"
    label="Senha antiga"
    no-error-icon
    outlined
  >
    <template #append>
      <q-icon name="fa fa-info-circle">
        <q-tooltip style="font-size: 15px; max-width: 300px">
          Por razões de segurança é necessário informar sua senha atual para
          redefini-la
        </q-tooltip>
      </q-icon>
    </template>
  </q-input>
</template>
