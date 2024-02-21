import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

import Link from 'next/link';
import React from 'react';

import { Login } from '@/components/Login';

import { Locale } from '@/i18n.config';
import { getLoginDictionaries } from '@/lib/dictionary';
import { LocaleChange } from '@/components/LocaleChange';
import Typography from '@mui/material/Typography';
import Style from '../page.module.css';

const colorLogin = grey[700];

export default async function Auth({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const lang = params.lang;
  const auth = await getLoginDictionaries(lang);

  return (
    <Stack direction={'column'} sx={{ margin: 'auto' }}>
      <Typography component="h1" variant="h5">
        {auth.sign_in}
      </Typography>
      <Login staticData={auth} lang={lang} />
      <Stack
        mt={1}
        display={'flex'}
        alignItems={'center'}
        spacing={1}
        direction={'row'}
      >
        <LocaleChange weight={'500'} color={colorLogin} lang={lang} />
        {auth.pages.map(el => (
          <Link href={`/${lang}${el.path}`} key={el.id}>
            <Button
              sx={{ textTransform: 'none', color: colorLogin }}
              variant={'text'}
            >
              {el.title}
            </Button>
          </Link>
        ))}
      </Stack>
      {/*{new Date().getFullYear()}*/}
    </Stack>
  );
}
