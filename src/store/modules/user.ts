import { APIStatus, NewUser, User } from '@/APITypes';
import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import config from '@/config';

export interface UserState {
  user: User | null;
  auth: { token: string } | null;
  status: UserAPIStatus;
}

export interface UserAPIStatus {
  createUser: APIStatus;
  test: APIStatus;
}

const initialState: UserState = {
  user: null,
  auth: null,
  status: {
    createUser: 'NONE',
    test: 'NONE',
  },
};

const moduleBuilder = getStoreBuilder<RootState>().module('user', initialState);

// getters

const userGetter = moduleBuilder.read(state => state.user, 'getUser');
const authGetter = moduleBuilder.read(state => state.auth, 'getAuth');
const isLoggedGetter = moduleBuilder.read(
  state => state.user && state.auth && state.auth.token,
  'getIsLoggedIn'
);
const isAdminGetter = moduleBuilder.read(
  state => state.user && state.user.admin,
  'getIsAdmin'
);
const statusGetter = moduleBuilder.read(state => state.status, 'getStatus');

// mutations

const userSetter = moduleBuilder.commit(
  (state: UserState, payload: User | null) => {
    state.user = payload;
  },
  'setUser'
);
const authSetter = moduleBuilder.commit(
  (state: UserState, payload: { token: string } | null) => {
    state.auth = payload;
  },
  'setAuth'
);
const statusSetter = moduleBuilder.commit(
  (state: UserState, payload: { [P in keyof UserAPIStatus]?: APIStatus }) => {
    state.status = { ...state.status, ...payload };
  },
  'setStatus'
);

// actions
const loginUser = async (
  context: BareActionContext<UserState, RootState>,
  payload: NewUser
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'login',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    userStore.auth = { token: response.data.token };
    userStore.user = {
      username: response.data.username,
      admin: response.data.is_admin,
      url: response.data.url,
    };
  } catch (e) {
    console.log('could not login');
  }
};

const createUser = async (
  context: BareActionContext<UserState, RootState>,
  payload: NewUser
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'signup',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    userStore.status = { createUser: 'OK' };
  } catch (e) {
    userStore.status = { createUser: 'ERROR' };
  }
};

const logout = async (context: BareActionContext<UserState, RootState>) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'logout',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      userStore.user = null;
      userStore.auth = null;
    }
  } catch (e) {
    console.log('could not logout');
  }
};

const userStore = {
  get user() {
    return userGetter();
  },
  get auth() {
    return authGetter();
  },
  get isLoggedIn() {
    return isLoggedGetter();
  },
  get isAdmin() {
    return isAdminGetter();
  },
  set user(payload: User | null) {
    userSetter(payload);
  },
  set auth(payload: { token: string } | null) {
    authSetter(payload);
  },
  get status() {
    return statusGetter();
  },
  set status(payload: { [P in keyof UserAPIStatus]?: APIStatus }) {
    statusSetter(payload);
  },
  loginUser: moduleBuilder.dispatch(loginUser),
  createUser: moduleBuilder.dispatch(createUser),
  logout: moduleBuilder.dispatch(logout),
};

export default userStore;
