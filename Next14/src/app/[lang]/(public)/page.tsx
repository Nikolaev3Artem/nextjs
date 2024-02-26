import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner, IGetBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { getMainDictionaries } from '@/lib/dictionary';
import { MainSection } from '@/components/MainSection';

const getBanner = async (lang: Locale) => {
  try {
    const response = await axios.get<IGetBanner>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/mai/`,
    );
    if (response.status === 200) {
      return {
        id: response.data.results[response.data.results.length - 1].id,
        h1: response.data.results[response.data.results.length - 1].h1,
        alt: response.data.results[response.data.results.length - 1].alt,
        is_active:
          response.data.results[response.data.results.length - 1].is_active,
        img: response.data.results[response.data.results.length - 1].img,
        description:
          response.data.results[response.data.results.length - 1].description,
      };
    } else return {};
  } catch (error) {
    return {};
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
  const defaultImg = '/images/hero_bg_default.jpg';

  return (
    <>
      <Hero
        banner={banner}
        isMain={true}
        defaultImg={defaultImg}
        staticData={staticData}
      />
      <Wrapper>
        <MainSection staticData={staticData} lang={lang} />
      </Wrapper>
    </>
  );
}
