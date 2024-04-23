import styles from './tickets.module.css';
import { Container, Fade, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Error from 'next/error';

import React from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import RentTable from '@/components/protected/dashboard/Rent/Table/RentTable';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardBusDictionaries,
  getDashboardRentsDictionaries,
  getDashboardTicketsDictionaries,
  getDashboardTubsDictionaries,
  getMainDictionaries,
} from '@/lib/dictionary';
import { RentWrapper } from '@/components/protected/dashboard/Rent/RentWrapper/RentWrapper';
import { BusWrapper } from '@/components/protected/dashboard/Bus/BusWrapper';
import { DashboardContainer } from '@/components/layout/DashboardContainer/DashboardContainer';
import { TicketsWrapper } from '@/components/protected/dashboard/Tickets/TicketsWrapper/TicketsWrapper';

export interface IRentProps {
  errorCode: any;
  res?: IBanner[];
  rents: IRent[];
}

const getTickets = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/tickets`,
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

export default async function Tickets({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const tickets = await getTickets(params.lang);
  const staticData = await getDashboardTicketsDictionaries(params.lang);
  const journeyStaticData = await getMainDictionaries(params.lang);

  return (
    <DashboardContainer>
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.tickets} back={staticData.back}>
            <TicketsWrapper
              tickets={tickets}
              staticData={staticData}
              lang={params.lang}
              journeyStaticData={journeyStaticData}
            />
          </ContentDashboard>
        </Box>
      </Fade>
    </DashboardContainer>
  );
}
