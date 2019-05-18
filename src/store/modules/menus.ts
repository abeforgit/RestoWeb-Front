import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store.ts';
import { Menu, MenuDetail, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  menus: Menu[];
  restoMenus: Menu[];
  currentMenu: MenuDetail | null;
  latestMenu: MenuDetail | null;
  pageData: MenuPage | null;
}

const initialState: MenuState = {
  menus: [],
  restoMenus: [],
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
const restoMenusGetter = moduleBuilder.read(
  state => state.restoMenus,
  'getRestoMenus'
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

const menusSetter = moduleBuilder.commit(
  (state: MenuState, payload: Menu[]) => {
    state.menus = payload;
  },
  'setMenus'
);
const restoMenusSetter = moduleBuilder.commit(
  (state: MenuState, payload: Menu[]) => {
    state.restoMenus = payload;
  },
  'setRestoMenus'
);
const currentMenuSetter = moduleBuilder.commit(
  (state: MenuState, payload: MenuDetail | null) => {
    state.currentMenu = payload;
  },
  'setCurrentMenu'
);
const latestMenuSetter = moduleBuilder.commit(
  (state: MenuState, payload: MenuDetail | null) => {
    state.latestMenu = payload;
  },
  'setLatestMenu'
);
const pageDataSetter = moduleBuilder.commit(
  (state: MenuState, payload: MenuPage | null) => {
    state.pageData = payload;
  },
  'setPageData'
);

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

    menuStore.menus = response.data.menus;
    menuStore.pageData = response.data.meta.page;
  } catch (e) {
    console.log('could not fetch menus');
  }
};

const fetchRestoMenus = async (
  context: BareActionContext<MenuState, RootState>,
  payload: {
    page: number;
    restoMenusPath: string;
  }
) => {
  try {
    const urlList = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: payload.restoMenusPath,
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

    menuStore.restoMenus = allMenus;
    menuStore.pageData = urlList.data.meta.page;
  } catch (e) {
    console.log('could not fetch menus');
  }
};

const fetchCurrentMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: { menuPath: string }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: payload.menuPath,
      headers: {
        Accept: 'application/json',
      },
    });

    menuStore.currentMenu = response.data;
  } catch (e) {
    menuStore.currentMenu = null;
  }
};

const fetchLatestMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: { restoPath: string }
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: payload.restoPath + '/latestmenu',
      headers: {
        Accept: 'application/json',
      },
    });

    menuStore.latestMenu = response.data;
  } catch (e) {
    menuStore.latestMenu = null;
  }
};

const menuStore = {
  get menus() {
    return menusGetter();
  },
  set menus(payload: Menu[]) {
    menusSetter(payload);
  },
  get restoMenus() {
    return restoMenusGetter();
  },
  set restoMenus(payload: Menu[]) {
    restoMenusSetter(payload);
  },
  get currentMenu() {
    return currentMenuGetter();
  },
  set currentMenu(payload: MenuDetail | null) {
    currentMenuSetter(payload);
  },
  get latestMenu() {
    return latestMenuGetter();
  },
  set latestMenu(payload: MenuDetail | null) {
    latestMenuSetter(payload);
  },
  get pageData() {
    return pageDataGetter();
  },
  set pageData(payload: MenuPage | null) {
    pageDataSetter(payload);
  },
  fetchMenus: moduleBuilder.dispatch(fetchMenus),
  fetchRestoMenus: moduleBuilder.dispatch(fetchRestoMenus),
  fetchCurrentMenu: moduleBuilder.dispatch(fetchCurrentMenu),
  fetchLatestMenu: moduleBuilder.dispatch(fetchLatestMenu),
};

export default menuStore;
