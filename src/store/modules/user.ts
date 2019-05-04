import { User } from '@/APITypes';
import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import config from '@/config';

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    username: '',
    password: '',
    admin: false,
  },
};

const moduleBuilder = getStoreBuilder<RootState>().module('user', initialState);

// getters

const userGetter = moduleBuilder.read(state => state.user, 'getUser');

// mutations

const setUser = (state: UserState, payload: { user: User }) => {
  state.user = payload.user;
};

// actions

const loginUser = async (
  context: BareActionContext<UserState, RootState>,
  payload: {
    username: string;
    password: string;
  }
) => {
  try {
    const response = await axios({
      method: 'POSt',
      baseURL: config.URL,
      url: 'login',
      data: payload,
    });
  } catch (e) {
    console.log('could not fetch restos');
  }
};
