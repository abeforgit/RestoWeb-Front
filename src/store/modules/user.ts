import { NewUser, User } from '@/APITypes';
import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import config from '@/config';

export interface UserState {
  user: User | null;
  auth: { token: string } | null;
}

const initialState: UserState = {
  user: null,
  auth: null,
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
  } catch (e) {
    console.log('could not create user');
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
  loginUser: moduleBuilder.dispatch(loginUser),
  createUser: moduleBuilder.dispatch(createUser),
  logout: moduleBuilder.dispatch(logout),
};

export default userStore;
