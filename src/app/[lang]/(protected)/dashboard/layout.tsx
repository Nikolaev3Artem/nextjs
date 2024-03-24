import { Locale } from '@/i18n.config';

import { getUser, logout } from '@/lib/auth';

import { permanentRedirect } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const user = await getUser();
  console.log(user);
  if (
    !user ||
    (!(user.is_superuser || user.is_staff) &&
      !(user.is_superuser && !user.is_staff) &&
      !(!user.is_superuser && user.is_staff))
  ) {
    permanentRedirect(`/${lang}/auth`);
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
