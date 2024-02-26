import { Locale } from '@/i18n.config';
import axios from 'axios';

import { Footer } from '@/components/Footer';
import {
  getFooterDictionaries,
  getHeaderDictionaries,
  getInfobuyDictionaries,
  getPopularDictionaries,
} from '@/lib/dictionary';
import { NavBar } from '@/components/NavBar';
import { InfoBuy } from '@/components/InfoBuy';
import { Popular } from '@/components/Popular';

const getPopularRouts = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/routes/popular_routes`,
    );

    if (response.status === 200) {
      return response.data;
    } else return [];
  } catch (error) {
    return [];
  }
};

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const header = await getHeaderDictionaries(lang);
  const footer = await getFooterDictionaries(lang);
  const infobuy = await getInfobuyDictionaries(lang);
  const popular = await getPopularDictionaries(lang);
  const popularRouts = await getPopularRouts(lang);

  return (
    <>
      <NavBar staticData={header} lang={lang} />
      <main>
        {children}
        <InfoBuy staticData={infobuy} lang={lang} />
        {popularRouts && (
          <Popular staticData={popular} popularRouts={popularRouts} />
        )}
      </main>

      <Footer staticData={footer} lang={lang} />
    </>
  );
}
