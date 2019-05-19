import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/store';
import axios from 'axios';
import config from '@/config';
import { Dish } from '@/APITypes';

export interface DishState {
  dishes: Dish[];
  dishList: Dish[];
}

const initialState: DishState = { dishes: [], dishList: [] };
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

// mutations
const dishesSetter = moduleBuilder.commit(
  (state: DishState, payload: Dish[]) => {
    state.dishes = payload;
  },
  'setDishes'
);

const dishListSetter = moduleBuilder.commit(
  (state: DishState, payload: Dish[]) => {
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

    const allDishes: Dish[] = [];
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
    const allDishes: Dish[] = [];
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
  payload: { newDish: NewDish }
) => {
  try {
    const response = await axios({
      method: 'POST',
      baseURL: config.URL,
      url: 'dishes',
      data: payload.newDish,
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

const dishStore = {
  get dishes() {
    return dishesGetter();
  },
  set dishes(payload: Dish[]) {
    dishesSetter(payload);
  },
  get dishList() {
    return dishListGetter();
  },
  set dishList(payload: Dish[]) {
    dishListSetter(payload);
  },
  fetchDishes: moduleBuilder.dispatch(fetchDishes),
  fetchDishList: moduleBuilder.dispatch(fetchDishList),
  createDish: moduleBuilder.dispatch(createDish),
  deleteDish: moduleBuilder.dispatch(deleteDish),
  addRating: moduleBuilder.dispatch(addRating),
};
export default dishStore;
