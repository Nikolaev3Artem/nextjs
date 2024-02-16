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
import { Wrapper } from '@/components/Wrapper';
import { getMainDictionaries } from '@/lib/dictionary';
import { MainSection } from '@/components/MainSection';

const getBanner = async (lang: Locale) => {
  try {
    const response = await axios.get<IBanner>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/main/`,
    );

    const data = {
      uk: [
        {
          id: 0,
          h1: 'Міжнародні перевезення в Португалію та Литву',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Замовляйте кращі квитки на кращі рейси',
        },
      ],
      en: [
        {
          id: 0,
          h1: 'International transportation to Portugal and Lithuania',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Order the best tickets for the best flights.',
        },
      ],
      lt: [
        {
          id: 0,
          h1: 'Tarptautiniai vežimai į Portugaliją ir Lietuvą',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description:
            'Užsisakykite geriausius bilietus į geriausius skrydžius',
        },
      ],
      pt: [
        {
          id: 0,
          h1: 'Transportes internacionais para Portugal e Lituânia',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Encomende os melhores bilhetes para os melhores voos.',
        },
      ],
    };
    return data[lang];
  } catch (error) {
    console.log(error);
    const data = {
      uk: [
        {
          id: 0,
          h1: 'Міжнародні перевезення в Португалію та Литву',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Замовляйте кращі квитки на кращі рейси',
        },
      ],
      en: [
        {
          id: 0,
          h1: 'International transportation to Portugal and Lithuania',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Order the best tickets for the best flights.',
        },
      ],
      lt: [
        {
          id: 0,
          h1: 'Tarptautiniai vežimai į Portugaliją ir Lietuvą',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description:
            'Užsisakykite geriausius bilietus į geriausius skrydžius',
        },
      ],
      pt: [
        {
          id: 0,
          h1: 'Transportes internacionais para Portugal e Lituânia',
          alt: 'string',
          is_active: false,
          img: '/images/map-lg-1x.jpg',
          description: 'Encomende os melhores bilhetes para os melhores voos.',
        },
      ],
    };
    return data[lang];
  }
};

export default async function Home({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const banner = await getBanner(lang);
  const staticData = await getMainDictionaries(lang);

  return (
    <>
      <Hero banner={banner} isMain={true} />
      <Wrapper>
        <MainSection staticData={staticData} lang={lang} />
      </Wrapper>
    </>
  );
}
