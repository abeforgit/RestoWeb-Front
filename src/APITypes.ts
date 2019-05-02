export interface Resto {
  name: string;
  url: string;
}

export interface Location {
  zip_code: string;
  city: string;
  address: string;
  campus: string;
}

export interface Dish {
  url: string;
  name: string;
  price: number;
  type: string;
  diet: string;
}
