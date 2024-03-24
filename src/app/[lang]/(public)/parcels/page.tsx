import { Locale } from '@/i18n.config';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';
import { Hero } from '@/components/published/Hero';
import { Wrapper } from '@/components/common/Wrapper';
import { Parcels } from '@/components/published/Parcels';
import { getParcelsDictionaries } from '@/lib/dictionary';

const getParcels = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/parcel/`,
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

export default async function ParcelsPage({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  const parcels = await getParcels(lang);
  const defaultImg = '/images/parcels_bg_default.jpg';
  const staticData = await getParcelsDictionaries(lang);
  return (
    <>
      <Hero
        banner={parcels.banner}
        defaultImg={defaultImg}
        staticData={staticData}
      />
      <Wrapper>
        <Parcels parcels={parcels.section} />
      </Wrapper>
    </>
  );
}
