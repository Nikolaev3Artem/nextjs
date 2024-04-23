import { LangContextProvider } from '@/app/context';
import { Locale } from '@/i18n.config';
import { getAdmin, getCustomer, logout } from '@/lib/auth';

import { permanentRedirect } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const user = await getAdmin();
  const customer = await getCustomer();
  console.log('user', user);
  // if (
  //   !user ||
  //   (!(user.is_superuser || user.is_staff) &&
  //     !(user.is_superuser && !user.is_staff) &&
  //     !(!user.is_superuser && user.is_staff))
  // ) {
  //   permanentRedirect(`/${lang}/auth`);
  // }
  return <LangContextProvider>{children}</LangContextProvider>;
}
