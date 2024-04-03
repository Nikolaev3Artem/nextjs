import { Box, Container, Fade } from '@mui/material';
import styles from './rule.module.css';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { Locale } from '@/i18n.config';
import { Form } from '@/components/protected/dashboard/Form/Form';
import {
  getDashboardAboutDictionaries,
  getDashboardRuleDictionaries,
  getDashboardTubsDictionaries,
  getRuleDictionaries,
} from '@/lib/dictionary';
import { RuleForm } from '@/components/protected/dashboard/RuleForm';
import { DashboardContainer } from '@/components/layout/DashboardContainer';

export default async function Content({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getDashboardRuleDictionaries(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.rule} back={staticData.back}>
            <TabMenuLocale staticData={tabs}>
              <RuleForm staticData={staticData} lang={params.lang} />
            </TabMenuLocale>
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
