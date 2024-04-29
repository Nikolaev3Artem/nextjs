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
      canonical: process.env.NEXT_PUBLIC_URL + '/uk',
      languages: {
        'en-US': '/en',
        'pt-PT': '/pt',
        'lt-LT': '/lt',
      },
    },
    keywords: metadata.keywords,
    twitter: {
      title: twitter.title,
      card: 'summary_large_image',
      images: {
        url: `${process.env.NEXT_PUBLIC_URL}${twitter.images.url}`,
        width: twitter.images.width,
        height: twitter.images.height,
        alt: twitter.images.alt,
      },
      description: twitter.description,
    },
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}${openGraph.images.url}`,
          width: openGraph.images.width,
          height: openGraph.images.height,
          alt: openGraph.images.alt,
        },
      ],
      description: openGraph.description,
      type: 'website',
      locale: openGraph.locale,
      title: openGraph.title,
      url: process.env.NEXT_PUBLIC_URL,
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: `${process.env.NEXT_PUBLIC_URL}/favicon/favicon-32x32.png`,
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: `${process.env.NEXT_PUBLIC_URL}/favicon/favicon-16x16.png`,
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: `${process.env.NEXT_PUBLIC_URL}/favicon/apple-touch-icon.png`,
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
