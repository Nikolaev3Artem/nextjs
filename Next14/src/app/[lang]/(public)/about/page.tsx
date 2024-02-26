import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { About } from '@/components/About';
import { IBa, IGetAbout } from '@/interface/IAbout';
import { getAboutDictionaries } from '@/lib/dictionary';

const getAbout = async (lang: Locale) => {
  try {
    const response = await axios.get<IGetAbout>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/about/`,
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

export default async function AboutPage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const about: IBa = await getAbout(lang);
  const staticData = await getAboutDictionaries(lang);
  const defaultImg = '/images/about_us_bg_default.jpg';

  return (
    <>
      <Hero
        banner={about.banner}
        defaultImg={defaultImg}
        isMain={false}
        staticData={staticData}
      />
      <Wrapper>
        <About about={about.section} />
      </Wrapper>
    </>
  );
}
