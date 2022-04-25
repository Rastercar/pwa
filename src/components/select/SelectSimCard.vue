<script setup lang="ts">
import { ListSimCardsDocument } from 'src/graphql/generated/graphql-operations'
import { getVuelidateErrorMsg } from 'src/utils/validation.utils'
import { helpers, required } from '@vuelidate/validators'
import { useQuery } from '@vue/apollo-composable'
import useVuelidate from '@vuelidate/core'
import { QSelectProps } from 'quasar'
import { PropType } from 'vue'

const {
  result: options,
  loading,
  refetch,
} = useQuery(ListSimCardsDocument, { search: null, installedOnTracker: false })

defineEmits<{
  /**
   * The ID of the selected sim card
   */
  (event: 'update:model-value', value: number | null): void
}>()

const props = defineProps({
  modelValue: {
    type: Number as PropType<number | null>,
    required: true,
  },
})

const rules = {
  modelValue: {
    required: helpers.withMessage('Selecione um SIM Card', required),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  if (loading.value) return

  refetch({ search: val, installedOnTracker: false })
    ?.then(() => update(() => null))
    ?.catch(() => null)
}
</script>

<template>
  <q-select
    :model-value="modelValue"
    :hint="modelValue ? '' : 'pesquise por número'"
    :options="options?.simCards.nodes ?? []"
    :loading="loading"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    label="Sim Card"
    input-debounce="200"
    option-value="id"
    option-label="phoneNumber"
    map-options
    emit-value
    use-input
    filled
    @filter="filterFn"
    @update:model-value="(v) => $emit('update:model-value', v)"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey-8">
          Nenhum sim card não instalado em um rastreador encontrado.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
