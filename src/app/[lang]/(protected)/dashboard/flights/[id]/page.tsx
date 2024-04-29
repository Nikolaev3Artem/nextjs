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
import {
  getDashboardBusDictionaries,
  getDashboardJourneyDictionaries,
  getDashboardRoutDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import EditRoutInfo from '@/components/protected/dashboard/Rout/EditRoutInfo/EditRoutInfo';
import AddRoutCard from '@/components/protected/dashboard/Rout/AddRoutCard/AddRoutCard';
import { getSession } from '@/lib/auth';
import { JourneyInfo } from '@/components/protected/dashboard/Journey/JourneyInfo/JourneyInfo';
import { ITickets } from '@/interface/IJourney';

export interface IRentProps {
  rent: IRent;
  errorCode?: any;
  // serviceBus?: readonly IServiceBus[];
}

const getJourney = async (id: number, lang: Locale) => {
  const session = await getSession();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/journey/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session.access,
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ');
      return 'An unexpected error occurred';
    }
  }
};

const getTickets = async (id: number, lang: Locale) => {
  const session = await getSession();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/tickets/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session.access,
        },
      },
    );

    if (response.status === 200) {
      return response.data.results.filter(
        (el: ITickets) => el.journey[0].id == id,
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ');
      return 'An unexpected error occurred';
    }
  }
};

export default async function JourniesInfo({
  params,
}: Readonly<{
  params: {
    lang: Locale;
    id: number;
  };
}>) {
  console.log(params);
  const journey = await getJourney(params.id, params.lang);
  const tickets = await getTickets(params.id, params.lang);
  const staticData = await getDashboardJourneyDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard
            // title={`ID ` + `${rent.id}` + `: ` + `${rent.name}`}
            title={`${staticData.journeyTable.journey}: #${journey.id}`}
            back={staticData.back}
          >
            <JourneyInfo
              staticData={staticData}
              lang={params.lang}
              journey={journey}
              tickets={tickets}
            />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
