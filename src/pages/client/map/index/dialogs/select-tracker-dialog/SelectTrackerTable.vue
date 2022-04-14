<script setup lang="ts">
import { TrackerModel } from '../../../../../../graphql/generated/graphql-operations'
import { QTableProps } from 'quasar'

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
</script>

<template>
  <q-table
    :columns="columns"
    :filter-method="filterMethod"
    row-key="id"
    virtual-scroll
    style="max-height: 50vh"
    selection="multiple"
    :rows-per-page-options="[0]"
  />
</template>
