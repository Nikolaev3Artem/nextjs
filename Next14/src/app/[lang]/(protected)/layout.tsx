import { Locale } from '@/i18n.config';
import { getFooterDictionaries, getHeaderDictionaries } from '@/lib/dictionary';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const header = await getHeaderDictionaries(lang);
  const footer = await getFooterDictionaries(lang);

  return (
    <>
      {/* <NavBar staticData={header} lang={lang} /> */}
      {children}
      {/* <Footer staticData={footer} lang={lang} /> */}
    </>
  );
}
