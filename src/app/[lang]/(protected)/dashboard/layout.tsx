import { LangContextProvider } from '@/app/context';
import { Locale } from '@/i18n.config';
import {
  getAdminStatus,
  getCustomerStatus,
  getUserInfo,
  logout,
} from '@/lib/auth';

import { permanentRedirect } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const is_superuser = await getAdminStatus();
  const is_staff = await getCustomerStatus();
  const user = await getUserInfo();

  if (
    !user ||
    (!(is_superuser || is_staff) &&
      !(is_superuser && !is_staff) &&
      !(!is_superuser && is_staff))
  ) {
    permanentRedirect(`/${lang}/auth`);
  }
  return <LangContextProvider>{children}</LangContextProvider>;
}
