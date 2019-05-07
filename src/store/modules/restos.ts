import { Resto, Location, RestoInfo } from '@/APITypes';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import userState from '@/store/modules/user';
import axios from 'axios';
import config from '@/config';
import user from '@/store/modules/user';

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

const setRestos = (state: RestoState, payload: { restos: Resto[] }) => {
  state.restos = payload.restos;
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

    setRestos(context.state, response.data);
  } catch (e) {
    console.log('could not fetch restos');
  }
};

const fetchCurrentResto = async (
  context: BareActionContext<RestoState, RootState>,
  id: number
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'restos/' + id,
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
  payload: Resto
) => {
  try {
    if (!userState.auth) {
      throw Error('Authentication');
    }
    const response = await axios({
      method: 'PUT',
      url: payload.url,
      data: payload,
      headers: {
        Authorization: userState.auth.token,
      },
    });
  } catch (e) {
    console.log('could not update resto');
  }
};

export interface NewResto {
  name: string;
  description: string;
  location: Location;
}

const createResto = async (
  context: BareActionContext<RestoState, RootState>,
  payload: NewResto
) => {
  try {
    await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'restos',
      data: payload,
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
  createResto: moduleBuilder.dispatch(createResto),
};

export default restos;
