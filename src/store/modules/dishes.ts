import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';
import { Dish } from '@/APITypes';
import { getURLPath } from '@/util';

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

const setDishes = (state: DishState, payload: Dish[]) => {
  state.dishes = payload;
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
      headers: {
        Accept: 'application/json',
      },
    });
    setDishes(context.state, response.data.dishes);
  } catch (e) {
    console.log('could not fetch dishes');
  }
};

const fetchDishList = async (
  context: BareActionContext<DishState, RootState>,
  dishList: Array<{ url: string }>
) => {
  // TODO: convert to Promise.all()
  try {
    const allDishes: Dish[] = [];
    console.log(dishList);
    for (const dish of dishList) {
      const path = getURLPath(dish.url);
      try {
        const response = await axios({
          method: 'GET',
          baseURL: config.URL,
          url: path,
          headers: {
            Accept: 'application/json',
          },
        });
        allDishes.push(response.data);
      } catch (e) {
        console.log('could not fetch dishes');
      }
    }
    setDishes(context.state, allDishes);
  } finally {
    console.log('finally');
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
  fetchDishList: moduleBuilder.dispatch(fetchDishList),
  createDish: moduleBuilder.dispatch(createDish),
};
export default dishes;
