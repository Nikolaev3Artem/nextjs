import { NavBarAdmin } from '@/components/NavBarAdmin';
import { Locale } from '@/i18n.config';
import { getUser } from '@/lib/auth';
import {
  getDashboardDictionaries,
  getFooterDictionaries,
  getHeaderDictionaries,
} from '@/lib/dictionary';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const header = await getHeaderDictionaries(lang);
  const dashboard = await getDashboardDictionaries(lang);
  const user = await getUser();
  const staticData = { dashboard, header };
  return (
    <>
      <NavBarAdmin lang={lang} user={user} staticData={staticData} />
      {children}
    </>
  );
}
