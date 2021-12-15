import { loadFromLS, syncWithLS } from './utils/persist-state';
import { LoginResponse, UserModel } from 'src/graphql/schema-types';
import { computed, reactive, readonly } from 'vue';
import { DeepPartial } from 'quasar';
import { merge } from 'lodash';

/*
 | Auth State: 
 | 
 | Here should lie all state related logic related to authentication, permissions, etc.
 */

interface AuthState {
  user: UserModel | null;
  userToken: string | null;
}

const state: AuthState = reactive(
  loadFromLS('authState', { user: null, userToken: null })
);

const AUTH_LOGIN = (loginResponse: LoginResponse) => {
  console.log('authLOGIN', loginResponse);
  state.user = loginResponse.user;
  state.userToken = loginResponse.token.value;
};

const AUTH_LOGOUT = () => {
  state.user = null;
  state.userToken = null;
};

const UPDATE_USER = (data: DeepPartial<UserModel>) => {
  state.user = merge(state.user, data);
};

syncWithLS({ authState: state });

export const useAuth = () => ({
  AUTH_LOGIN,
  AUTH_LOGOUT,

  UPDATE_USER,

  isLoggedIn: computed(() => !!state.userToken),

  state: readonly(state),
});
