import { getStoreBuilder } from 'vuex-typex';
import Vue from 'vue';
import Vuex from 'vuex';
import { DishState } from '@/store/modules/dishes';
import { RestoState } from '@/store/modules/restos';
import { UserState } from '@/store/modules/user';
import './modules/restos';
import './modules/dishes';

Vue.use(Vuex);

export interface RootState {
  dishState: DishState;
  restoState: RestoState;
  userState: UserState;
}
const storeBuilder = getStoreBuilder<RootState>();

const store = storeBuilder.vuexStore();
export default store;
