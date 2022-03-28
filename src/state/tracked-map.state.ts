import { reactive, readonly } from 'vue'
import { loadFromLS, syncWithLS } from './utils/persist-state'

/*
 | Tracked Map State: 
 | 
 | Here should lie all state related to the tracked map page,
 | such as the trackers to listen for, preferences, themes, etc.
 */

interface TrackedMapOptions {
  /**
   * If the map bounds should be adjusted to contain all the trackers once
   * a new position is recieved for example zooming out if a new position
   * out the current view has been recieved
   */
  fitMapOnTrackerPosition: boolean
  /**
   * If the map bounds should be adjusted to contain all the selected trackers
   */
  fitMapOnTrackerSelection: boolean
}

interface TrackedMapState {
  options: TrackedMapOptions
  selectedTrackerIds: number[]
}

const state: TrackedMapState = reactive(
  loadFromLS('trackedMapState', {
    selectedTrackerIds: [],
    options: {
      fitMapOnTrackerPosition: true,
      fitMapOnTrackerSelection: true,
    },
  })
)

syncWithLS({ trackedMapState: state })

const SET_SELECTED_TRACKERS = (trackerIds: number[]) => {
  state.selectedTrackerIds = trackerIds
}

const SET_MAP_OPTIONS = (newOptions: Partial<TrackedMapOptions>) => {
  state.options = { ...state.options, ...newOptions }
}

export const useTrackedMap = () => ({
  SET_MAP_OPTIONS,
  SET_SELECTED_TRACKERS,
  state: readonly(state),
})
