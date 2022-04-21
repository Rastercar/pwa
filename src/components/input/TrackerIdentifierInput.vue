<script setup lang="ts">
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  /**
   * Identifiers that are already in use
   * and cannot be accepted
   */
  identifiersInUse: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const rules = {
  modelValue: {
    required: helpers.withMessage(
      'Informe um identificador unico para o rastreador',
      required
    ),
    isNotInUse: helpers.withMessage(
      'Este identificador já esta em uso',
      (v?: string) => {
        if (!v) return true
        return !props.identifiersInUse.includes(v)
      }
    ),
  },
}
const v = useVuelidate(rules, props, { $autoDirty: true })
</script>

<template>
  <q-input
    v-bind="({ ...$props, ...$attrs } as any)"
    label="Identificador"
    filled
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    :error="v.modelValue.$error"
  >
    <template #append>
      <q-icon name="fa fa-info-circle">
        <q-tooltip
          anchor="center left"
          self="center end"
          style="font-size: 14px"
        >
          Um identificador unico para o rastreador, recomendado: modelo seguido
          de serial
        </q-tooltip>
      </q-icon>
    </template>
  </q-input>
</template>
