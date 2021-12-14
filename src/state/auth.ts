import { loadFromLS, syncWithLS } from './utils/persist-state';
import { computed, reactive, readonly } from 'vue';
import { merge } from 'lodash';
import { UserModel } from 'src/graphql/schema-types';
import { DeepPartial } from 'quasar';

/*
 | Auth: 
 | 
 | Here should lie all state related logic related to authentication, permissions, etc.
 */

interface AuthState {
  user: UserModel | null;
  jwt: string | null;
}

export interface ApiJwt {
  type: 'bearer';
  value: string;
}

const state: AuthState = reactive(
  loadFromLS('authState', { user: null, jwt: null, isLoggingOut: false })
);

const AUTH_LOGIN = () => {
  //   state.user = loginData.user;
  //   state.jwt = loginData.token.value;
};

const AUTH_LOGOUT = () => {
  state.user = null;
  state.jwt = null;
};

const UPDATE_USER = (data: DeepPartial<UserModel>) => {
  state.user = merge(state.user, data);
};

syncWithLS({ authState: state });

export const useAuth = () => ({
  AUTH_LOGIN,
  AUTH_LOGOUT,

  UPDATE_USER,

  isLoggedIn: computed((): boolean => state.jwt !== null),

  state: readonly(state),
});
