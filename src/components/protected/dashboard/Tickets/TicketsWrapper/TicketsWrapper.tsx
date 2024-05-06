'use client';

import {
  Autocomplete,
  Container,
  Fade,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Error from 'next/error';

import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import { FaTrashAlt } from 'react-icons/fa';

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
    // router.push(`/${lang}/dashboard/bus/add`);
  }

  const [values, setValues] = useState<State>({
    search: '',
    status: '',
    date: '',
  });
  const [filteredTickets, setFilteredTickets] = useState<ITickets[]>([
    {
      id: 0,
      name: '',
      surname: '',
      comment: '',
      reserved_seat: 0,
      reserved_floor_seat: 0,
      additional_baggage: '',
      journey: [],
      passanger_type: '',
      status: '',
      created_at: '',
      departure_date: '',
      arrival_date: '',
    },
  ]);

  useEffect(() => {
    if (values) {
      setFilteredTickets(
        tickets.filter(obj => {
          // Check if obj.name matches the search value
          const nameMatches = obj.name && obj.name.includes(values.search);

          // Check if any city in the route matches the search value
          const cityMatches = obj?.journey[0]?.routes[0]?.cities?.some(
            el => el.city === values.search,
          );

          // Check if the date matches if provided
          const dateMatches =
            values.date &&
            obj.journey[0]?.departure_date &&
            dayjs(obj.journey[0]?.departure_date).isSame(
              dayjs(values.date),
              'day',
            );

          // Include the ticket if any of the conditions are true
          return (nameMatches || cityMatches) && (dateMatches || !values.date);
        }),
      );
    } else {
      setFilteredTickets(tickets);
    }
  }, [values]);

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
          <Box display={'flex'}>
            <DataPicker
              staticData={staticData.searchForm.date}
              lang={lang}
              setValues={setValues}
              values={values}
              isWhite
              small
              minOff
            />
            {values.date && (
              <IconButton
                size={'small'}
                onClick={() => {
                  console.log('click');
                  setValues({ ...values, date: '' });
                }}
              >
                <FaTrashAlt />
              </IconButton>
            )}
          </Box>
        </Grid>
        {/* <Grid item xs={2}>
          <Autocomplete
            value={values.status}
            disablePortal
            fullWidth={true}
            size="small"
            sx={{ backgroundColor: 'white' }}
            options={staticData.searchForm.options}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => (
              <TextField {...params} label={staticData.searchForm.status} />
            )}
            onInputChange={(event, newInputValue, reason) => {
              setValues({ ...values, ['status']: newInputValue });
            }}
          />
        </Grid> */}
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color={'secondary'}
            variant={'contained'}
            sx={{
              textTransform: 'none',
              width: '154px',
              marginLeft: 'auto',
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
        tickets={filteredTickets}
        staticData={staticData}
        lang={lang}
        journeyStaticData={journeyStaticData}
      />
    </>
  );
};
