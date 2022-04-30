<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import SimCardOperatorInput from 'src/components/input/SimCardOperatorInput.vue'
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import { CreateSimCardDto } from 'src/graphql/generated/graphql-operations'
import { maskedPhoneNumberToE164 } from 'src/utils/string/phone-number.utils'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { PropType, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<CreateSimCardDto>,
    required: true,
  },
  /**
   * Sim card ssns that are in use and cannot be used to register new sim cards
   */
  ssnsInUse: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * Sim card phone numbers that are in use and cannot be used to register new sim cards
   */
  phoneNumbersInUse: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits<{
  /**
   * A object with the data of the new SimCard to be created
   */
  (event: 'update:model-value', value: CreateSimCardDto): void
}>()

const emptySimCard = {
  apnAddress: '',
  apnPassword: '',
  apnUser: '',
  phoneNumber: '',
  ssn: '',
}

const internalValue = ref<CreateSimCardDto>({ ...props.modelValue })

const isUsingApnSuggestion = ref(false)
const simCardOperator = ref('')

const emptyApn = { apnUser: '', apnAddress: '', apnPassword: '' }

const onSimCardOperatorChange = (operator = '') => {
  const apnSuggestion = apnsByBrazillianProvider[operator as keyof typeof apnsByBrazillianProvider] // prettier-ignore

  isUsingApnSuggestion.value = !!apnSuggestion

  internalValue.value = { ...props.modelValue, ...(apnSuggestion ?? emptyApn) }
}

watch(internalValue, (v) => emit('update:model-value', v), { deep: true })

const rules = {
  ssn: {
    required: helpers.withMessage('Informe o serial', required),
    isNotInUse: helpers.withMessage(
      'Já existe um sim card com esse SSN',
      (v?: string) => {
        if (!v) return true
        return !props.ssnsInUse.includes(v)
      }
    ),
  },
  phoneNumber: {
    required: helpers.withMessage('Informe o número de telefone', required),
    // Since we have a mask to garantee our numbers
    // will follow the format +55 (99) 99999-9999
    // all we need is to be sure the length is 18 or 19
    minLen: helpers.withMessage('Telefone incompleto', minLength(18)),
    isNotInUse: helpers.withMessage(
      'Já existe um sim card com número de telefone',
      (v?: string) => {
        if (!v) return true

        return (
          !props.phoneNumbersInUse.includes(v) &&
          !props.phoneNumbersInUse.includes(maskedPhoneNumberToE164(v))
        )
      }
    ),
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

const resetForm = () => {
  internalValue.value = { ...emptySimCard }
}

defineExpose({ resetForm })
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
