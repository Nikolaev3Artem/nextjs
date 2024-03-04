import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { Locale, i18n } from '@/i18n.config';
import { CustomMiddleware } from './chain';
import { getSession, updateSession } from '@/lib/auth';
import { match as matchLocale } from '@formatjs/intl-localematcher';

const protectedPaths = ['/dashboard', '/profile', '/order'];

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach(route => {
    locales.forEach(
      locale =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ]),
    );
  });

  return protectedPathsWithLocale;
}

function getLocale() {
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  const locale = matchLocale(locales, locales, i18n.defaultLocale);

  return locale;
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const session = await getSession();
    const locale = getLocale();
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    if (!session && protectedPathsWithLocale.includes(pathname)) {
      const signInUrl = new URL(`/${locale}/auth`, request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    updateSession(request);
    return middleware(request, event, response);
  };
}
