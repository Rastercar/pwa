<script setup lang="ts">
import SimCardOperatorInput from 'src/components/input/SimCardOperatorInput.vue'
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import SelectSimCard from 'src/components/select/SelectSimCard.vue'
import { ref, watch } from 'vue'

interface NewSimCard {
  ssn: string
  phoneNumber: string
  apnUser: string
  apnAddress: string
  apnPassword: string
}

const emit = defineEmits<{
  /**
   * If emits a number its an ID of a existing sim card to use,
   * otherwise its a object of a new sim card to register
   */
  (event: 'update:model-value', value: number | NewSimCard): void
}>()

const simCardOperator = ref('')

const emptySim = {
  ssn: '',
  phoneNumber: '',
  apnUser: '',
  apnAddress: '',
  apnPassword: '',
}

const newSimCard = ref<NewSimCard>({ ...emptySim })

const isUsingApnSuggestion = ref(false)

const useExistingSim = ref(false)
const selectedSimId = ref<number | null>(null)

type apnProviders = typeof apnsByBrazillianProvider
type apnProviderKey = keyof apnProviders

const resetForm = () => {
  selectedSimId.value = null
  newSimCard.value = { ...emptySim }
}

const onSimCardOperatorChange = (operator = '') => {
  const apnSuggestion = apnsByBrazillianProvider[operator as apnProviderKey]

  isUsingApnSuggestion.value = !!apnSuggestion

  if (!apnSuggestion) {
    newSimCard.value.apnUser = ''
    newSimCard.value.apnAddress = ''
    newSimCard.value.apnPassword = ''
  } else {
    newSimCard.value.apnUser = apnSuggestion.apnUser
    newSimCard.value.apnAddress = apnSuggestion.apnAddress
    newSimCard.value.apnPassword = apnSuggestion.apnPassword
  }
}

watch(
  newSimCard,
  (newSim) => {
    emit('update:model-value', newSim)
  },
  { deep: true }
)
</script>

<template>
  <q-card>
    <slot name="title"></slot>

    <q-card-section class="q-pb-none flex items-center">
      <q-toggle
        v-model="useExistingSim"
        label="Usar SIM existente ?"
        square
        @update:model-value="resetForm"
      />

      <q-space />

      <q-icon
        name="fa fa-info-circle"
        class="q-mr-sm"
        size="20px"
        color="grey-8"
      >
        <q-tooltip anchor="bottom left">
          Apenas SIM Cards não instalados em um rastreador aparecerão na busca
        </q-tooltip>
      </q-icon>
    </q-card-section>

    <q-card-section v-if="useExistingSim">
      <SelectSimCard
        v-model="selectedSimId"
        class="q-mb-md"
        emit-value
        map-options
        square
        @update:model-value="(id: number) => $emit('update:model-value', id)"
      />
    </q-card-section>

    <q-card-section v-else>
      <SimCardOperatorInput
        v-model="simCardOperator"
        class="q-mb-md"
        square
        @update:model-value="onSimCardOperatorChange"
      />

      <q-input
        v-model="newSimCard.ssn"
        label="Serial"
        class="q-mb-md"
        filled
        square
      />

      <q-input
        v-model="newSimCard.phoneNumber"
        label="Telefone, com DDD"
        class="q-mb-md"
        mask="+55 (##) #####-####"
        type="tel"
        filled
        square
      />

      <q-input
        v-model="newSimCard.apnAddress"
        :readonly="isUsingApnSuggestion"
        label="APN - Endereço"
        class="q-mb-md"
        filled
        square
      />

      <q-input
        v-model="newSimCard.apnUser"
        :readonly="isUsingApnSuggestion"
        label="APN - Usuário"
        class="q-mb-md"
        filled
        square
      />

      <q-input
        v-model="newSimCard.apnPassword"
        :readonly="isUsingApnSuggestion"
        label="APN - Senha"
        class="q-mb-md"
        filled
        square
      />
    </q-card-section>
  </q-card>
</template>
