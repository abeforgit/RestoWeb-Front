import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';
import { DishDetail, Rating, APIStatus } from '@/APITypes';
import { mount } from '@vue/test-utils';

export interface DishState {
  dishes: DishDetail[];
  dishList: DishDetail[];
  status: DishAPIStatus;
}

export interface DishAPIStatus {
  fetchDishes: APIStatus;
}

const initialState: DishState = {
  dishes: [],
  dishList: [],
  status: {
    fetchDishes: 'NONE',
  },
};

const moduleBuilder = getStoreBuilder<RootState>().module(
  'dishes',
  initialState
);

// getters
const dishesGetter = moduleBuilder.read(state => state.dishes, 'getDishes');
const dishListGetter = moduleBuilder.read(
  state => state.dishList,
  'getDishList'
);
const statusGetter = moduleBuilder.read(state => state.status, 'getStatus');

// mutations
const dishesSetter = moduleBuilder.commit(
  (state: DishState, payload: DishDetail[]) => {
    state.dishes = payload;
  },
  'setDishes'
);
const statusSetter = moduleBuilder.commit(
  (state: DishState, payload: { [P in keyof DishAPIStatus]?: APIStatus }) => {
    state.status = { ...state.status, ...payload };
  },
  'setStatus'
);

const dishListSetter = moduleBuilder.commit(
  (state: DishState, payload: DishDetail[]) => {
    state.dishList = payload;
  },
  'setDishList'
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

    const allDishes: DishDetail[] = [];
    for (const dish of response.data.dishes) {
      const ratingResponse = await axios({
        method: 'GET',
        baseURL: dish.url + '/ratings',
        headers: {
          Accept: 'application/json',
        },
      });
      dish.ratings = ratingResponse.data.ratings;
      allDishes.push(dish);
    }

    dishStore.dishes = allDishes;
    dishStore.status = { fetchDishes: 'OK' };
  } catch (e) {
    dishStore.dishes = [];
    dishStore.status = { fetchDishes: 'ERROR' };
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
    dishStore.dishList = allDishes;
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
  get dishList() {
    return dishListGetter();
  },
  set dishList(payload: DishDetail[]) {
    dishListSetter(payload);
  },

  get status() {
    return statusGetter();
  },
  set status(payload: { [P in keyof DishAPIStatus]?: APIStatus }) {
    statusSetter(payload);
  },
  fetchDishes: moduleBuilder.dispatch(fetchDishes, 'fetchDishes'),
  fetchDishList: moduleBuilder.dispatch(fetchDishList, 'fetchDishList'),
  createDish: moduleBuilder.dispatch(createDish),
  deleteDish: moduleBuilder.dispatch(deleteDish),
  addRating: moduleBuilder.dispatch(addRating),
  updateDish: moduleBuilder.dispatch(updateDish),
  updateRating: moduleBuilder.dispatch(updateRating),
};
export default dishStore;
