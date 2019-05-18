import { getStoreBuilder } from 'vuex-typex';
import Vue from 'vue';
import Vuex from 'vuex';
import { DishState } from '@/store/modules/dishes';
import { RestoState } from '@/store/modules/restos';
import { MenuState } from '@/store/modules/menus';
import { UserState } from '@/store/modules/user';
import './modules/restos';
import './modules/dishes';
import './modules/menus';
import './modules/user';

Vue.use(Vuex);

export interface RootState {
  restoState: RestoState;
  menuState: MenuState;
  dishState: DishState;
  userState: UserState;
}

const storeBuilder = getStoreBuilder<RootState>();
const store = storeBuilder.vuexStore();
export default store;
