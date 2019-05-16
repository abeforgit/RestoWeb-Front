import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import { Menu, MenuDetail, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
  pageData: MenuPage | null;
  latestMenu: MenuDetail | null;
}

const initialState: MenuState = { menus: [], pageData: null, latestMenu: null };

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
const latestMenuGetter = moduleBuilder.read(
  state => state.latestMenu,
  'getLatestMenu'
);

// mutations

const setMenus = (state: MenuState, payload: Menu[]) => {
  state.menus = payload;
};
const setPageData = (state: MenuState, payload: MenuPage) => {
  state.pageData = payload;
};
const setLatestMenu = (state: MenuState, payload: MenuDetail | null) => {
  state.latestMenu = payload;
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
      headers: {
        Accept: 'application/json',
      },
    });

    setMenus(context.state, response.data.menus);
    setPageData(context.state, response.data.meta.page);
  } catch (e) {
    console.log('could not fetch menus');
  }
};

const fetchLatestMenu = async (
  context: BareActionContext<MenuState, RootState>,
  id: number
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'restos/' + id + '/latestmenu',
      headers: {
        Accept: 'application/json',
      },
    });
    setLatestMenu(context.state, response.data);
  } catch (e) {
    setLatestMenu(context.state, null);
    console.log('could not fetch menu');
  }
};

const menus = {
  get menus() {
    return menusGetter();
  },
  get pageData() {
    return pageDataGetter();
  },
  get latestMenu() {
    return latestMenuGetter();
  },
  fetchMenus: moduleBuilder.dispatch(fetchMenus),
  fetchLatestMenu: moduleBuilder.dispatch(fetchLatestMenu),
};

export default menus;
