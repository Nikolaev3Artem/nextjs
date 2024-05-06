import styles from './flights.module.css';
import { Fade, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import axios from 'axios';

import React from 'react';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardCityDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import { getSession } from '@/lib/auth';

import { CityWrapper } from '@/components/protected/dashboard/City/CityWrapper';

export interface IRentProps {
  errorCode: any;
  res?: IBanner[];
  rents: IRent[];
}

const getCity = async (lang: Locale) => {
  try {
    const session = await getSession();
    if (!session) return null;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/city?limit=299`,
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
  const cities = await getCity(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  const staticData = await getDashboardCityDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.cities} back={staticData.back}>
            {cities ? (
              <CityWrapper
                cities={cities}
                tabs={tabs}
                staticData={staticData}
                lang={params.lang}
              />
            ) : (
              <Typography> no data</Typography>
            )}
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
