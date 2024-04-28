import { StopsProps } from './IJourney';

export interface IPopular {
  id: number;
  from_place: string;
  to_place: string;

  price: number;
  isPopular: boolean;
  cities: StopsProps[];

  travel_time: string;
}
