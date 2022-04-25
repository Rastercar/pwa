<script setup lang="ts">
import {
  ListVehiclesDocument,
  ListVehiclesQuery,
} from 'src/graphql/generated/graphql-operations'
import CreateVehicleOverlay from './index/create-vehicle-overlay/CreateVehicleOverlay.vue'
import VehicleDataTableHeader from './index/vehicle-data-table/VehicleDataTableHeader.vue'
import { vehicleColumns } from './index/vehicle-data-table/vehicle-datatable.common'
import type { VehicleModel } from 'src/graphql/generated/graphql-operations'
import VehicleCardMenu from './index/vehicle-data-table/VehicleCardMenu.vue'
import { getOffsetPaginationArgs } from 'src/utils/pagination.utils'
import VehicleCard from './index/vehicle-data-table/VehicleCard.vue'
import VehicleRow from './index/vehicle-data-table/VehicleRow.vue'
import { useApolloClient } from '@vue/apollo-composable'
import { onMounted, Ref, ref } from 'vue'
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

const rows: Ref<NonNullable<ListVehiclesQuery['vehicles']['nodes']>> = ref([])

type OnRequestArgs = Optional<
  Parameters<NonNullable<QTableProps['onRequest']>>[0],
  'filter' | 'getCellValue'
>

const onRequest = async ({ pagination: pag }: OnRequestArgs) => {
  if (loading.value) return

  const { offset, limit } = getOffsetPaginationArgs(pag)
  const { descending, sortBy: orderBy } = pag
  const search = filter.value ?? null

  await client
    .query({
      query: ListVehiclesDocument,
      variables: { offset, limit, orderBy, descending, search },
      fetchPolicy: 'network-only',
    })
    .then(({ data: { vehicles } }) => {
      if (vehicles.nodes) rows.value = vehicles.nodes

      pagination.value.page = pag.page
      pagination.value.sortBy = pag.sortBy
      pagination.value.rowsNumber = vehicles.pageInfo.total
      pagination.value.descending = pag.descending
      pagination.value.rowsPerPage = pag.rowsPerPage
    })
    .finally(() => {
      loading.value = false
    })
}

const menuTarget: Ref<string | false> = ref(false)
const grid = ref(false)

const selectedVehicle: Ref<VehicleModel | null> = ref(null)

const setMenuTarget = (vehicle: VehicleModel) => {
  selectedVehicle.value = vehicle

  if (menuTarget.value !== `#vehicle-row-${vehicle.id}`) {
    menuTarget.value = `#vehicle-row-${vehicle.id}`
  }
}

const refreshTable = () => {
  onRequest({ pagination: pagination.value }).catch(() => null)
}

onMounted(refreshTable)

const showCreateVehicleOverlay = ref(false)
</script>

<template>
  <q-page class="justify-center" style="background-color: #f9f9f9" padding>
    <q-table
      v-model:pagination="pagination"
      title="Meus Veículos"
      class="vehicle-table"
      :class="{ 'bg-white': grid, 'shadow-2': grid }"
      :rows="rows"
      :grid="grid"
      :columns="vehicleColumns"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[5, 10, 25, 50]"
      separator="cell"
      @request="onRequest"
    >
      <template #top>
        <VehicleDataTableHeader
          v-model:grid="grid"
          v-model:filter="filter"
          :create-btn-props="{ disable: showCreateVehicleOverlay }"
          @click:new-record="showCreateVehicleOverlay = true"
        />
      </template>

      <template #item="props">
        <div
          class="q-py-sm q-px-md col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        >
          <VehicleCard
            :vehicle="props.row"
            @click="() => setMenuTarget(props.row as VehicleModel)"
          />
        </div>
      </template>

      <template #body="props">
        <VehicleRow
          :vehicle="props.row"
          @click="() => setMenuTarget(props.row as VehicleModel)"
        />
      </template>
    </q-table>

    <VehicleCardMenu
      :vehicle="selectedVehicle ?? undefined"
      :target="menuTarget"
      touch-position
    />

    <CreateVehicleOverlay
      v-model="showCreateVehicleOverlay"
      @vehicle:created="refreshTable"
    />
  </q-page>
</template>

<style lang="sass" scoped>
.vehicle-table
  thead tr:first-child th:first-child
    background-color: #ededed

  td:first-child
    background-color: #ededed

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
