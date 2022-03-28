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
import { inject, reactive, Ref, ref } from 'vue'
import { QTableProps } from 'quasar'

const {
  onResult: onTrackersFetched,
  loading,
  result,
} = useQuery(ListActiveTrackersDocument)

const filter = ref('')

const map = inject(MapSymbol, ref(null))

const trackerToListenIds: number[] = reactive([])

const { start: listenToTrackers, onResult: onTrackerPosition } =
  useSubscription(ListenToTrackerByIdDocument, { ids: trackerToListenIds })

const { SET_SELECTED_TRACKERS, state } = useTrackedMap()

const listenToPositionsForSelectedTrackers: QTableProps['onUpdate:selected'] = (
  selected: TrackerModel[]
) => {
  const selectedTrackerIds = selected.map((tracker) => tracker.id)

  // Must replace all array elements but not the array ref itself
  trackerToListenIds.splice(0, trackerToListenIds.length, ...selectedTrackerIds)

  SET_SELECTED_TRACKERS([...trackerToListenIds])

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
