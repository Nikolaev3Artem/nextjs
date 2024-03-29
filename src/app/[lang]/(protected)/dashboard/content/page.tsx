import { Box, Container, Fade } from '@mui/material';
import styles from './dashboard.module.css';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';
import {
  getDashboardAboutDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';

export default async function Content({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const content = await getDashboardAboutDictionaries(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  return (
    <Container
      maxWidth={'xl'}
      component={'section'}
      className={styles.main}
      sx={{ paddingLeft: { md: '224px' }, paddingTop: '64px' }}
    >
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={content.home} back={content.back}>
            <TabMenuLocale staticData={tabs}>
              <Form lang={params.lang} staticData={content} />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </Container>
  );
}
