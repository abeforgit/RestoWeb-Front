import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import { Menu, MenuInfo, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
  currentMenu: MenuInfo | null;
  pageData: MenuPage | null;
  latestMenu: MenuInfo | null;
}

const initialState: MenuState = {
  menus: [],
  currentMenu: null,
  pageData: null,
  latestMenu: null,
};

const moduleBuilder = getStoreBuilder<RootState>().module(
  'menus',
  initialState
);

// getters
const menusGetter = moduleBuilder.read(state => state.menus, 'getMenus');
const currentMenuGetter = moduleBuilder.read(
  state => state.currentMenu,
  'getCurrentMenuState'
);
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
const setCurrentMenu = (state: MenuState, payload: MenuInfo) => {
  state.currentMenu = payload;
};
const setPageData = (state: MenuState, payload: MenuPage) => {
  state.pageData = payload;
};
const setLatestMenu = (state: MenuState, payload: MenuInfo) => {
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
  id: string
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
