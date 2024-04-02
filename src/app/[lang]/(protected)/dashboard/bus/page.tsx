import styles from './bus.module.css';
import { Fade } from '@mui/material';
import Box from '@mui/material/Box';

import axios from 'axios';

import React from 'react';

import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardBusDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { BusWrapper } from '@/components/protected/dashboard/Bus/BusWrapper';
import { DashboardContainer } from '@/components/layout/DashboardContainer';

export interface IRentProps {
  errorCode: any;
  res?: IBanner[];
  rents: IRent[];
}

const getBus = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/service/bus/`,
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

export default async function Bus({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const buses = await getBus(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  const staticData = await getDashboardBusDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.bus} back={staticData.back}>
            <BusWrapper
              buses={buses}
              tabs={tabs}
              staticData={staticData}
              lang={params.lang}
            />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
