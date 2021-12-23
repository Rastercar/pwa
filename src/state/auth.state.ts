import { LoginResponse } from 'src/graphql/generated/graphql-operations';
import { loadFromLS, syncWithLS } from './utils/persist-state';
import { computed, reactive, readonly } from 'vue';

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
  apiToken: string | null;
}

const state: AuthState = reactive(loadFromLS('authState', { apiToken: null }));

syncWithLS({ authState: state });

/**
 * Sets the API token
 */
const AUTH_LOGIN = (loginResponse: LoginResponse) => {
  state.apiToken = loginResponse.token.value;
};

/**
 * Unsets the API token
 */
const AUTH_LOGOUT = () => {
  state.apiToken = null;
};

export const useAuth = () => ({
  AUTH_LOGIN,
  AUTH_LOGOUT,

  isLoggedIn: computed(() => !!state.apiToken),

  state: readonly(state),
});
