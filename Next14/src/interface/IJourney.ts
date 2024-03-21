export interface ITickets {
  id: number;
  name: string;
  surname: string;
  comment: string;
  reserved_seat: number;
  reserved_floor_seat: number;
  additional_baggage: string;
  journey: IJourney[];
}

export interface IJourney {
  id: number;
  routes: IRout[];
  bus: {
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
  }[];
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  is_active: boolean;
}

export interface StopsProps {
  city: string;
  id: number;
  price: number;
}

export interface IRout {
  from_place: string;
  id: string;
  isPopular: boolean;
  price: number;
  stops: StopsProps[];
  to_place: string;
}
