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
export interface NewDish {
  name: string;
  diet: string;
  type: string;
  price: number;
}

const createDish = async (
  context: BareActionContext<DishState, RootState>,
  payload: NewDish
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'dishes',
      data: payload,
    });
    await fetchDishes(context);
  } catch (e) {
    console.log('could not create dish');
  }
};

const dishes = {
  get dishes() {
    return dishesGetter();
  },
  fetchDishes: moduleBuilder.dispatch(fetchDishes),
  createDish: moduleBuilder.dispatch(createDish),
};
export default dishes;
