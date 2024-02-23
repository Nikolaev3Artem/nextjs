import { Locale } from '@/i18n.config';

export interface IRent {
  id?: number | undefined;
  name?: string;
  poster?: any;
  images?: [
    {
      id?: number;
      rent_bus?: number;
      image?: string;
    },
  ];
  is_active?: any;
  busIdService?: [] | any;
  uploaded_images?: any;
  places?: string;
  floor?: string;
  lang?: Locale;
}
