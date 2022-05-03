<script setup lang="ts">
import {
  ListTrackersWithVehiclesDocument,
  ListTrackersWithVehiclesQuery,
} from 'src/graphql/generated/graphql-operations'
import { getOffsetPaginationArgs } from 'src/utils/pagination.utils'
import { useApolloClient } from '@vue/apollo-composable'
import { onMounted, ref } from 'vue'
import { QTableProps } from 'quasar'

const { client } = useApolloClient()

const loading = ref(false)
const filter = ref('')

const pagination = ref({
  page: 1,
  sortBy: 'desc',
  descending: false,
  rowsPerPage: 5,
  rowsNumber: 10,
})

type TableRow = NonNullable<
  ListTrackersWithVehiclesQuery['trackers']['nodes']
>[number]

const rows = ref<TableRow[]>([])

type OnRequestArgs = Optional<
  Parameters<NonNullable<QTableProps['onRequest']>>[0],
  'filter' | 'getCellValue'
>

const columns: QTableProps['columns'] = [
  {
    name: 'model',
    label: 'Modelo',
    field: 'model',
    align: 'left',
  },
  {
    label: 'ID',
    name: 'identifier',
    field: 'identifier',
    align: 'left',
  },
  {
    label: 'Em manutenção ?',
    field: (r) => {
      return (r as TableRow).inMaintenance ? 'sim' : 'não'
    },
    name: 'in_maintenance',
    align: 'left',
  },
  {
    label: 'Ultima posição',
    field: (r) => {
      const { lastPosition } = r as TableRow

      if (!lastPosition) {
        return 'Nunca se comunicou'
      }

      const { lat, lng } = lastPosition

      return `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
    },
    name: 'last_position',
    align: 'left',
  },
  {
    label: 'Veículo',
    field: (r) => {
      const { vehicle } = r as TableRow

      if (!vehicle) {
        return 'Nenhum'
      }

      const { plate, model } = vehicle

      return model ? `${model} - Placa: ${plate}` : plate
    },
    name: 'vehicle',
    align: 'left',
  },
]

const onRequest = async ({ pagination: pag }: OnRequestArgs) => {
  if (loading.value) return

  const { offset, limit } = getOffsetPaginationArgs(pag)
  const { descending, sortBy: orderBy } = pag
  const search = filter.value ?? null

  await client
    .query({
      query: ListTrackersWithVehiclesDocument,
      variables: { offset, limit, orderBy, descending, search },
      fetchPolicy: 'network-only',
    })
    // TODO: Isso aqui ta igualzinho o de vehicle page, como vamos seguir o msm padrao de paginacao isso pode ir pra um pagination utils ?
    .then(({ data: { trackers } }) => {
      if (trackers.nodes) rows.value = trackers.nodes

      pagination.value.page = pag.page
      pagination.value.sortBy = pag.sortBy
      pagination.value.rowsNumber = trackers.pageInfo.total
      pagination.value.descending = pag.descending
      pagination.value.rowsPerPage = pag.rowsPerPage
    })
    .finally(() => {
      loading.value = false
    })
}

const refreshTable = () => {
  onRequest({ pagination: pagination.value }).catch(() => null)
}

onMounted(refreshTable)
</script>

<template>
  <q-page class="justify-center" style="background-color: #f9f9f9" padding>
    <q-table
      v-model:pagination="pagination"
      title="Meus Rastreadores"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[5, 10, 25, 50]"
      separator="cell"
      @request="onRequest"
    >
    </q-table>
  </q-page>
</template>
