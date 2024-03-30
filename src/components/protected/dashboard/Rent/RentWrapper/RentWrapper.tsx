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

import RentTable from '@/components/protected/dashboard/Rent/Table/RentTable';
import { ContentDashboard } from '@/components/protected/dashboard/ContentDashboard';
import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { IBanner } from '@/interface/IBanner';
import { IRent } from '@/interface/IRent';

import { Locale } from '@/i18n.config';
import { getDashboardTubsDictionaries } from '@/lib/dictionary';
import { dashboardRentStaticData, TabProps } from '@/interface/IStaticData';
import { useRouter } from 'next/navigation';

export const RentWrapper = ({
  rents,
  tabs,
  staticData,
}: {
  rents: IRent[];
  tabs: { tab: TabProps[] };
  staticData: dashboardRentStaticData;
}) => {
  const router = useRouter();
  function AddCard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    router.push('rent/add/');
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
          {staticData.searchForm.rent_button_form.text}
        </Button>
      </Stack>
      <TabMenuLocale staticData={tabs}>
        <RentTable rents={rents} staticData={staticData} />
      </TabMenuLocale>
    </>
  );
};
