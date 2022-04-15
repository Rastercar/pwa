<script setup lang="ts">
import { OrganizationModel } from '../../../../graphql/generated/graphql-operations'
import { QTableProps } from 'quasar'

const columns: QTableProps['columns'] = [
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: (org) => (org as OrganizationModel).billingEmail,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (org) => (org as OrganizationModel).name,
    sortable: true,
  },
]

const filterMethod: QTableProps['filterMethod'] = (
  orgs: OrganizationModel[],
  term
) => {
  if (typeof term !== 'string' || !term) return orgs

  const t = term.toLocaleLowerCase()

  return orgs.filter((o) => {
    return (
      o.name.toLocaleLowerCase().includes(t) ||
      o.billingEmail.toLocaleLowerCase().includes(t)
    )
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
    :rows-per-page-options="[0]"
  />
</template>
