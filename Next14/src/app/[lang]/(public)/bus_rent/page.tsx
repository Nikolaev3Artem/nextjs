import { Locale } from '@/i18n.config';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import styles from './bus_rent.module.css';
import axios from 'axios';
import { Rent } from '@/components/Rent';
import { getBusRentDictionaries } from '@/lib/dictionary';

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
    if (response.status === 200) {
      return {
        banner: {
          id: response.data.results[response.data.results.length - 1].id,
          h1: response.data.results[response.data.results.length - 1]
            .main_title,
          alt: response.data.results[response.data.results.length - 1].title1,
          img: response.data.results[response.data.results.length - 1].img,
          description:
            response.data.results[response.data.results.length - 1].main_desc,
        },
        section: {
          title1:
            response.data.results[response.data.results.length - 1].title1,
          text1: response.data.results[response.data.results.length - 1].text1,
          title2:
            response.data.results[response.data.results.length - 1].title2,
          text2: response.data.results[response.data.results.length - 1].text2,
        },
      };
    } else return { banner: {}, section: {} };
  } catch (error) {
    return { banner: {}, section: {} };
  }
};

export default async function Bus_rent({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const staticData = await getBusRentDictionaries(lang);
  const bus_rent = await getBusRent(lang);
  const defaultImg = '/images/bus_rent_bg_default.jpg';
  return (
    <>
      <Hero
        banner={bus_rent.banner}
        defaultImg={defaultImg}
        staticData={staticData}
      />
      <Wrapper>
        <Rent bus_rent={bus_rent.section} lang={lang} staticData={staticData} />
      </Wrapper>
    </>
  );
}
