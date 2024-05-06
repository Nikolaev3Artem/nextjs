export interface ITickets {
  id: number;
  name: string;
  surname: string;
  comment: string;
  reserved_seat: number;
  reserved_floor_seat: number;
  additional_baggage: string;
  journey: IJourney[];

  passanger_type: string;
  status: string;
  created_at: string;
  departure_date: string;
  arrival_date: string;
}

export interface IJourney {
  id: number;
  routes: IRout[];
  bus: IBus[];
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  is_active: boolean;
  created_at: string;
}

export interface IBus {
  id: number;
  phone_number: string;
  telegram: string;
  viber: string;
  whatsup: string;
  first_floor_seats: any[];
  first_floor_seats_count: number;
  images_list: any[];
  name: string;
  photo: string;
  plates_number: string;

  second_floor_seats: any[];
  second_floor_seats_count: number;
  rows_1?: number | undefined;
  rows_2?: number;
  rows_3?: number;
  wc?: string;
  enter_2?: boolean;
  enter_1?: boolean;
  enter_3?: boolean;
  rows_4?: number | undefined;
  rows_5?: number | undefined;
}

export interface StopsProps {
  city: string;
  id: string;
  price?: number | string | undefined;
  coords_x?: string;
  cooords_y?: string;
  address?: string;
}

export interface IRout {
  from_place: any;
  id: string;
  isPopular: boolean;
  price?: number | string | null;

  to_place: any;
  is_stop?: boolean;
  is_popular?: boolean;
  travel_time: string;
  cities: StopsProps[];
}
