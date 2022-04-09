<script setup lang="ts">
import TrackerModelInput from 'src/components/input/TrackerModelInput.vue'
import { trackerModel, HOMOLOGATED_TRACKER } from 'src/constants/tracker'
import AddSimCardForm from './AddSimCardForm.vue'
import { computed, ref } from 'vue'

interface NewSimCard {
  ssn: string
  phoneNumber: string
  apnUser: string
  apnAddress: string
  apnPassword: string
}

const model = ref<trackerModel | null>(null)

const simCardSlotsForModel = computed(() =>
  model.value ? HOMOLOGATED_TRACKER[model.value].simCardSlots : 0
)

const simCards = ref<(NewSimCard | number)[]>([])
</script>

<template>
  <div>
    <!-- <q-btn color="green" icon="fa fa-plus" label="adicionar" size="md" /> -->
    <div class="text-body1 q-mb-sm">Adicionar Rastreador:</div>

    <TrackerModelInput v-model="model" class="q-mb-md" />

    <!--
      TODO: COMPONENTIZAR ISSO NUM FORMULARIO DE SIM CARD QUE EMIT UM OBJETO DO SIM CARD AO ATT OU NULL SE NAO PRRENCHIDO
      TBM VERIFICAR SE AO MENOS 1 SIM CARD FOI INFORMADO COMPLETAMENTE E IMPEDIR SIM CARDS INCOMPLETOS, TD OU NADA
     -->
    {{ simCards }}
    <AddSimCardForm
      v-for="index in simCardSlotsForModel"
      :key="`sim-card-form-${index}`"
      v-model="simCards[index - 1]"
      flat
      bordered
    >
      <template #title>
        <q-card-section class="q-pb-none text-body1">
          <q-icon name="fa fa-sim-card" class="q-mr-sm" />
          Slot SIM Card - {{ index }}
        </q-card-section>
      </template>
    </AddSimCardForm>
  </div>
</template>
