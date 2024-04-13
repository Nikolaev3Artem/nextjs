'use client';

import {
  Autocomplete,
  Container,
  Fade,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Error from 'next/error';

import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import { TabMenuLocale } from '@/components/protected/dashboard/TabMenuLocale';
import { IRent } from '@/interface/IRent';
import { SnackbarProvider } from 'notistack';
import {
  dashboardBusStaticData,
  dashboardTicketsStaticData,
  MainStaticDataProps,
  TabProps,
} from '@/interface/IStaticData';
import { useRouter } from 'next/navigation';
import BusTable from '@/components/protected/dashboard/Bus/Table/BusTable';
import { Locale } from '@/i18n.config';
import { ITickets } from '@/interface/IJourney';
import CalendarIcon from '../../../../../../public/icons/calendar-month.svg';
import { DataPicker } from '@/components/common/DataPicker';
import TicketsTable from '../Table/TicketsTable';

interface State {
  search: string;
  status: string;
  date: string;
}

export const TicketsWrapper = ({
  tickets,

  staticData,
  journeyStaticData,
  lang,
}: {
  tickets: ITickets[];

  staticData: dashboardTicketsStaticData;
  journeyStaticData: MainStaticDataProps;
  lang: Locale;
}) => {
  const router = useRouter();

  function AddCard(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    router.push(`/${lang}/dashboard/bus/add`);
  }

  const [values, setValues] = useState<State>({
    search: '',
    status: '',
    date: '',
  });

  return (
    <>
      <Grid container mb={3} spacing={3} display={'flex'}>
        <Grid item xs={3}>
          <TextField
            sx={{
              width: '100%',
              borderRadius: '4px',
              minWidth: 'initial',
              '& .MuiInputBase-formControl ': {
                backgroundColor: '#fff',
              },
            }}
            size={'small'}
            id="outlined-basic"
            label={staticData.searchForm.label}
            onChange={event => {
              const newInputValue = event.target.value;
              console.log(newInputValue);
              setValues({ ...values, ['search']: newInputValue });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AiOutlineSearch />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <DataPicker
            staticData={staticData.searchForm.date}
            lang={lang}
            setValues={setValues}
            values={values}
            isWhite
            small
            minOff
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            value={values.status}
            disablePortal
            fullWidth={true}
            size="small"
            sx={{ backgroundColor: 'white' }}
            options={staticData.searchForm.options}
            renderInput={params => (
              <TextField {...params} label={staticData.searchForm.status} />
            )}
            onInputChange={(event, newInputValue, reason) => {
              setValues({ ...values, ['status']: newInputValue });
            }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color={'secondary'}
            variant={'contained'}
            sx={{
              textTransform: 'none',
              width: '154px',
            }}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              AddCard(event)
            }
            startIcon={<AiOutlinePlus />}
          >
            {staticData.searchForm.new_button_form.text}
          </Button>
        </Grid>
      </Grid>

      <TicketsTable
        tickets={tickets}
        staticData={staticData}
        lang={lang}
        journeyStaticData={journeyStaticData}
      />
    </>
  );
};
