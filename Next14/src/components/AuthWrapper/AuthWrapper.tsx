'use client';

import { Stack, Typography } from '@mui/material';
import { LocaleChange } from '../LocaleChange';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import Button from '@mui/material/Button';
import { loginStaticDataPageProp } from '@/interface/IStaticData';

const colorLogin = grey[700];

interface IContentProps {
  children: React.ReactNode;
  title: string;
  pages: loginStaticDataPageProp[];
  lang: Locale;
}
export const AuthWrapper = (props: IContentProps) => {
  return (
    <Stack direction={'column'} sx={{ margin: 'auto' }}>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      {props.children}
      <Stack
        mt={1}
        display={'flex'}
        alignItems={'center'}
        spacing={1}
        direction={'row'}
      >
        <LocaleChange weight={'500'} color={colorLogin} lang={props.lang} />
        {props.pages.map(el => (
          <Link href={`/${props.lang}${el.path}`} key={el.id}>
            <Button
              sx={{ textTransform: 'none', color: colorLogin }}
              variant={'text'}
            >
              {el.title}
            </Button>
          </Link>
        ))}
      </Stack>

      {/*	/!*{new Date().getFullYear()}*!/*/}
    </Stack>
  );
};
