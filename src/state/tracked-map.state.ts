import { TrackerModel } from 'src/graphql/generated/graphql-operations'
import { loadFromLS, syncWithLS } from './utils/persist-state'
import { reactive } from 'vue'

interface TrackedMapState {
  selectedTrackers: TrackerModel[]
}

const state: TrackedMapState = reactive(
  loadFromLS('trackedMapState', { selectedTrackers: [] })
)

syncWithLS({ trackedMapState: state })

const SET_SELECTED_TRACKERS = (trackers: TrackerModel[]) => {
  state.selectedTrackers = trackers
}

export const useTrackedMap = () => ({
  SET_SELECTED_TRACKERS,

  state,
})
