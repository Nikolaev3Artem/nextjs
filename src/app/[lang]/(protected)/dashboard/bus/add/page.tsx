import { Locale } from '@/i18n.config';
import { Container, Fade, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { IRent } from '@/interface/IRent';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import {
  getDashboardBusDictionaries,
  getDashboardRentsDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import AddBusCard from '@/components/protected/dashboard/Bus/AddBusCard/AddBusCard';

const getBus = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/service/bus`,
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
export interface IServiceBus {
  id?: number;
  name?: string;
  title?: string;
}

export interface IServiceBusProps {
  serviceBus?: IServiceBus[];
  errorCode?: any;
}

export default async function Add({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getDashboardBusDictionaries(params.lang);

  const bus = await getBus(params.lang);

  // const handleBack = () => {
  // 	rout.back()
  // }

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.new_bus} back={staticData.back}>
            <AddBusCard
              serviceBus={bus?.serviceBus}
              staticData={staticData}
              lang={params.lang}
            />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
