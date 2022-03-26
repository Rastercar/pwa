import { reactive, readonly } from 'vue'
import { loadFromLS, syncWithLS } from './utils/persist-state'

/*
 | Tracked Map State: 
 | 
 | Here should lie all state related to the tracked map page,
 | such as the trackers to listen for, preferences, themes, etc.
 */
interface TrackedMapState {
  selectedTrackerIds: number[]
}

const state: TrackedMapState = reactive(
  loadFromLS('trackedMapState', { selectedTrackerIds: [] })
)

syncWithLS({ trackedMapState: state })

const SET_SELECTED_TRACKERS = (trackerIds: number[]) => {
  state.selectedTrackerIds = trackerIds
}

export const useTrackedMap = () => ({
  SET_SELECTED_TRACKERS,
  state: readonly(state),
})
