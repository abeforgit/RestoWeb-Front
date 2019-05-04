import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import { Menu } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
}

const initialState: MenuState = { menus: [] };

const moduleBuilder = getStoreBuilder<RootState>().module(
  'menus',
  initialState
);

// getters

const menusGetter = moduleBuilder.read(state => state.menus, 'getMenus');

// mutations

const setMenus = (state: MenuState, payload: { menus: Menu[] }) => {
  state.menus = payload.menus;
};

// actions
const fetchMenus = async (
  context: BareActionContext<MenuState, RootState>,
  page: number
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'menus',
      params: {
        page,
      },
    });
    setMenus(context.state, response.data);
  } catch (e) {
    console.log('could not fetch dishes');
  }
};

const menus = {
  get menus() {
    return menusGetter();
  },
  fetchMenus: moduleBuilder.dispatch(fetchMenus),
};

export default menus;
