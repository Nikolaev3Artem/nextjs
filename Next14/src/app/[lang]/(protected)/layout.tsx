import { NavBarAdmin } from '@/components/NavBarAdmin';
import { Locale } from '@/i18n.config';
import { PhoneType } from '@/interface/IEditorText';
import { getUser } from '@/lib/auth';
import {
  getDashboardDictionaries,
  getHeaderDictionaries,
} from '@/lib/dictionary';
import axios from 'axios';

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

  const contacts = await getContact(lang);
  const staticData = { dashboard, header };
  return (
    <>
      <NavBarAdmin
        lang={lang}
        user={user}
        staticData={staticData}
        contacts={contacts}
      />
      {children}
    </>
  );
}
