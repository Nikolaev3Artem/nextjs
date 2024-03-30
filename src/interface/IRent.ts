import { Locale } from '@/i18n.config';
import { BusRentStaticDataPageProp } from './IStaticData';

export interface IRent {
  id?: number | undefined;
  name?: string;
  photo?: any;
  images_list?: {
    id?: number;
    rent_bus?: number;
    image?: string;
  }[];

  is_active?: any;
  rentable?: any;
  busIdService?: [] | any;
  uploaded_images?: any;
  first_floor_seats?: string;
  second_floor_seats?: string;
  lang?: Locale;
  staticData: BusRentStaticDataPageProp;
  plates_number: string;
  first_floor_seats_count?: number;
  second_floor_seats_count?: number;
  is_Wc_Work?: any;
}
