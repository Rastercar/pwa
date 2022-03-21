import { reactive, readonly } from 'vue'

interface LayoutState {
  sidebarOpen: boolean
}

const state: LayoutState = reactive({ sidebarOpen: false })

const TOGGLE_SIDEBAR = () => {
  state.sidebarOpen = !state.sidebarOpen
}

const SET_SIDEBAR = (value: boolean) => {
  state.sidebarOpen = value
}

export const useLayout = () => ({
  SET_SIDEBAR,
  TOGGLE_SIDEBAR,
  state: readonly(state),
})
