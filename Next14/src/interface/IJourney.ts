export interface IJourney {
  id: number;
  routes: IRout[];
  bus: {
    id: number;
    phone_number: string;
    telegram: string;
    viber: string;
    whatsup: string;
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
