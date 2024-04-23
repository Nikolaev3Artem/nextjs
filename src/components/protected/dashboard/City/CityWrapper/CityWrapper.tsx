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
import { dashboardCityStaticData, TabProps } from '@/interface/IStaticData';

import { Locale } from '@/i18n.config';
import { IRout, StopsProps } from '@/interface/IJourney';
import CityTable from '@/components/protected/dashboard/City/CityTable/CityTable';
import { AddCity } from '../AddCity';
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
  const [isShowAddModal, setIsAddShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredCities, setFilteredCities] = useState<StopsProps[]>([
    {
      city: '',
      id: 0,
      coords_x: '',
      cooords_y: '',
      address: '',
    },
  ]);
  const handleModalClose = () => {
    setIsAddShowModal(false);
  };

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
    filter
      ? setFilteredCities(
          cities.filter(obj =>
            Object.values(obj).some(
              val =>
                typeof val === 'string' &&
                val.toLowerCase().includes(filter.toLowerCase()),
            ),
          ),
        )
      : setFilteredCities(cities);
  }, [filter]);

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
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            setIsAddShowModal(true)
          }
          startIcon={<AiOutlinePlus />}
        >
          {staticData.searchForm.new_button_form.text}
        </Button>
      </Stack>
      <TabMenuLocale staticData={tabs}>
        <CityTable
          cities={filteredCities}
          staticData={staticData}
          lang={lang}
        />
      </TabMenuLocale>
      <AddCity
        onClose={handleModalClose}
        isShowModal={isShowAddModal}
        staticData={staticData}
        lang={lang}
      />
    </>
  );
};
