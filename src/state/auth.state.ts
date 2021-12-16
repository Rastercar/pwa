import { LoginResponse } from 'src/graphql/generated/graphql-operations';
import { loadFromLS, syncWithLS } from './utils/persist-state';
import { API_TOKEN_KEY } from 'src/constants/local-storage-keys';
import { computed, reactive, readonly } from 'vue';

/*
 | Auth State: 
 | 
 | Here should lie all state related logic related to
 | authentication, permissions, etc.
 */

interface AuthState {
  apiToken: string | null;
}

const state: AuthState = reactive(loadFromLS('authState', { apiToken: null }));

syncWithLS({ authState: state });

/**
 *
 */
const AUTH_LOGIN = (loginResponse: LoginResponse) => {
  state.apiToken = loginResponse.token.value;
};

const AUTH_LOGOUT = () => {
  state.apiToken = null;
};

/**
 * Gets the bearer token (without the bearer prefix) that should be sent on the 'authentication''
 * header in order to authenticate with the api graphql endpoint or rest endpoints
 */
const getApiToken = () => localStorage.getItem(API_TOKEN_KEY);

export const useAuth = () => ({
  AUTH_LOGIN,
  AUTH_LOGOUT,

  getApiToken,

  isLoggedIn: computed(() => !!state.apiToken),

  state: readonly(state),
});
