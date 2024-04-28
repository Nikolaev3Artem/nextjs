import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n.config';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Loading from './loading';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@/theme';
import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { getMetaDictionaries } from '@/lib/dictionary';
import { CurrencyContextProvider } from '../context';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const { meta } = await getMetaDictionaries(lang);
  const { metadata, twitter, openGraph } = meta;

  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(metadata.base),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + '/uk',
      languages: {
        'en-US': '/en',
        'pt-PT': '/pt',
        'lt-LT': '/lt',
      },
    },
    keywords: metadata.keywords,
    twitter,
    openGraph,
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: 'http://localhost:3000/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: 'http://localhost:3000/favicon/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: 'http://localhost:3000/favicon/apple-touch-icon.png',
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const lang = params.lang;

  return (
    <html lang={lang} className={inter.className}>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CurrencyContextProvider>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </CurrencyContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
