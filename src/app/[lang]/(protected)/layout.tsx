import { NavBarAdmin } from '@/components/layout/NavBarAdmin';
import { Locale } from '@/i18n.config';
import { PhoneType } from '@/interface/IEditorText';
import { getAdminStatus, getCustomerStatus, getUserInfo } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  getDashboardDictionaries,
  getHeaderDictionaries,
} from '@/lib/dictionary';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

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
  const user = await getUserInfo();

  if (!user) {
    redirect('/auth');
  }
  const is_superuser = await getAdminStatus();
  const is_staff = await getCustomerStatus();

  const contacts = await getContact(lang);
  const staticData = { dashboard, header };
  return (
    <>
      <NavBarAdmin
        lang={lang}
        userEmail={user?.email}
        staticData={staticData}
        contacts={contacts}
        is_superuser={is_superuser}
        is_staff={is_staff}
      />
      <main>{children}</main>
    </>
  );
}
