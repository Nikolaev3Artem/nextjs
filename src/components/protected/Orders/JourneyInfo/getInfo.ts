'server only';

import { Locale } from '@/i18n.config';
import axios from 'axios';

export const getRoutInfo = async (routId: string, lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/journey/${routId}`,
    );

    if (response.status === 200) {
      return response.data;
    } else return [];
  } catch (error) {
    console.log(error);
  }
};
