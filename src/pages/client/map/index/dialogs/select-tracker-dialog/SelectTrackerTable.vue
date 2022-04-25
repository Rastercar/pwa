<script setup lang="ts">
import { TrackerModel } from '../../../../../../graphql/generated/graphql-operations'
import { QTableProps } from 'quasar'

const columns: QTableProps['columns'] = [
  {
    name: 'veiculo',
    label: 'Veículo',
    align: 'left',
    field: (t) => {
      const tracker = t as TrackerModel

      if (!tracker.vehicle) return 'n/a'

      return !tracker.vehicle.model
        ? tracker.vehicle.plate
        : `${tracker.vehicle.plate}: ${tracker.vehicle.model}`
    },
    sortable: true,
  },
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: (tracker) => (tracker as TrackerModel).identifier,
    sortable: true,
  },
]

const filterMethod: QTableProps['filterMethod'] = (
  trackers: TrackerModel[],
  term
) => {
  if (typeof term !== 'string') return trackers

  const t = term.toLocaleLowerCase()

  return trackers.filter(({ vehicle, identifier }) => {
    if (identifier.toLocaleLowerCase().includes(t)) return true

    if (vehicle) {
      if (vehicle.plate.toLocaleLowerCase().includes(t)) return true
      if (vehicle.model) return vehicle.model.toLocaleLowerCase().includes(t)
    }

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
