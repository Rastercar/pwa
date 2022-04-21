<script setup lang="ts">
import SelectSimCard from 'src/components/select/SelectSimCard.vue'
import UseNewSimForm from './UseNewSimForm.vue'
import { ref } from 'vue'
import {
  CreateSimCardDtoOrId,
  CreateSimCardDto,
} from 'src/graphql/generated/graphql-operations'

defineEmits<{
  /**
   * Can emmit:
   *
   * - null, when a user clears the using existing sim input
   * - number, the ID of a existing sim card to use
   * - object, a new sim card to be registered
   */
  (event: 'update:model-value', value: CreateSimCardDtoOrId | null): void
}>()

const emptySim = {
  ssn: '',
  phoneNumber: '',
  apnUser: '',
  apnAddress: '',
  apnPassword: '',
}

const newSimCard = ref<CreateSimCardDto>({ ...emptySim })

const useExistingSim = ref(false)
const selectedSimId = ref<number | null>(null)

const resetForm = () => {
  selectedSimId.value = null
  newSimCard.value = { ...emptySim }
}
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

    <q-card-section v-if="useExistingSim" class="q-pb-none">
      <SelectSimCard
        v-model="selectedSimId"
        class="q-mb-md"
        square
        @update:model-value="
          (v) => $emit('update:model-value', v ? { id: v } : null)
        "
      />
    </q-card-section>

    <q-card-section v-else class="q-pb-none">
      <UseNewSimForm
        v-model="newSimCard"
        @update:model-value="(v) => $emit('update:model-value', { dto: v })"
      />
    </q-card-section>
  </q-card>
</template>
