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
import { IServiceBus } from '../add/page';
import {
  getDashboardBusDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import { getSession } from '@/lib/auth';

const getBus = async (id: number, lang: Locale) => {
  const session = await getSession();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/service/bus/${id}`,
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

export interface IRentProps {
  rent: IRent;
  errorCode?: any;
  serviceBus?: readonly IServiceBus[];
}

export default async function BusInfo({
  params,
}: Readonly<{
  params: {
    lang: Locale;
    id: number;
  };
}>) {
  const bus = await getBus(params.id, params.lang);
  const staticData = await getDashboardBusDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard
            // title={`ID ` + `${rent.id}` + `: ` + `${rent.name}`}
            title={
              (bus && `${bus.name}`) ||
              `${staticData.bus.slice(0, -1)} ${params.id}`
            }
            back={staticData.back}
          >
            {bus && (
              <EditBusInfo
                bus={bus}
                staticData={staticData}
                lang={params.lang}
              />
            )}
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
