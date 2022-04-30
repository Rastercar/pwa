<script setup lang="ts">
import type { SimCardModel } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'

defineProps({
  simCard: {
    type: Object as PropType<SimCardModel>,
    required: true,
  },
  showRemoveSimBtn: {
    type: Boolean,
    default: false,
  },
  slotIndex: {
    type: Number,
    required: true,
  },
})

defineEmits<{
  (event: 'remove-sim-clicked', simToRemove: SimCardModel): void
}>()

const simCardFields: { label: string; key: keyof SimCardModel }[] = [
  { label: 'SSN', key: 'ssn' },
  { label: 'Número', key: 'phoneNumber' },
  { label: 'APN - Usuário', key: 'apnUser' },
  { label: 'APN - Senha', key: 'apnPassword' },
  { label: 'APN - Endereço', key: 'apnAddress' },
]
</script>

<template>
  <q-card flat class="flex row bg-grey-3">
    <q-item class="col-6 items-center" clickable>
      <div>
        <q-icon
          name="fa fa-sim-card"
          size="20px"
          color="grey"
          class="q-mr-sm"
        />
        <span>SLOT {{ slotIndex }}</span>
      </div>

      <q-space />

      <q-btn
        v-if="showRemoveSimBtn"
        push
        color="red"
        size="sm"
        round
        flat
        icon="fa fa-trash"
        @click="() => $emit('remove-sim-clicked', simCard)"
      />
    </q-item>

    <q-item
      v-for="field in simCardFields"
      :key="`${field.key}-${simCard.id}`"
      class="col-6"
      clickable
    >
      <q-item-section>
        <div class="text-grey-8 q-mr-sm">
          {{ field.label }}
        </div>
        <div>
          {{ simCard[field.key] || 'não informado' }}
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>
