import axios from 'axios';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store.ts';
import { Menu, MenuDetail, MenuPage } from '@/APITypes';
import config from '@/config';

export interface MenuState {
  restoMenus: Menu[];
  currentMenu: MenuDetail | null;
  latestMenu: MenuDetail | null;
  pageData: MenuPage | null;
}

const initialState: MenuState = {
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
    await Promise.all(
      urlList.data.menus.map(async (menu: { url: string }) => {
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
      })
    );

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

const deleteMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: {
    menuPath: string;
    token: string;
  }
) => {
  try {
    const response = await axios({
      method: 'DELETE',
      baseURL: config.URL,
      url: payload.menuPath,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not delete menu');
  }
};

export interface NewMenu {
  date: string;
  dishes: Array<{ url: string }>;
}

const createRestoMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: {
    restoMenusPath: string;
    newMenu: NewMenu;
    token: string;
  }
) => {
  try {
    await axios({
      method: 'POST',
      baseURL: config.URL,
      url: payload.restoMenusPath,
      data: payload.newMenu,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not add menu');
  }
};

const updateCurrentMenu = async (
  context: BareActionContext<MenuState, RootState>,
  payload: {
    url: string;
    menu: NewMenu;
    token: string;
  }
) => {
  try {
    await axios({
      method: 'PUT',
      baseURL: payload.url,
      data: {
        ...payload.menu,
      },
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not update menu');
  }
};

const menuStore = {
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
  fetchRestoMenus: moduleBuilder.dispatch(fetchRestoMenus),
  fetchCurrentMenu: moduleBuilder.dispatch(fetchCurrentMenu),
  fetchLatestMenu: moduleBuilder.dispatch(fetchLatestMenu),
  deleteMenu: moduleBuilder.dispatch(deleteMenu),
  createRestoMenu: moduleBuilder.dispatch(createRestoMenu),
  updateCurrentMenu: moduleBuilder.dispatch(updateCurrentMenu),
};

export default menuStore;
