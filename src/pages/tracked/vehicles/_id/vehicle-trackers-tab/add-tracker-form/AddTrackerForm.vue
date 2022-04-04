<script setup lang="ts">
import SimCardOperatorInput from 'src/components/input/SimCardOperatorInput.vue'
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import { trackerModel, HOMOLOGATED_TRACKER } from 'src/constants/tracker'
import { apnsByBrazillianProvider } from 'src/constants/sim-card-apn'
import { computed, ref } from 'vue'

const model = ref<trackerModel | null>(null)
const simCardOperator = ref('')

const simCardSlotsForModel = computed(() =>
  model.value ? HOMOLOGATED_TRACKER[model.value].simCardSlots : 0
)

const apnUser = ref('')
const apnAddress = ref('')
const apnPassword = ref('')

const isUsingApnSuggestion = ref(false)

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
  <div>
    <!-- <q-btn color="green" icon="fa fa-plus" label="adicionar" size="md" /> -->
    <div class="text-body1 q-mb-sm">Adicionar Rastreador:</div>

    <TrackerModelInput v-model="model" class="q-mb-md" />

    <div v-show="simCardSlotsForModel > 0" class="text-body1 q-mb-sm">
      Slots SIM Card para modelo:
      {{ simCardSlotsForModel }}
    </div>

    <!--
      TODO: COMPONENTIZAR ISSO NUM FORMULARIO DE SIM CARD QUE EMIT UM OBJETO DO SIM CARD AO ATT OU NULL SE NAO PRRENCHIDO
      TBM VERIFICAR SE AO MENOS 1 SIM CARD FOI INFORMADO COMPLETAMENTE E IMPEDIR SIM CARDS INCOMPLETOS, TD OU NADA
     -->
    <div v-for="index in simCardSlotsForModel" :key="`sim-card-form-${index}`">
      <q-card>
        <q-card-section class="q-pb-none">
          <q-icon name="fa fa-sim-card" class="q-mr-sm" />
          SLOT - {{ index }}
        </q-card-section>

        <q-card-section>
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
    </div>
  </div>
</template>
