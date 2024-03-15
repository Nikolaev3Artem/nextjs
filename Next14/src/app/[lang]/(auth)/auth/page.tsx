import React from 'react';

import { Login } from '@/components/auth/Login';

import { Locale } from '@/i18n.config';
import { getLoginDictionaries } from '@/lib/dictionary';

import { AuthWrapper } from '@/components/auth/AuthWrapper';

export default async function Auth({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const auth = await getLoginDictionaries(lang);

  return (
    <AuthWrapper title={auth.sign_in} pages={auth.pages} lang={lang}>
      <Login staticData={auth} lang={lang} />
    </AuthWrapper>
  );
}
