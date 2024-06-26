import { AuthWrapper } from '@/components/auth/AuthWrapper';

import Signup from '@/components/auth/Signup/Signup';
import { Locale } from '@/i18n.config';
import {
  getLoginDictionaries,
  getRegistrationDictionaries,
} from '@/lib/dictionary';

import React from 'react';

export default async function Registration({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const reg = await getRegistrationDictionaries(lang);
  const auth = await getLoginDictionaries(lang);
  return (
    <AuthWrapper title={auth.registration} pages={auth.pages} lang={lang}>
      <Signup staticData={reg} lang={lang} />
    </AuthWrapper>
  );
}
