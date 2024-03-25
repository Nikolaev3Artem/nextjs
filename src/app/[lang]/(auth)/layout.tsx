import { Locale } from '@/i18n.config';

import Style from './page.module.css';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={Style.login}>{children}</main>;
}
