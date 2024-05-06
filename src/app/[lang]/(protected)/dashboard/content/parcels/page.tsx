import { Box, Container, Fade } from '@mui/material';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';
import {
  getAboutDictionaries,
  getDashboardAboutDictionaries,
  getDashboardParcelstDictionaries,
  getDashboardRuleDictionaries,
  getDashboardTubsDictionaries,
  getRuleDictionaries,
} from '@/lib/dictionary';

import { DashboardContainer } from '@/components/layout/DashboardContainer';
import { ContentForm } from '@/components/protected/dashboard/ContentForm';

export default async function Parcels({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getDashboardRuleDictionaries(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  const about_static = await getDashboardParcelstDictionaries(params.lang);
  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={about_static.parcel} back={staticData.back}>
            <TabMenuLocale staticData={tabs}>
              <ContentForm
                staticData={staticData}
                lang={params.lang}
                rout="parcel"
              />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
