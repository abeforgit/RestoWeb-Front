import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';
import { Dish } from '@/APITypes';
export interface DishState {
  dishes: Dish[];
}

const initialState: DishState = { dishes: [] };
const moduleBuilder = getStoreBuilder<RootState>().module(
  'dishes',
  initialState
);

// getters

const dishesGetter = moduleBuilder.read(state => state.dishes, 'getDishes');

// mutations

const setDishes = (state: DishState, payload: { dishes: Dish[] }) => {
  state.dishes = payload.dishes;
};

// actions
const fetchDishes = async (
  context: BareActionContext<DishState, RootState>
) => {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: config.URL,
      url: 'dishes',
    });
    setDishes(context.state, response.data);
  } catch (e) {
    console.log('could not fetch dishes');
  }
};
const dishes = {
  get dishes() {
    return dishesGetter();
  },
  fetchDishes: moduleBuilder.dispatch(fetchDishes),
};
export default dishes;
