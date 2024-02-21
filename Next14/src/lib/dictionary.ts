// import 'server-only';
import type { Locale } from '@/i18n.config';

const dictionaries = {
  en: async () => ({
    ...(await import(`@/dictionaries/en/common.json`)).default,
    ...(await import(`@/dictionaries/en/dashboard.json`)).default,
    ...(await import(`@/dictionaries/en/dashboard_about.json`)).default,
    ...(await import(`@/dictionaries/en/footer.json`)).default,
    ...(await import(`@/dictionaries/en/header.json`)).default,
    ...(await import(`@/dictionaries/en/infobuy.json`)).default,
    ...(await import(`@/dictionaries/en/login.json`)).default,
    ...(await import(`@/dictionaries/en/main.json`)).default,
    ...(await import(`@/dictionaries/en/popular.json`)).default,
    ...(await import(`@/dictionaries/en/registration.json`)).default,
    ...(await import(`@/dictionaries/en/content.json`)).default,
    ...(await import(`@/dictionaries/en/contact.json`)).default,
  }),

  uk: async () => ({
    ...(await import(`@/dictionaries/uk/common.json`)).default,
    ...(await import(`@/dictionaries/uk/dashboard.json`)).default,
    ...(await import(`@/dictionaries/uk/dashboard_about.json`)).default,
    ...(await import(`@/dictionaries/uk/footer.json`)).default,
    ...(await import(`@/dictionaries/uk/header.json`)).default,
    ...(await import(`@/dictionaries/uk/infobuy.json`)).default,
    ...(await import(`@/dictionaries/uk/login.json`)).default,
    ...(await import(`@/dictionaries/uk/main.json`)).default,
    ...(await import(`@/dictionaries/uk/popular.json`)).default,
    ...(await import(`@/dictionaries/uk/registration.json`)).default,
    ...(await import(`@/dictionaries/uk/content.json`)).default,
    ...(await import(`@/dictionaries/uk/contact.json`)).default,
  }),
  lt: async () => ({
    ...(await import(`@/dictionaries/lt/common.json`)).default,
    ...(await import(`@/dictionaries/lt/dashboard.json`)).default,
    ...(await import(`@/dictionaries/lt/dashboard_about.json`)).default,
    ...(await import(`@/dictionaries/lt/footer.json`)).default,
    ...(await import(`@/dictionaries/lt/header.json`)).default,
    ...(await import(`@/dictionaries/lt/infobuy.json`)).default,
    ...(await import(`@/dictionaries/lt/login.json`)).default,
    ...(await import(`@/dictionaries/lt/main.json`)).default,
    ...(await import(`@/dictionaries/lt/popular.json`)).default,
    ...(await import(`@/dictionaries/lt/registration.json`)).default,
    ...(await import(`@/dictionaries/lt/content.json`)).default,
    ...(await import(`@/dictionaries/lt/contact.json`)).default,
  }),
  pt: async () => ({
    ...(await import(`@/dictionaries/pt/common.json`)).default,
    ...(await import(`@/dictionaries/pt/dashboard.json`)).default,
    ...(await import(`@/dictionaries/pt/dashboard_about.json`)).default,
    ...(await import(`@/dictionaries/pt/footer.json`)).default,
    ...(await import(`@/dictionaries/pt/header.json`)).default,
    ...(await import(`@/dictionaries/pt/infobuy.json`)).default,
    ...(await import(`@/dictionaries/pt/login.json`)).default,
    ...(await import(`@/dictionaries/pt/main.json`)).default,
    ...(await import(`@/dictionaries/pt/popular.json`)).default,
    ...(await import(`@/dictionaries/pt/registration.json`)).default,
    ...(await import(`@/dictionaries/pt/content.json`)).default,
    ...(await import(`@/dictionaries/pt/contact.json`)).default,
  }),
};

const commonDictionaries = {
  en: async () => (await import(`@/dictionaries/en/common.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/common.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/common.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/common.json`)).default,
};

const dashboardDictionaries = {
  en: async () => (await import(`@/dictionaries/en/dashboard.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/dashboard.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/dashboard.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/dashboard.json`)).default,
};

const dashboardAboutDictionaries = {
  en: async () =>
    (await import(`@/dictionaries/en/dashboard_about.json`)).default,
  uk: async () =>
    (await import(`@/dictionaries/uk/dashboard_about.json`)).default,
  lt: async () =>
    (await import(`@/dictionaries/lt/dashboard_about.json`)).default,
  pt: async () =>
    (await import(`@/dictionaries/pt/dashboard_about.json`)).default,
};

const footerDictionaries = {
  en: async () => (await import(`@/dictionaries/en/footer.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/footer.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/footer.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/footer.json`)).default,
};

const headerDictionaries = {
  en: async () => (await import(`@/dictionaries/en/header.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/header.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/header.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/header.json`)).default,
};

const infobuyDictionaries = {
  en: async () => (await import(`@/dictionaries/en/infobuy.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/infobuy.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/infobuy.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/infobuy.json`)).default,
};

const loginDictionaries = {
  en: async () => (await import(`@/dictionaries/en/login.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/login.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/login.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/login.json`)).default,
};

const mainDictionaries = {
  en: async () => (await import(`@/dictionaries/en/main.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/main.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/main.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/main.json`)).default,
};

const popularDictionaries = {
  en: async () => (await import(`@/dictionaries/en/popular.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/popular.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/popular.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/popular.json`)).default,
};

const registrationDictionaries = {
  en: async () => (await import(`@/dictionaries/en/registration.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/registration.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/registration.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/registration.json`)).default,
};

const contentDictionaries = {
  en: async () => (await import(`@/dictionaries/en/content.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/content.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/content.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/content.json`)).default,
};

const contactDictionaries = {
  en: async () => (await import(`@/dictionaries/en/contact.json`)).default,
  uk: async () => (await import(`@/dictionaries/uk/contact.json`)).default,
  lt: async () => (await import(`@/dictionaries/lt/contact.json`)).default,
  pt: async () => (await import(`@/dictionaries/pt/contact.json`)).default,
};

export const getDictionary = async (lang: Locale) => dictionaries[lang]();

export const getDashboardDictionaries = async (lang: Locale) =>
  dashboardDictionaries[lang]();

export const getDashboardAboutDictionaries = async (lang: Locale) =>
  dashboardAboutDictionaries[lang]();

export const getFooterDictionaries = async (lang: Locale) =>
  footerDictionaries[lang]();

export const getHeaderDictionaries = async (lang: Locale) =>
  headerDictionaries[lang]();

export const getInfobuyDictionaries = async (lang: Locale) =>
  infobuyDictionaries[lang]();

export const getLoginDictionaries = async (lang: Locale) =>
  loginDictionaries[lang]();

export const getMainDictionaries = async (lang: Locale) =>
  mainDictionaries[lang]();

export const getPopularDictionaries = async (lang: Locale) =>
  popularDictionaries[lang]();

export const getRegistrationDictionaries = async (lang: Locale) =>
  registrationDictionaries[lang]();

export const getContentDictionaries = async (lang: Locale) =>
  contentDictionaries[lang]();

export const getContactDictionaries = async (lang: Locale) =>
  contactDictionaries[lang]();

export const getCommonDictionaries = async (lang: Locale) =>
  commonDictionaries[lang]();
