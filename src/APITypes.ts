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

export interface Schedule {
  time_open: string;
  time_closed: string;
}

export interface RestoInfo {
  url: string;
  name: string;
  description: string;
  location: Location;
  menus: {
    url: string;
  };
  schedules: Schedule[];
  index: string;
}

export interface Dish {
  name: string;
}
