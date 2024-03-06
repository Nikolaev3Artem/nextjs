import { Locale } from '@/i18n.config';

import { getUser } from '@/lib/auth';

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

  if (!user?.is_superuser) {
    permanentRedirect(`/${lang}/auth`);
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
