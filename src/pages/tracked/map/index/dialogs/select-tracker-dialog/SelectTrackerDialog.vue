<script setup lang="ts">
import {
  ListenToTrackerByIdDocument,
  ListActiveTrackersDocument,
  ListActiveTrackersQuery,
  TrackerModel,
} from '../../../../../../graphql/generated/graphql-operations'
import { useSubscription, useQuery } from '@vue/apollo-composable'
import { MapSymbol } from 'src/composables/use-map-component'
import { useTrackedMap } from 'src/state/tracked-map.state'
import SelectTrackerTable from './SelectTrackerTable.vue'
import { inject, Ref, ref } from 'vue'
import { QTableProps } from 'quasar'

const {
  onResult: onTrackersFetched,
  loading,
  result,
} = useQuery(ListActiveTrackersDocument)

const filter = ref('')

const map = inject(MapSymbol, ref(null))

const { SET_SELECTED_TRACKERS, state } = useTrackedMap()

const { start: listenToTrackers, onResult: onTrackerPosition } =
  useSubscription(ListenToTrackerByIdDocument, {
    ids: [...state.selectedTrackerIds],
  })

const listenToPositionsForSelectedTrackers: QTableProps['onUpdate:selected'] = (
  selected: TrackerModel[]
) => {
  const selectedTrackerIds = selected.map((tracker) => tracker.id)

  SET_SELECTED_TRACKERS(selectedTrackerIds)

  listenToTrackers()
}

const selected: Ref<ListActiveTrackersQuery['allActiveTrackers']> = ref([])

const syncPreviousSelectedTrackersWithDataTable = (
  trackers: ListActiveTrackersQuery['allActiveTrackers']
) => {
  selected.value = trackers.filter((tracker) => {
    return state.selectedTrackerIds.includes(tracker.id)
  })
}

onTrackersFetched(({ data }) => {
  syncPreviousSelectedTrackersWithDataTable(data.allActiveTrackers)
})

onTrackerPosition(({ data }) => {
  const position = data?.listenToTracker.lastPosition

  const lat = position?.lat ? position.lat.toFixed(3) : ''
  const lng = position?.lng ? position.lng.toFixed(3) : ''

  console.log(`[POSITION] Tracker:${data?.listenToTracker.id ?? ''}`)
  console.log(`${lat}, ${lng}`)

  if (state.options.fitMapOnTrackerPosition && position && map.value) {
    const originalMapBouds = map.value.getBounds()
    if (originalMapBouds) originalMapBouds.extend(position)
  }
})
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

      <SelectTrackerTable
        v-model:selected="selected"
        :rows="result?.allActiveTrackers || []"
        :loading="loading"
        :filter="filter"
        @update:selected="listenToPositionsForSelectedTrackers"
      />
    </q-card>
  </q-dialog>
</template>
