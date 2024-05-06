'use client';

import { Container, Fade, SelectChangeEvent, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import debounce from '@mui/utils/debounce';

import axios from 'axios';

import Error from 'next/error';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale/TabMenuLocale';
import { dashboardJourneyStaticData, TabProps } from '@/interface/IStaticData';

import { Locale } from '@/i18n.config';
import { IJourney } from '@/interface/IJourney';

import JourneyTable from '../JourneyTable/JourneyTable';
import dayjs from 'dayjs';

export const JourneyWrapper = ({
  journey,
  staticData,
  lang,
}: {
  journey: IJourney[];
  staticData: dashboardJourneyStaticData;
  lang: Locale;
}) => {
  const [filter, setFilter] = useState('');
  const [filteredJourney, setFilteredJourney] = useState<IJourney[]>([
    {
      id: 0,
      routes: [],
      bus: [],
      departure_date: '',
      departure_time: '',
      arrival_date: '',
      arrival_time: '',
      is_active: false,
      created_at: '',
    },
  ]);

  const handleChange = () => {
    return debounce(
      (
        event:
          | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          | SelectChangeEvent<string>,
      ) => {
        setFilter(event?.target?.value);
      },
      600,
    );
  };

  useEffect(() => {
    if (filter) {
      setFilteredJourney(
        journey.filter(obj => {
          return (
            obj.id.toString().toLowerCase().includes(filter.toLowerCase()) ||
            dayjs(obj.departure_date).format('DD.MM.YYYY').includes(filter) ||
            dayjs(obj.departure_date).format('HH:mm').includes(filter) ||
            obj.routes.some(route =>
              route.cities.some(stop =>
                stop.city.toLowerCase().includes(filter.toLowerCase()),
              ),
            ) ||
            obj.bus[0].name.toLowerCase().includes(filter.toLowerCase())
          );
        }),
      );
    } else {
      setFilteredJourney(journey); // If no filter, set filtered journey to original journey
    }
  }, [filter, journey]);

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
          onChange={handleChange()}
        />
        <Button
          color={'secondary'}
          variant={'contained'}
          href={`/${lang}/dashboard/flights/add`}
          startIcon={<AiOutlinePlus />}
        >
          {staticData.searchForm.new_button_form.text}
        </Button>
      </Stack>

      <JourneyTable
        journey={filteredJourney}
        staticData={staticData}
        lang={lang}
      />
    </>
  );
};
