<script setup lang="ts">
import type { SimCardModel } from 'src/graphql/generated/graphql-operations'
import { PropType } from 'vue'

defineProps({
  simCard: {
    type: Object as PropType<SimCardModel>,
    required: true,
  },
})

const simCardFields: { label: string; key: keyof SimCardModel }[] = [
  { label: 'SSN', key: 'ssn' },
  { label: 'Número', key: 'phoneNumber' },
  { label: 'APN - Usuário', key: 'apnUser' },
  { label: 'APN - Senha', key: 'apnPassword' },
  { label: 'APN - Endereço', key: 'apnAddress' },
]
</script>

<template>
  <q-card flat bordered>
    <q-item v-for="field in simCardFields" :key="`${field.key}-${simCard.id}`">
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
