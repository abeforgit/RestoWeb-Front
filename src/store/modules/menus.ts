import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store.ts';
import { Menu, MenuDetail, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
  restosMenus: Menu[];
  currentMenu: MenuDetail | null;
  latestMenu: MenuDetail | null;
  pageData: MenuPage | null;
}

const initialState: MenuState = {
  menus: [],
  restosMenus: [],
  currentMenu: null,
  latestMenu: null,
  pageData: null,
};

const moduleBuilder = getStoreBuilder<RootState>().module(
  'menus',
  initialState
);

// getters
const menusGetter = moduleBuilder.read(state => state.menus, 'getMenus');
const restosMenusGetter = moduleBuilder.read(
  state => state.restosMenus,
  'getRestosMenus'
);
const currentMenuGetter = moduleBuilder.read(
  state => state.currentMenu,
  'getCurrentMenuState'
);
const latestMenuGetter = moduleBuilder.read(
  state => state.latestMenu,
  'getLatestMenu'
);
const pageDataGetter = moduleBuilder.read(
  state => state.pageData,
  'getPageData'
);

// mutations

const setMenus = (state: MenuState, payload: Menu[]) => {
  state.menus = payload;
};
const setRestosMenus = (state: MenuState, payload: Menu[]) => {
  state.restosMenus = payload;
};
const setCurrentMenu = (state: MenuState, payload: MenuDetail | null) => {
  state.currentMenu = payload;
};
const setLatestMenu = (state: MenuState, payload: MenuDetail | null) => {
  state.latestMenu = payload;
};
const setPageData = (state: MenuState, payload: MenuPage) => {
  state.pageData = payload;
};

// actions
const fetchMenus = async (
  context: BareActionContext<MenuState, RootState>,
  payload: { page: number }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'menus',
      params: {
        page: payload.page,
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

const fetchRestosMenus = async (
  context: BareActionContext<MenuState, RootState>,
  payload: {
    page: number;
    restoId: number;
  }
) => {
  try {
    const urlList = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: '/restos/' + payload.restoId + '/menus',
      params: {
        page: payload.page,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const allMenus: Menu[] = [];
    for (const menu of urlList.data.menus) {
      try {
        const response = await axios({
          method: 'GET',
          baseURL: menu.url,
          headers: {
            Accept: 'application/json',
          },
        });
        allMenus.push({
          url: menu.url,
          date: response.data.date,
        });
      } catch (e) {
        console.log('could not fetch menus');
      }
    }

    setRestosMenus(context.state, allMenus);
    setPageData(context.state, urlList.data.meta.page);
  } catch (e) {
    console.log('could not fetch menus');
  }
};

const fetchCurrentMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: { menuId: number }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: '/menus/' + payload.menuId,
      headers: {
        Accept: 'application/json',
      },
    });

    setCurrentMenu(context.state, response.data);
  } catch (e) {
    setCurrentMenu(context.state, null);
    console.log('could not fetch menu');
  }
};

const fetchLatestMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: { restoId: number }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'restos/' + payload.restoId + '/latestmenu',
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
  get restosMenus() {
    return restosMenusGetter();
  },
  get currentMenu() {
    return currentMenuGetter();
  },
  get latestMenu() {
    return latestMenuGetter();
  },
  get pageData() {
    return pageDataGetter();
  },
  fetchMenus: moduleBuilder.dispatch(fetchMenus),
  fetchRestosMenus: moduleBuilder.dispatch(fetchRestosMenus),
  fetchCurrentMenu: moduleBuilder.dispatch(fetchCurrentMenu),
  fetchLatestMenu: moduleBuilder.dispatch(fetchLatestMenu),
};

export default menus;
