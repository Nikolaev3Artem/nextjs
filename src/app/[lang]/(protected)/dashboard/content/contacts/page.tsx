import { Box, Container, Fade } from '@mui/material';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { ContactsForm } from '@/components/protected/dashboard/Contacts/ContactsForm/ContactsForm';
import {
  getDashboardAboutDictionaries,
  getDashboardContactsDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer';

export default async function Contacts({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const content = await getDashboardContactsDictionaries(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={content.home} back={content.back}>
            <TabMenuLocale staticData={tabs}>
              <ContactsForm lang={params.lang} staticData={content} />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
