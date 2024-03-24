export const i18n = {
  defaultLocale: 'uk',
  locales: ['uk', 'pt', 'lt', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
