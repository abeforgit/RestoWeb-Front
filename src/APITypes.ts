export interface Resto {
  name: string;
  url: string;
}

export interface RestoInfo {
  url: string;
  name: string;
  description: string;
  location: Location;
  menus: { url: string };
  schedules: Schedule[];
  index: string;
}

export interface Location {
  zip_code: string;
  city: string;
  address: string;
  campus: string;
}

export interface Schedule {
  time_open: string;
  time_closed: string;
}

export interface Menu {
  url: string;
  date: string;
}

export interface MenuDetail {
  url: string;
  date: string;
  dishes: Array<{ url: string }>;
  resto: { url: string };
  index: string;
}

export interface MenuPage {
  number: number;
  limit: number;
  total_pages: number;
  total_menus: number;
}
export interface Rating {
  url: string;
  rating: number;
  user: string;
}

export interface DishDetail {
  url: string;
  name: string;
  price: number;
  type: string;
  diet: string;
  ratings: Rating[];
}

export interface Rating {
  rating: number;
  user: string;
}

export interface Rating {
  rating: number;
  user: string;
}
export interface Dish extends DishDetail {
  ratings: Rating[];
}

export interface User {
  url: string;
  username: string;
  admin: boolean;
}

export interface NewUser {
  username: string;
  password: string;
}
export type APIStatus = 'OK' | 'FETCHING' | 'ERROR' | 'NONE';
