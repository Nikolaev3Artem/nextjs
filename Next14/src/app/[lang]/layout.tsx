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

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
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
    <html lang={lang}>
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
