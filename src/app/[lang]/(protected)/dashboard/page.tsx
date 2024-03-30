import { Box, Container, Fade } from '@mui/material';
import styles from './dashboard.module.css';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';
import { getDashboardAboutDictionaries } from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer';

export default async function Dashboard({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getDashboardAboutDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          Admin panel here
          {/* <ContentDashboard title={staticData.home} back={staticData.back}>
            <TabMenuLocale staticData={staticData}>
              <Form lang={params.lang} staticData={staticData} />
            </TabMenuLocale>
          </ContentDashboard> */}
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
