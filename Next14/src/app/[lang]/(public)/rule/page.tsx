import styles from './rule.module.css';
import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/Hero';
import { Wrapper } from '@/components/Wrapper';
import { Rule } from '@/components/Rule';
import { getRuleDictionaries } from '@/lib/dictionary';

const getRule = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/rule/`,
    );

    if (response.status === 200) {
      return {
        banner: {
          is_active: true,
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

export default async function RulePage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const rule = await getRule(lang);
  const defaultImg = '/images/rule_bg_default.jpg';
  const staticData = await getRuleDictionaries(lang);
  return (
    <>
      <Hero
        banner={rule.banner}
        defaultImg={defaultImg}
        staticData={staticData}
      />
      <Wrapper>
        <Rule rule={rule.section} />
      </Wrapper>
    </>
  );
}
