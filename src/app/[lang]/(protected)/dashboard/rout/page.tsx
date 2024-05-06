import styles from './bus.module.css';
import { Fade, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import axios from 'axios';

import React from 'react';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardRoutDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import { getSession } from '@/lib/auth';
import { RoutWrapper } from '@/components/protected/dashboard/Rout/RoutWrapper';

export interface IRentProps {
  errorCode: any;
  res?: IBanner[];
  rents: IRent[];
}

const getRouts = async (lang: Locale) => {
  try {
    const session = await getSession();
    if (!session) return null;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/routes?limit=199`,
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
  const routs = await getRouts(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  const staticData = await getDashboardRoutDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.routs} back={staticData.back}>
            {routs ? (
              <RoutWrapper
                routs={routs}
                tabs={tabs}
                staticData={staticData}
                lang={params.lang}
              />
            ) : (
              <Typography>No data</Typography>
            )}
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
