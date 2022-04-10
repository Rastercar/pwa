<script setup lang="ts">
import { ListTrackersDocument } from 'src/graphql/generated/graphql-operations'
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
} = useQuery(ListTrackersDocument, { search: null, installedOnVehicle: false })

defineEmits<{
  /**
   * The ID of the selected tracker
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
    required: helpers.withMessage('Selecione um rastreador', required),
  },
}

const v = useVuelidate(rules, props, { $autoDirty: true })

const filterFn: NonNullable<QSelectProps['onFilter']> = (val, update) => {
  if (loading.value) return

  refetch({ search: val, installedOnVehicle: false })
    ?.then(() => update(() => null))
    ?.catch(() => null)
}
</script>

<template>
  <q-select
    :model-value="modelValue"
    :hint="modelValue ? '' : 'pesquise por identificador/modelo'"
    :options="options?.trackers.nodes ?? []"
    :loading="loading"
    :error="v.modelValue.$error"
    :error-message="getVuelidateErrorMsg(v.modelValue.$errors)"
    label="Rastreador"
    input-debounce="200"
    option-value="id"
    option-label="identifier"
    map-options
    emit-value
    use-input
    filled
    @filter="filterFn"
    @update:model-value="(v) => $emit('update:model-value', v)"
  >
    <template #option="{ opt, itemProps }">
      <q-item v-bind="itemProps" class="q-px-md q-py-sm">
        <div>
          <div>ID: {{ opt.identifier }}</div>
          <div class="text-grey-7">Modelo: {{ opt.model }}</div>
        </div>
      </q-item>
    </template>

    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey-8">
          Nenhum rastreador não instalado em um veículo encontrado.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
