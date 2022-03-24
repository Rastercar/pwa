<script setup lang="ts">
import {
  ListActiveTrackersDocument,
  TrackerModel,
} from '../../../../../graphql/generated/graphql-operations'
import { useTrackedMap } from 'src/state/tracked-map.state'
import { useQuery } from '@vue/apollo-composable'
import { QTableProps } from 'quasar'
import { ref } from 'vue'

const { result, loading } = useQuery(ListActiveTrackersDocument)

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    align: 'center',
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    name: 'veiculo',
    align: 'center',
    label: 'Placa',
    field: (tracker) => (tracker as TrackerModel).vehicle.plate,
    sortable: true,
  },
  {
    name: 'model',
    required: true,
    label: 'Modelo',
    align: 'left',
    field: (tracker) => (tracker as TrackerModel).vehicle.model,
    sortable: true,
  },
]

const filter = ref('')

const filterMethod: QTableProps['filterMethod'] = (
  trackers: TrackerModel[],
  term
) => {
  if (typeof term !== 'string') return trackers

  const t = term.toLocaleLowerCase()

  return trackers.filter(({ vehicle }) => {
    if (vehicle.plate.toLocaleLowerCase().includes(t)) return true
    if (vehicle.model) return vehicle.model.toLocaleLowerCase().includes(t)

    return false
  })
}

const { SET_SELECTED_TRACKERS, state: mapState } = useTrackedMap()
</script>

<template>
  <q-dialog>
    <q-card style="width: 350px">
      <q-card-section class="flex items-center q-py-sm">
        <div class="text-h6">
          <q-icon size="25px" class="q-mr-sm" name="fa fa-sim-card" />
          Rastreadores
        </div>
        <q-space />

        <q-btn v-close-popup icon="fa fa-times" size="sm" fab flat />
      </q-card-section>

      <div class="text-body2 q-px-md q-pb-sm text-grey-9">
        Selecione os rastreadores que deseja exibir
      </div>

      <q-input
        v-model="filter"
        label="Busca por placa/modelo"
        class="full-width"
        filled
        square
      />

      <q-table
        :selected="mapState.selectedTrackers"
        :rows="result?.allActiveTrackers || []"
        :loading="loading"
        :columns="columns"
        :filter="filter"
        :filter-method="filterMethod"
        row-key="id"
        virtual-scroll
        style="max-height: 50vh"
        selection="multiple"
        :rows-per-page-options="[0]"
        @update:selected="SET_SELECTED_TRACKERS"
      />
    </q-card>
  </q-dialog>
</template>
