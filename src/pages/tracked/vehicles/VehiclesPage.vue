<script setup lang="ts">
import {
  ListVehiclesDocument,
  ListVehiclesQuery,
} from 'src/graphql/generated/graphql-operations'
import { vehicleColumns } from './vehicle-data-table/vehicle-datatable.common'
import VehicleCardMenu from './vehicle-data-table/VehicleCardMenu.vue'
import { getOffsetPaginationArgs } from 'src/utils/pagination.utils'
import VehicleCard from './vehicle-data-table/VehicleCard.vue'
import VehicleRow from './vehicle-data-table/VehicleRow.vue'
import { useApolloClient } from '@vue/apollo-composable'
import { onMounted, Ref, ref } from 'vue'
import { QTableProps } from 'quasar'

const { client } = useApolloClient()

const loading = ref(false)
const filter = ref('')

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
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

const setMenuTarget = (vehicleId: number) => {
  if (menuTarget.value !== `#vehicle-row-${vehicleId}`) {
    menuTarget.value = `#vehicle-row-${vehicleId}`
  }
}

onMounted(() => {
  onRequest({ pagination: pagination.value }).catch(() => null)
})
</script>

<template>
  <q-page padding class="justify-center" style="background-color: #f9f9f9">
    <q-table
      v-model:pagination="pagination"
      title="Meus Veículos"
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
        <q-icon
          :class="{ 'q-mb-sm': grid }"
          class="q-mr-md"
          name="fa fa-car"
          size="lg"
          color="grey-8"
        />
        <div class="text-h6" :class="{ 'q-mb-sm': grid }">Meus veículos</div>
        <q-space />
        <q-toggle
          v-model="grid"
          :class="{ 'q-mb-sm': grid }"
          label="VISUALIZAÇÃO DETALHADA"
          left-label
        />

        <q-input
          v-model="filter"
          class="q-ml-md"
          dense
          filled
          debounce="300"
          placeholder="Busca por placa"
        >
          <template #append>
            <q-icon name="fa fa-search" />
          </template>
        </q-input>
      </template>

      <template #item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <VehicleCard
            :vehicle="props.row"
            @click="() => setMenuTarget(props.row.id)"
          />
        </div>
      </template>

      <template #body="props">
        <VehicleRow
          :vehicle="props.row"
          @click="() => setMenuTarget(props.row.id)"
        />
      </template>
    </q-table>

    <VehicleCardMenu :target="menuTarget" touch-position />
  </q-page>
</template>
