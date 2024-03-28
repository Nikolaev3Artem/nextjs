import { Locale } from '@/i18n.config';
import axios from 'axios';

import { Footer } from '@/components/layout/Footer';
import {
  getFooterDictionaries,
  getHeaderDictionaries,
  getInfobuyDictionaries,
  getPopularDictionaries,
} from '@/lib/dictionary';
import { NavBar } from '@/components/layout/NavBar';
import { InfoBuy } from '@/components/layout/InfoBuy';
import { Popular } from '@/components/layout/Popular';
import { PhoneType } from '@/interface/IEditorText';
import { RoutsContextProvider } from '@/app/context';
import { getUser } from '@/lib/auth';

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

const getContact = async (lang: Locale): Promise<PhoneType[]> => {
  try {
    const response = await axios.get<PhoneType[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/social_media/`,
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

  const contacts = await getContact(lang);
  const user = await getUser();
  console.log(user);

  return (
    <RoutsContextProvider>
      <NavBar
        staticData={header}
        lang={lang}
        contacts={contacts}
        user_email={user?.email}
        is_staff={user?.is_staff}
        is_superuser={user?.is_superuser}
      />
      <main>
        {children}
        <InfoBuy staticData={infobuy} lang={lang} />
        {popularRouts && (
          <Popular staticData={popular} popularRouts={popularRouts} />
        )}
      </main>

      <Footer staticData={footer} lang={lang} contacts={contacts} />
    </RoutsContextProvider>
  );
}
