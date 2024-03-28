import { Box, Fade } from '@mui/material';
import styles from './dashboard.module.css';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';

export default async function Dashboard({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  console.log(params.lang);
  return (
    <main className={styles.main}>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={'home'}>
            <TabMenuLocale>
              <Form lang={params.lang} />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </main>
  );
}
