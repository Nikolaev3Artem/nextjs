import { Locale } from '@/i18n.config';
import { BusRentStaticDataPageProp } from './IStaticData';

export interface IRent {
  id?: number | undefined;
  name?: string;
  photo?: any;
  images_list?: {
    id?: number;

    photo?: string;
  }[];

  is_active?: any;
  rentable?: any;
  busIdService?: [] | any;
  uploaded_images?: any;
  first_floor_seats?: ISeat[];
  second_floor_seats?: ISeat[];
  lang?: Locale;

  plates_number?: string;
  first_floor_seats_count?: number;
  second_floor_seats_count?: number;
  wc?: any;
  is_wc_working?: boolean;
  rows_1?: number;
  rows_2?: number;
  rows_3?: number;
  rows_4?: number;
  rows_5?: number;
  enter_1?: boolean;
  enter_2?: boolean;
  enter_3?: boolean;
  wc_2?: any;
  wc_row_1?: string;
  wc_row_2?: string;
}

export interface ISeat {
  id: number;
  seat: number;
  status: string;
  checked?: boolean;
}
