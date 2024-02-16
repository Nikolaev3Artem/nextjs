import { Locale } from '@/i18n.config';

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

  return (
    <>
      <NavBar staticData={header} lang={lang} />
      <main>
        {children}
        <InfoBuy staticData={infobuy} lang={lang} />
        <Popular staticData={popular} lang={lang} />{' '}
      </main>

      <Footer staticData={footer} lang={lang} />
    </>
  );
}
