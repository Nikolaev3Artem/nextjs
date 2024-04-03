import { Locale } from '@/i18n.config';
import { Hero } from '@/components/published/Hero';
import { Wrapper } from '@/components/common/Wrapper';

import axios from 'axios';
import { Rent } from '@/components/published/Rent';
import { getBusRentDictionaries } from '@/lib/dictionary';

const getBusRent = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/rent/`,
    );
    console.log(response.data);
    if (response.status === 200) {
      return {
        banner: {},
        section: response.data.results,
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
