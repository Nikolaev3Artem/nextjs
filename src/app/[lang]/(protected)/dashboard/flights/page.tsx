import styles from './flights.module.css';
import { Fade } from '@mui/material';
import Box from '@mui/material/Box';

import axios from 'axios';

import React from 'react';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardJourneyDictionaries,
  getDashboardRoutDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import { getSession } from '@/lib/auth';
import { RoutWrapper } from '@/components/protected/dashboard/Rout/RoutWrapper';
import { IJourney } from '@/interface/IJourney';
import { JourneyWrapper } from '@/components/protected/dashboard/Journey/JourneyWrapper';

export interface IJourneyProps {
  errorCode: any;
  res?: IBanner[];
  journey: IJourney[];
}

const getJourney = async (lang: Locale) => {
  try {
    const session = await getSession();
    if (!session) return null;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/journey/?limit=199`,
      {
        headers: {
          Authorization: 'Bearer ' + session.access,
          'Content-Type':
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
      },
    );

    if (response.status === 200) {
      return response.data.results;
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

export default async function Rout({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const journey = await getJourney(params.lang);

  const staticData = await getDashboardJourneyDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.journeys} back={staticData.back}>
            <JourneyWrapper
              journey={journey}
              staticData={staticData}
              lang={params.lang}
            />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
