'use client';

import { Container, Fade, SelectChangeEvent, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import debounce from '@mui/utils/debounce';

import Error from 'next/error';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { IRent } from '@/interface/IRent';
import { SnackbarProvider } from 'notistack';
import { dashboardBusStaticData, TabProps } from '@/interface/IStaticData';
import { useRouter } from 'next/navigation';
import BusTable from '@/components/protected/dashboard/Bus/Table/BusTable';
import { Locale } from '@/i18n.config';
import Link from 'next/link';

export const BusWrapper = ({
  buses,

  staticData,
  lang,
}: {
  buses: IRent[];

  staticData: dashboardBusStaticData;
  lang: Locale;
}) => {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [filteredBus, setFilteredBus] = useState<IRent[]>([
    {
      id: undefined,
      name: '',

      plates_number: '',
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
    filter
      ? setFilteredBus(
          buses.filter(obj =>
            Object.values(obj).some(
              val =>
                typeof val === 'string' &&
                val.toLowerCase().includes(filter.toLowerCase()),
            ),
          ),
        )
      : setFilteredBus(buses);
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
          LinkComponent={Link}
          href={`/${lang}/dashboard/bus/add`}
          startIcon={<AiOutlinePlus />}
        >
          {staticData.searchForm.new_button_form.text}
        </Button>
      </Stack>

      <BusTable buses={filteredBus} staticData={staticData} lang={lang} />
    </>
  );
};
