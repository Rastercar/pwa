import { JwtModel } from 'src/graphql/generated/graphql-operations'
import { loadFromLS, syncWithLS } from './utils/persist-state'
import { computed, reactive, readonly } from 'vue'
import { useApolloClient } from '@vue/apollo-composable'

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
}

const state: AuthState = reactive(loadFromLS('authState', { apiToken: null }))

syncWithLS({ authState: state })

/**
 * Sets the API token
 */
const AUTH_LOGIN = (token: JwtModel) => {
  // Dont worry too much about about storing the JWT in the local storage
  // https://pragmaticwebsecurity.com/articles/oauthoidc/localstorage-xss.html
  state.apiToken = token.value
}

/**
 * Unsets the API token and clears the apollo cache
 */
const AUTH_LOGOUT = (options = { clearApolloCache: true }) => {
  state.apiToken = null

  if (options.clearApolloCache) {
    // The apollo client cant be defined in this file root as the application
    // has not bootstraped so we need to call useApolloClient() here
    useApolloClient()
      .resolveClient()
      .clearStore()
      .catch(() => null)
  }
}

export const useAuth = () => ({
  AUTH_LOGIN,
  AUTH_LOGOUT,

  isLoggedIn: computed(() => !!state.apiToken),

  state: readonly(state),
})
