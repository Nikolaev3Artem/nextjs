'use client';

import { Container, Fade, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Error from 'next/error';

import React from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { dashboardCityStaticData, TabProps } from '@/interface/IStaticData';

import { Locale } from '@/i18n.config';
import { IRout, StopsProps } from '@/interface/IJourney';
import CityTable from '@/components/protected/dashboard/City/CityTable/CityTable';
// import RoutTable from '../RoutTable/RoutTable';

export const CityWrapper = ({
  cities,
  tabs,
  staticData,
  lang,
}: {
  cities: StopsProps[];
  tabs: { tab: TabProps[] };
  staticData: dashboardCityStaticData;
  lang: Locale;
}) => {
  return (
    <>
      <Stack
        mb={3}
        sx={{ width: '100%' }}
        direction={'row'}
        justifyContent={'space-between'}
        display={'flex'}
      >
        <TextField
          sx={{
            backgroundColor: '#fff',
            minWidth: '300px',
            borderRadius: '4px',
          }}
          size={'small'}
          id="outlined-basic"
          label={staticData.searchForm.label}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AiOutlineSearch />
              </InputAdornment>
            ),
          }}
        />
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            // AddCard(event)
            // open modal
            console.log('click')
          }
          startIcon={<AiOutlinePlus />}
        >
          {staticData.searchForm.new_button_form.text}
        </Button>
      </Stack>
      <TabMenuLocale staticData={tabs}>
        <CityTable cities={cities} staticData={staticData} lang={lang} />
      </TabMenuLocale>
    </>
  );
};
