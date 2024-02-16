import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Style from './page.module.css';
import Typography from '@mui/material/Typography';
import { Locale } from '@/i18n.config';
import Banner from '@/components/Banner/Banner';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';

const getBanner = async (lang: Locale) => {
  try {
    // const response = await axios.get<IBanner>(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/main/`,
    // );

    // console.log(response.data);
    const data = [
      {
        id: 0,
        h1: 'Міжнародні перевезення в Португалію та Литву',
        alt: 'string',
        is_active: false,
        img: '/images/map-lg-1x.jpg',
        description: 'Замовляйте кращі квитки на кращі рейси',
      },
    ];
    return data;
  } catch (error) {
    console.log(error);
    return [
      {
        id: 0,
        h1: 'Міжнародні перевезення в Португалію та Литву',
        alt: 'string',
        is_active: false,
        img: '/images/hero_bg_default.jpg',
        description: 'Замовляйте кращі квитки на кращі рейси',
      },
    ];
  }
};

export default async function Home({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const banner = await getBanner(lang);

  return (
    <>
      <Hero banner={banner} isMain={true} />
    </>
  );
}
