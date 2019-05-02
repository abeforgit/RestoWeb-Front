import { Resto } from '@/APITypes';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';

export interface RestoState {
  restos: Resto[];
}

const initialState: RestoState = {
  restos: [],
};

const moduleBuilder = getStoreBuilder<RootState>().module(
  'restos',
  initialState
);

// getters

const restosGetter = moduleBuilder.read(state => state.restos, 'getRestos');

// mutations

const setRestos = (state: RestoState, payload: { restos: Resto[] }) => {
  state.restos = payload.restos;
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
    });

    setRestos(context.state, response.data);
  } catch (e) {
    console.log('could not fetch restos');
  }
};

const restos = {
  get restos() {
    return restosGetter();
  },
  fetchRestos: moduleBuilder.dispatch(fetchRestos),
};

export default restos;
