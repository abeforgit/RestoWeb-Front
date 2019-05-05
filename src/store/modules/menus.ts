import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import { Menu, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
  pageData: MenuPage | null;
}

const initialState: MenuState = { menus: [], pageData: null };

const moduleBuilder = getStoreBuilder<RootState>().module(
  'menus',
  initialState
);

// getters

const menusGetter = moduleBuilder.read(state => state.menus, 'getMenus');
const pageDataGetter = moduleBuilder.read(
  state => state.pageData,
  'getPageData'
);

// mutations

const setMenus = (state: MenuState, payload: Menu[]) => {
  state.menus = payload;
};
const setPageDate = (state: MenuState, payload: MenuPage) => {
  state.pageData = payload;
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
    setMenus(context.state, response.data.menus);
    setPageDate(context.state, response.data.meta.page);
  } catch (e) {
    console.log('could not fetch menus');
  }
};

const menus = {
  get menus() {
    return menusGetter();
  },
  get pageData() {
    return pageDataGetter();
  },
  fetchMenus: moduleBuilder.dispatch(fetchMenus),
};

export default menus;
