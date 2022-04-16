import { loadFromLS, syncWithLS } from './utils/persist-state'
import { useApolloClient } from '@vue/apollo-composable'
import { computed, reactive, readonly } from 'vue'
import { useTrackedMap } from './tracked-map.state'

/*
 | Auth State: 
 | 
 | Here should lie all state related logic related to
 | authentication, permissions, etc, remembering that
 | in case some data lies within our graphql schema then
 | we should probably use the apollo cache as the source
 | of truth
 */

interface AuthState {
  /**
   * A JWT bearer token used to authenticate with the graphql / rest endpoints of the rastercar api
   */
  apiToken: string | null
  /**
   * The organization selected/being viewed on the client dashboard/pages, if the current user is a regular user
   * its the organization that he belongs too, if the user is a master user its a organization he can select
   * whenever acessing the client dashboard/pages
   */
  organizationId: number | null
}

const state: AuthState = reactive<AuthState>(
  loadFromLS('authState', { apiToken: null, organizationId: null })
)

syncWithLS({ authState: state })

interface LoginArgs {
  bearerToken: string
  organizationId?: number | null
}

// The apollo client cant be defined in this file root as the application
// has not bootstraped so we need to call useApolloClient() here
const clearApolloCache = (options = { refetch: false }) => {
  const client = useApolloClient().resolveClient()
  return options.refetch ? client.resetStore() : client.clearStore()
}

/**
 * Sets the API token and the selected organization
 */
const LOGIN = (loginData: LoginArgs) => {
  // Dont worry too much about about storing the JWT in the local storage
  // https://pragmaticwebsecurity.com/articles/oauthoidc/localstorage-xss.html
  state.apiToken = loginData.bearerToken
  state.organizationId = loginData.organizationId ?? null
}

/**
 * Unsets the API token and clears the apollo cache
 */
const LOGOUT = (options = { clearApolloCache: true }) => {
  state.apiToken = null
  state.organizationId = null

  if (options.clearApolloCache) clearApolloCache().catch(() => null)
}

const SET_ORGANIZATION = (organizationId: number | null) => {
  // For master users, since we query organization data using a custom header to send the organization ID
  // other than sending the ID as a query argument for every single query, the apollo cache should be cleared,
  // otherwise if we can have the following scenario:
  // - we are using organization 4 and we query and cache some of its data
  // - we change to organization 5 and query the same data
  // - apollo gets the cached data of organization 4 for organization 5
  clearApolloCache({ refetch: true }).catch(() => null)

  const { SET_SELECTED_TRACKERS } = useTrackedMap()

  SET_SELECTED_TRACKERS([])

  state.organizationId = organizationId
}

export const useAuth = () => ({
  LOGIN,
  LOGOUT,
  SET_ORGANIZATION,

  state: readonly(state),
  isLoggedIn: computed(() => !!state.apiToken),
})
