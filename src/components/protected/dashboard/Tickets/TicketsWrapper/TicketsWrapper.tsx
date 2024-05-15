'use client';

import {
  Autocomplete,
  Container,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

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
import { relative } from 'path';

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

          const filterMatches =
            obj?.status.toLowerCase() === values.status.toLowerCase();

          const anyFilterMatches = nameMatches || cityMatches || filterMatches;

          const dateFilterMatches = dateMatches || !values.date;

          const statusFilterMatches = filterMatches || !values.status;
          return anyFilterMatches && dateFilterMatches && statusFilterMatches;
        }),
      );
    } else {
      setFilteredTickets(tickets);
    }
  }, [values]);

  return (
    <>
      <Grid container mb={3} spacing={3} display={'flex'}>
        <Grid item xs={3} position={'relative'}>
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
            value={values.search}
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

          {values.search && (
            <IconButton
              size={'small'}
              sx={{ position: 'absolute', top: 27, right: 32 }}
              onClick={() => {
                console.log('click');
                setValues({ ...values, search: '' });
              }}
            >
              <HighlightOffOutlinedIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={3}>
          <Box display={'flex'} position={'relative'}>
            <DataPicker
              staticData={staticData.searchForm.date}
              lang={lang}
              setValues={setValues}
              values={values}
              isWhite
              small
              minOff
              isShowDelIcon
            />
          </Box>
        </Grid>
        <Grid item xs={2.5} display={'flex'} position={'relative'}>
          <FormControl fullWidth sx={{ display: 'flex' }}>
            <InputLabel id="status-select-label" sx={{ top: '-6px' }}>
              {staticData.searchForm.status}
            </InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={values.status}
              label={staticData.searchForm.status}
              size="small"
              sx={{ backgroundColor: 'white' }}
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={event => {
                setValues({
                  ...values,
                  ['status']: event.target.value as string,
                });
              }}
            >
              {staticData.searchForm.options.map((option, ind) => (
                <MenuItem key={`${option.name}-${ind}`} value={option.name}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {values.status && (
            <IconButton
              size={'small'}
              sx={{ position: 'absolute', top: 27, right: 27 }}
              onClick={() => {
                console.log('click');
                setValues({ ...values, status: '' });
              }}
            >
              <HighlightOffOutlinedIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs={3.5} sx={{ display: 'flex' }}>
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
