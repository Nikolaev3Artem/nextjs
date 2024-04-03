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

import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { IRent } from '@/interface/IRent';
import { SnackbarProvider } from 'notistack';
import { dashboardBusStaticData, TabProps } from '@/interface/IStaticData';
import { useRouter } from 'next/navigation';
import BusTable from '@/components/protected/dashboard/Bus/Table/BusTable';
import { Locale } from '@/i18n.config';

export const BusWrapper = ({
  buses,
  tabs,
  staticData,
  lang,
}: {
  buses: IRent[];
  tabs: { tab: TabProps[] };
  staticData: dashboardBusStaticData;
  lang: Locale;
}) => {
  const router = useRouter();

  function AddCard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    router.push(`/${lang}/dashboard/bus/add`);
  }

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
            AddCard(event)
          }
          startIcon={<AiOutlinePlus />}
        >
          {staticData.searchForm.new_button_form.text}
        </Button>
      </Stack>
      <TabMenuLocale staticData={tabs}>
        <BusTable buses={buses} staticData={staticData} lang={lang} />
      </TabMenuLocale>
    </>
  );
};
