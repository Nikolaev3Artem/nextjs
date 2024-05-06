'use client';

import { Locale } from '@/i18n.config';
import { IBus, IJourney, ITickets } from '@/interface/IJourney';
import { dashboardJourneyStaticData } from '@/interface/IStaticData';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  debounce,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PassengerTable from '../PassengerTable/PassengerTable';
import { ISeat } from '@/interface/IRent';
import { JourneyBusInfo } from '../JourneyBusInfo/JourneyBusInfo';
import theme from '@/theme';

type BusKeys = keyof IBus;

export const JourneyInfo = ({
  staticData,
  lang,
  journey,
  tickets,
}: {
  staticData: dashboardJourneyStaticData;
  lang: Locale;
  journey: IJourney;
  tickets: ITickets[];
}) => {
  const [filter, setFilter] = useState('');
  const [float, setFloat] = useState(1);
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
    if (filter) {
      setFilteredTickets(
        tickets.filter(obj => {
          return (
            obj.id.toString().toLowerCase().includes(filter.toLowerCase()) ||
            obj.name.toString().toLowerCase().includes(filter.toLowerCase()) ||
            obj.surname
              .toString()
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            obj.reserved_seat
              .toString()
              .toLowerCase()
              .includes(filter.toLowerCase())
          );
        }),
      );
    } else {
      setFilteredTickets(tickets);
    }
  }, [filter, journey, tickets, float]);

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

  return (
    <Box height={'100%'} width={'100%'}>
      <Grid container direction={'row'} spacing={2}>
        <Grid item minWidth={'280px'} height={'100%'}>
          <Paper>
            <Box p={2} display={'flex'} width={'100%'} flexDirection={'column'}>
              <Container disableGutters>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <JourneyBusInfo
                    journey={journey}
                    staticData={staticData}
                    setFloat={setFloat}
                    float={float}
                  />
                </Stack>
              </Container>
            </Box>
          </Paper>
        </Grid>
        <Grid item height={'100%'} width={'calc(100% - 298px)'}>
          <Paper sx={{ marginBottom: '16px' }}>
            <Box p={2} display={'flex'} width={'100%'} flexDirection={'column'}>
              <Container disableGutters>
                <Stack spacing={3} direction={'row'} alignItems={'center'}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '140%',
                    }}
                  >
                    {staticData.journeyTable.passenger_list}
                  </Typography>

                  <TextField
                    sx={{
                      backgroundColor: '#fff',
                      minWidth: '200px',
                      borderRadius: '4px',
                      marginLeft: 'auto !important',
                      display: 'block',
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
                </Stack>
              </Container>
            </Box>
          </Paper>

          <Paper>
            <Box p={2} display={'flex'} width={'100%'} flexDirection={'column'}>
              <Container disableGutters>
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                  <PassengerTable
                    tickets={filteredTickets}
                    staticData={staticData}
                    lang={lang}
                  />
                </Stack>
              </Container>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
