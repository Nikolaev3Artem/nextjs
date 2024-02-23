import { Locale } from '@/i18n.config';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import styles from './bus_rent.module.css';
import axios from 'axios';
import { Rent } from '@/components/Rent';

const defaultData = {
  uk: [{ id: 1 }],
  en: [{ id: 2 }],
  pt: [{ id: 3 }],
  lt: [{ id: 4 }],
};

const getBusRent = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/rent/`,
    );
    console.log(response.data.results);
    if (response.status === 200) {
      return response.data.results;
    } else return defaultData[lang];
  } catch (error) {
    return defaultData[lang];
  }
};

export default async function Bus_rent({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  // const staticData = await (lang);
  const bus_rent = await getBusRent(lang);
  const defaultImg = '/images/bus_rent_bg_default.jpg';
  return (
    <>
      <Hero banner={bus_rent} defaultImg={defaultImg} />
      <Wrapper>
        <Rent bus_rent={bus_rent} lang={lang} />
      </Wrapper>
    </>
  );
}
