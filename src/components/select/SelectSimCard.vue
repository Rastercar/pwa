<script setup lang="ts">
import { ListSimCardsDocument } from 'src/graphql/generated/graphql-operations'
import { useQuery } from '@vue/apollo-composable'
import { QSelectProps } from 'quasar'
import { ref } from 'vue'

const {
  result: options,
  loading,
  refetch,
} = useQuery(ListSimCardsDocument, { search: null, installedOnTracker: false })

const model = ref(null)

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  if (loading.value) return

  refetch({ search: val, installedOnTracker: false })
    ?.then(() => update(() => null))
    ?.catch(() => null)
}
</script>

<template>
  <q-select
    v-model="model"
    label="Sim Card"
    :hint="model ? '' : 'pesquise por número'"
    use-input
    filled
    input-debounce="200"
    option-label="phoneNumber"
    option-value="id"
    :loading="loading"
    :options="options?.simCards.nodes ?? []"
    @filter="filterFn"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey-8">
          Nenhum sim card não instalado em um rastreador encontrado com este
          número.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
