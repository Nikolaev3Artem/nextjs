import { Box, Container, Fade } from '@mui/material';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';
import {
  getAboutDictionaries,
  getDashboardAboutDictionaries,
  getDashboardContactsDictionaries,
  getDashboardRuleDictionaries,
  getDashboardTubsDictionaries,
  getRuleDictionaries,
} from '@/lib/dictionary';

import { DashboardContainer } from '@/components/layout/DashboardContainer';
import { ContentForm } from '@/components/protected/dashboard/ContentForm';
import { ContactForm } from '@/components/protected/dashboard/ContactForm';

export default async function Contacts({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getDashboardContactsDictionaries(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.contacts} back={staticData.back}>
            <TabMenuLocale staticData={tabs}>
              <ContactForm
                staticData={staticData}
                lang={params.lang}
                rout="about"
              />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
