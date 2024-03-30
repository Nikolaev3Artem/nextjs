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
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import {
  getDashboardRentsDictionaries,
  getDashboardTubsDictionaries,
} from '@/lib/dictionary';
import { RentWrapper } from '@/components/protected/dashboard/Rent/RentWrapper';

export interface IRentProps {
  errorCode: any;
  res?: IBanner[];
  rents: IRent[];
}

const getRents = async (lang: Locale) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/rent/`,
    );
    console.log('da', response.data);
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

export default async function Index({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const rents = await getRents(params.lang);
  const tabs = await getDashboardTubsDictionaries(params.lang);
  const staticData = await getDashboardRentsDictionaries(params.lang);

  return (
    <Container
      maxWidth={'xl'}
      component={'section'}
      sx={{ paddingLeft: { md: '224px' }, paddingTop: '64px' }}
    >
      <Fade in={true} timeout={600}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <ContentDashboard title={staticData.rent} back={staticData.back}>
            <RentWrapper rents={rents} tabs={tabs} staticData={staticData} />
          </ContentDashboard>
        </Box>
      </Fade>
    </Container>
  );
}
