import { Resto, Location, RestoInfo } from '@/APITypes';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import userStore from '@/store/modules/user';
import axios from 'axios';
import config from '@/config';

export interface RestoState {
  restos: Resto[];
  currentResto: RestoInfo | null;
}

const initialState: RestoState = {
  restos: [],
  currentResto: null,
};

const moduleBuilder = getStoreBuilder<RootState>().module(
  'restos',
  initialState
);

// getters
const restosGetter = moduleBuilder.read(state => state.restos, 'getRestos');
const currentRestoGetter = moduleBuilder.read(
  state => state.currentResto,
  'getCurrentResto'
);

// mutations
const setRestos = (state: RestoState, payload: Resto[]) => {
  state.restos = payload;
};
const setCurrentResto = (state: RestoState, payload: RestoInfo) => {
  state.currentResto = payload;
};

// actions
const fetchRestos = async (
  context: BareActionContext<RestoState, RootState>
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'restos',
      headers: {
        Accept: 'application/json',
      },
    });

    setRestos(context.state, response.data.restos);
  } catch (e) {
    console.log('could not fetch restos');
  }
};

const fetchCurrentResto = async (
  context: BareActionContext<RestoState, RootState>,
  payload: { restoPath: string }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: payload.restoPath,
      headers: {
        Accept: 'application/json',
      },
    });

    setCurrentResto(context.state, response.data);
  } catch (e) {
    console.log('could not fetch current resto');
  }
};

const updateCurrentResto = async (
  context: BareActionContext<RestoState, RootState>,
  payload: {
    resto: Resto;
    token: string;
  }
) => {
  try {
    if (!userStore.auth) {
      throw Error('Authentication');
    }
    const response = await axios({
      method: 'PUT',
      url: payload.resto.url,
      data: payload.resto,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
    fetchCurrentResto(context, { restoPath: payload.resto.url });
  } catch (e) {
    console.log('could not update resto');
  }
};

const deleteResto = async (
  context: BareActionContext<RestoState, RootState>,
  payload: {
    restoPath: string;
    token: string;
  }
) => {
  try {
    const response = await axios({
      method: 'DELETE',
      baseURL: config.URL,
      url: payload.restoPath,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not delete resto');
  }
};

export interface NewResto {
  name: string;
  description: string;
  location: Location;
}

const createResto = async (
  context: BareActionContext<RestoState, RootState>,
  payload: { newResto: NewResto; token: string }
) => {
  try {
    await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'restos',
      data: payload.newResto,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
    await fetchRestos(context);
  } catch (e) {
    console.log('could not add resto');
  }
};

const restos = {
  get restos() {
    return restosGetter();
  },
  get currentResto() {
    return currentRestoGetter();
  },
  fetchRestos: moduleBuilder.dispatch(fetchRestos),
  fetchCurrentResto: moduleBuilder.dispatch(fetchCurrentResto),
  updateCurrentResto: moduleBuilder.dispatch(updateCurrentResto),
  deleteCurrentResto: moduleBuilder.dispatch(deleteResto),
  createResto: moduleBuilder.dispatch(createResto),
};

export default restos;
