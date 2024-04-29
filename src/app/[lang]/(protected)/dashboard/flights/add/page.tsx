import { Locale } from '@/i18n.config';
import { Container } from '@mui/material';

import { Fade, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';

import Error from 'next/error';

import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import EditBusInfo from '@/components/protected/dashboard/Bus/EditBusInfo/EditBusInfo';

// import EditCardInfo from '../../../component/Dashboard/Rent/EditCardInfo/EditCardInfo';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import { IRent } from '@/interface/IRent';
// import { IServiceBus } from '../add/page';
import { getDashboardJourneyDictionaries } from '@/lib/dictionary';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import EditRoutInfo from '@/components/protected/dashboard/Rout/EditRoutInfo/EditRoutInfo';
import AddRoutCard from '@/components/protected/dashboard/Rout/AddRoutCard/AddRoutCard';
import AddJourneyCard from '@/components/protected/dashboard/Journey/AddJourneyCard/AddJourneyCard';

export interface IRentProps {
  rent: IRent;
  errorCode?: any;
  // serviceBus?: readonly IServiceBus[];
}

export default async function AddJourney({
  params,
}: Readonly<{
  params: {
    lang: Locale;
    id: number;
  };
}>) {
  const staticData = await getDashboardJourneyDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard
            // title={`ID ` + `${rent.id}` + `: ` + `${rent.name}`}
            title={`${staticData.new_journey} `}
            back={staticData.back}
          >
            <AddJourneyCard staticData={staticData} lang={params.lang} />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
