<script setup lang="ts">
import SimCardOperatorInput from 'src/components/input/SimCardOperatorInput.vue'
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import { ref } from 'vue'
import SelectSimCard from 'src/components/select/SelectSimCard.vue'

const simCardOperator = ref('')

const apnUser = ref('')
const apnAddress = ref('')
const apnPassword = ref('')

const isUsingApnSuggestion = ref(false)

const useExistingSim = ref(false)
const selectedSim = ref<string | null>(null)

const onSimCardOperatorChange = (operator = '') => {
  const apnSuggestion =
    apnsByBrazillianProvider[operator as keyof typeof apnsByBrazillianProvider]

  if (!apnSuggestion) {
    isUsingApnSuggestion.value = false
    apnUser.value = ''
    apnAddress.value = ''
    apnPassword.value = ''
    return
  }

  apnUser.value = apnSuggestion.apnUser
  apnAddress.value = apnSuggestion.apnAddress
  apnPassword.value = apnSuggestion.apnPassword
  isUsingApnSuggestion.value = true
}
</script>

<template>
  <q-card>
    <slot name="title"></slot>

    <q-card-section class="q-pb-none">
      <q-toggle v-model="useExistingSim" label="Usar SIM existente ?" square />
    </q-card-section>

    <q-card-section v-if="useExistingSim">
      <SelectSimCard v-model="selectedSim" class="q-mb-md" square />
    </q-card-section>

    <q-card-section v-else>
      <SimCardOperatorInput
        v-model="simCardOperator"
        class="q-mb-md"
        square
        @update:model-value="onSimCardOperatorChange"
      />

      <q-input
        v-model="apnAddress"
        :readonly="isUsingApnSuggestion"
        label="APN - Endereço"
        class="q-mb-md"
        filled
        square
      />

      <q-input
        v-model="apnUser"
        :readonly="isUsingApnSuggestion"
        label="APN - Usuário"
        class="q-mb-md"
        filled
        square
      />

      <q-input
        v-model="apnPassword"
        :readonly="isUsingApnSuggestion"
        label="APN - Senha"
        class="q-mb-md"
        filled
        square
      />
    </q-card-section>
  </q-card>
</template>
