<script setup lang="ts">
import SimCardOperatorInput from 'src/components/input/SimCardOperatorInput.vue'
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { PropType, ref, watch } from 'vue'

interface NewSimCard {
  ssn: string
  phoneNumber: string
  apnUser: string
  apnAddress: string
  apnPassword: string
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<NewSimCard>,
    required: true,
  },
})

const emit = defineEmits<{
  /**
   * A object with the data of the new SimCard to be created
   */
  (event: 'update:model-value', value: NewSimCard): void
}>()

const internalValue = ref<NewSimCard>({ ...props.modelValue })

const isUsingApnSuggestion = ref(false)
const simCardOperator = ref('')

const emptyApn = { apnUser: '', apnAddress: '', apnPassword: '' }

const onSimCardOperatorChange = (operator = '') => {
  const apnSuggestion =
    apnsByBrazillianProvider[operator as keyof typeof apnsByBrazillianProvider]

  isUsingApnSuggestion.value = !!apnSuggestion

  internalValue.value = { ...props.modelValue, ...(apnSuggestion ?? emptyApn) }
}

watch(internalValue, (v) => emit('update:model-value', v), { deep: true })

const rules = {
  ssn: {
    required: helpers.withMessage('Informe o serial', required),
  },
  phoneNumber: {
    required: helpers.withMessage('Informe o número de telefone', required),
    // Since we have a mask to garantee our numbers
    // will follow the format +55 (99) 99999-9999'
    // all we need is to be sure the length is 18 or 19
    minLen: helpers.withMessage('Telefone incompleto', minLength(18)),
  },
  apnUser: {
    required: helpers.withMessage('Informe o usuário APN', required),
  },
  apnPassword: {
    required: helpers.withMessage('Informe o senha APN', required),
  },
  apnAddress: {
    required: helpers.withMessage('Informe o endereço APN', required),
  },
}

const v = useVuelidate(rules, internalValue, { $autoDirty: true })
</script>

<template>
  <div>
    <SimCardOperatorInput
      v-model="simCardOperator"
      class="q-mb-md"
      square
      dense
      @update:model-value="onSimCardOperatorChange"
    />

    <q-input
      v-model="internalValue.ssn"
      :error="v.ssn.$error"
      :error-message="getVuelidateErrorMsg(v.ssn.$errors)"
      label="Serial"
      class="q-mb-md"
      filled
      square
      dense
    />

    <q-input
      v-model="internalValue.phoneNumber"
      :error="v.phoneNumber.$error"
      :error-message="getVuelidateErrorMsg(v.phoneNumber.$errors)"
      label="Telefone, com DDD"
      class="q-mb-md"
      mask="+55 (##) #####-####"
      type="tel"
      filled
      dense
      square
    />

    <q-input
      v-model="internalValue.apnAddress"
      :error="v.apnAddress.$error"
      :error-message="getVuelidateErrorMsg(v.apnAddress.$errors)"
      :readonly="isUsingApnSuggestion"
      label="APN - Endereço"
      class="q-mb-md"
      filled
      dense
      square
    />

    <q-input
      v-model="internalValue.apnUser"
      :error="v.apnUser.$error"
      :error-message="getVuelidateErrorMsg(v.apnUser.$errors)"
      :readonly="isUsingApnSuggestion"
      label="APN - Usuário"
      class="q-mb-md"
      filled
      dense
      square
    />

    <q-input
      v-model="internalValue.apnPassword"
      :error="v.apnPassword.$error"
      :error-message="getVuelidateErrorMsg(v.apnPassword.$errors)"
      :readonly="isUsingApnSuggestion"
      label="APN - Senha"
      class="q-mb-md"
      filled
      dense
      square
    />
  </div>
</template>
