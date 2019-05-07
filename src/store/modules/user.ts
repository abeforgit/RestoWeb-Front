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

// mutations

const setUser = (state: UserState, payload: { user: User }) => {
  state.user = payload.user;
};

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
    context.state.auth = response.data;
  } catch (e) {
    console.log('could not fetch restos');
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

const user = {
  get user() {
    return userGetter();
  },
  get auth() {
    return authGetter();
  },
  loginUser: moduleBuilder.dispatch(loginUser),
  createUser: moduleBuilder.dispatch(createUser),
};

export default user;
