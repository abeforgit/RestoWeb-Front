import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';
import { DishDetail, Rating } from '@/APITypes';
import { mount } from '@vue/test-utils';

export interface DishState {
  dishes: DishDetail[];
}

const initialState: DishState = { dishes: [] };
const moduleBuilder = getStoreBuilder<RootState>().module(
  'dishes',
  initialState
);

// getters
const dishesGetter = moduleBuilder.read(state => state.dishes, 'getDishes');

// mutations
const dishesSetter = moduleBuilder.commit(
  (state: DishState, payload: DishDetail[]) => {
    state.dishes = payload;
  },
  'setDishes'
);

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

    dishStore.dishes = response.data.dishes;
  } catch (e) {
    dishStore.dishes = [];
  }
};

const fetchDishList = async (
  context: BareActionContext<DishState, RootState>,
  payload: { dishList: Array<{ url: string }> }
) => {
  // TODO: convert to Promise.all()
  try {
    const allDishes: DishDetail[] = [];
    for (const dish of payload.dishList) {
      try {
        const response = await axios({
          method: 'GET',
          baseURL: dish.url,
          headers: {
            Accept: 'application/json',
          },
        });
        allDishes.push(response.data);
      } catch (e) {
        console.log('could not fetch dishes');
      }
    }
    dishStore.dishes = allDishes;
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
  payload: { newDish: NewDish; token: string }
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'dishes',
      data: payload.newDish,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });

    await fetchDishes(context);
  } catch (e) {
    console.log('could not create dish');
  }
};

const deleteDish = async (
  context: BareActionContext<DishState, RootState>,
  payload: {
    dishPath: string;
    token: string;
  }
) => {
  try {
    const response = await axios({
      method: 'DELETE',
      baseURL: config.URL,
      url: payload.dishPath,
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });

    await fetchDishes(context);
  } catch (e) {
    console.log('could not delete dish');
  }
};

const addRating = async (
  context: BareActionContext<DishState, RootState>,
  payload: {
    dishPath: string;
    rating: number;
    token: string;
  }
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: payload.dishPath + '/ratings',
      data: {
        rating: payload.rating,
      },
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not add rating');
  }
};
const updateRating = async (
  context: BareActionContext<DishState, RootState>,
  payload: { rating: Rating; token: string }
) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: payload.rating.url,
      data: { rating: payload.rating.rating },
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
  } catch (e) {
    console.log('could not set rating');
  }
};
const updateDish = async (
  context: BareActionContext<DishState, RootState>,
  payload: { dish: DishDetail; token: string }
) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: payload.dish.url,
      data: { ...payload.dish },
      headers: {
        Authorization: `Token ${payload.token}`,
      },
    });
    await fetchDishes(context);
  } catch (e) {
    console.log('could not update dish');
  }
};

const dishStore = {
  get dishes() {
    return dishesGetter();
  },
  set dishes(payload: DishDetail[]) {
    dishesSetter(payload);
  },
  fetchDishes: moduleBuilder.dispatch(fetchDishes),
  fetchDishList: moduleBuilder.dispatch(fetchDishList),
  createDish: moduleBuilder.dispatch(createDish),
  deleteDish: moduleBuilder.dispatch(deleteDish),
  addRating: moduleBuilder.dispatch(addRating),
  updateDish: moduleBuilder.dispatch(updateDish),
  updateRating: moduleBuilder.dispatch(updateRating),
};
export default dishStore;
