'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import axios from 'axios';
import cn from 'clsx';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { enqueueSnackbar } from 'notistack';

import {
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Stack,
  useMediaQuery,
  Container,
  Grid,
  Button,
  Autocomplete,
  IconButton,
  TextField,
  Typography,
  Tabs,
  Tab,
  FormGroup,
} from '@mui/material';

import Style from '@/components/published/Rent/CardInfo/cardinfo.module.css';
import Circle from '../../../../../../public/icons/journey_from_circle.svg';
import ToCircle from '../../../../../../public/icons/journey_to_circle.svg';

import Bus_marker from '../../../../../../public/icons/bus-marker.svg';

import theme from '@/theme';
import { grey } from '@mui/material/colors';
const color_title = grey[800];
const colorHeading = grey[900];

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import { useLangContext } from '@/app/context';
import { getSession } from '@/lib/auth';
import { Locale } from '@/i18n.config';
import { IRent, ISeat } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/bus/add/page';
import { dashboardJourneyStaticData } from '@/interface/IStaticData';
import { IBus, IJourney, IRout, StopsProps } from '@/interface/IJourney';
import { DataPicker } from '@/components/common/DataPicker';
import dayjs from 'dayjs';
import { TimPicker } from '@/components/common/TimPicker';
import BusConstructor from '../../Bus/BusConstructor/BusConstructor';

import BusSeats from '@/components/common/BusSeats/BusSeats';
import { CalendarIcon, ClockIcon } from '@mui/x-date-pickers';
import { getCurrency } from '@/helpers/getCurrency';
// import BusService from '../../../Rent/BusService/BusService';

interface IInfoCardProps {
  staticData: dashboardJourneyStaticData;
  lang: Locale;
}

interface CityProp {
  id: number | undefined;
  city: string;
  price?: string | number | undefined;
  coords_x?: string | undefined;
  cooords_y?: string | undefined;
  address?: string | undefined;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SelectedSeatsState {
  1: number[];
  2: number[];
  [key: string]: number[];
}
const isoDate = dayjs();

const getDurationValue = (date: any, duration: string) => {
  const minute = dayjs(date.time).minute();
  const hour = dayjs(date.time).hour();

  return dayjs(date.date)
    .startOf('day')
    .add(hour, 'hour')
    .add(minute, 'minute')
    .add(parseInt(duration), 'minute');
};

const AddJourneyCard = ({ staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [routs, setRouts] = useState<IRout[]>([]);
  const [buses, setBuses] = useState<IBus[]>([]);
  const [float, setFloat] = useState(0);
  const [selectedBus, setSelectedBus] = useState<IBus>();
  const [selectedRout, setSelectedRout] = useState<IRout>();
  // const [selectedSeats, setSelectedSeats] = useState<IRout>();
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatsState>({
    1: [],
    2: [],
  });

  const [departureValues, setDepartureValues] = useState<any>({
    time: '',
    date: '',
  });

  const [arrivalValues, setArrivalValues] = useState<any>({
    time: '',
    date: '',
  });

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFloat(newValue);
  };
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const UploadFileSchema = yup.object().shape({
    rout: yup.object().shape({
      id: yup.number(),
    }),
    bus: yup.object().shape({
      id: yup.number(),
    }),
  });

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>({
    defaultValues: {
      rout: {
        id: null,
      },
      bus: {
        id: null,
      },
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });
  const { selectLang } = useLangContext();
  const rout = watch('rout');
  const bus = watch('bus');

  const router = useRouter();

  const onSubmitForm = async (data: any) => {
    try {
      const session = await getSession();
      const formData = new FormData();

      // const result = dayjs(departureValues.date)
      //   .add(dayjs(departureValues.time).hour(), 'hour')
      //   .add(dayjs(departureValues.time).minute(), 'minute');

      // const arrival_date = getDurationValue(departureValues, rout.travel_time);
      formData.append('created_at ', isoDate.toISOString());
      formData.append(
        'departure_date ',
        dayjs(departureValues.date).toISOString() || '',
      );
      formData.append(
        'arrival_date ',
        dayjs(arrivalValues.date).toISOString() || '',
      );
      formData.append('is_active', 'true' || 'false');

      const response = await axios.post(
        `${BASE_URL}/${selectLang}/api/admin/journey/create?bus_id=${data.bus.id}&route_id=${data.rout.id}`,

        formData,

        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        enqueueSnackbar(`${staticData.journeyTable.snackBar.update_success}`, {
          variant: 'success',
        });
        router.push(`/${lang}/dashboard/flights/`);
      }
      if (response.status === 201) {
        enqueueSnackbar(`${staticData.journeyTable.snackBar.add_success}`, {
          variant: 'success',
        });
        router.push(`/${lang}/dashboard/flights/`);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.journeyTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
  };

  const getRout = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/routes?limit=500`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        setRouts(response.data.results);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }, []);

  const getBus = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/service/bus?limit=500`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        setBuses(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }, []);

  const getBusById = useCallback(async (busId: number | undefined) => {
    try {
      const session = await getSession();
      if (!session) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/service/bus/${busId}`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        setSelectedBus(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }, []);

  useEffect(() => {
    getRout().catch(console.error);
  }, [getRout]);
  useEffect(() => {
    getBus().catch(console.error);
  }, [getBus]);

  useEffect(() => {
    setFirstFloorSeats(selectedBus?.first_floor_seats);
  }, [selectedBus?.first_floor_seats]);
  useEffect(() => {
    setSecondFloorSeats(selectedBus?.second_floor_seats);
  }, [selectedBus?.second_floor_seats]);

  const [firstFloorSeats, setFirstFloorSeats] = useState<ISeat[]>();
  const [secondFloorSeats, setSecondFloorSeats] = useState<ISeat[]>();

  const handleCheck = (seatNumber: number, floor: number) => {
    setSelectedSeats(prevSelectedSeats => ({
      ...prevSelectedSeats,
      [floor]: prevSelectedSeats[floor].includes(seatNumber)
        ? prevSelectedSeats[floor].filter(seatId => seatId !== seatNumber)
        : [...prevSelectedSeats[floor], seatNumber],
    }));
    if (floor === 1) {
      setFirstFloorSeats(prevState => {
        const updatedSeats = prevState?.map(seat => {
          if (seat.seat === seatNumber) {
            if (seat.status === 'Selected') {
              return { ...seat, status: 'Empty' };
            }

            return { ...seat, status: 'Selected' };
          }
          return seat;
        });

        return updatedSeats;
      });
    }
    if (floor === 2) {
      setSecondFloorSeats(prevState => {
        const updatedSeats = prevState?.map(seat => {
          if (seat.seat === seatNumber) {
            if (seat.status === 'Selected') {
              return { ...seat, status: 'Empty' };
            }

            return { ...seat, status: 'Selected' };
          }
          return seat;
        });

        return updatedSeats;
      });
    }
  };

  const handleSeatBlock = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push(`/${lang}/auth`);
      }
      const formData = new FormData();
      formData.append('status', 'RESERVED');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${selectLang}/api/ticket/${selectedSeats}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 200) {
        enqueueSnackbar(`${staticData.journeyTable.snackBar.add_success}`, {
          variant: 'success',
        });

        // rout.push(`/${lang}/dashboard/city/`);
        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.journeyTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
    // return console.log('click', selectedSeats);
  };

  return (
    <>
      <Box height={'100%'} width={'100%'}>
        {/* @ts-ignore */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item xs={8} height={'100%'}>
              <Paper sx={{ mb: 2 }}>
                <Box
                  p={'20px'}
                  display={'flex'}
                  width={'100%'}
                  flexDirection={'column'}
                >
                  <Container disableGutters>
                    <Stack spacing={2} flexDirection={'column'}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '16px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                      >
                        {`${staticData.journeyTable.choose_journey}`}
                      </Typography>

                      <Autocomplete
                        {...register('rout')}
                        disablePortal
                        fullWidth={true}
                        size="small"
                        sx={{ backgroundColor: 'white' }}
                        options={routs}
                        getOptionLabel={(item: IRout) =>
                          `${item.cities[0].city} - ${item.cities[item.cities.length - 1].city}`
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={staticData.journeyTable.rout}
                            FormHelperTextProps={{
                              color: '#256223',
                            }}
                            // helperText={errors?.from_place?.message}
                            // onError={!!errors?.from_place}
                          />
                        )}
                        onChange={(event, newValue) => {
                          newValue
                            ? setValue('rout', newValue)
                            : setValue('rout', {
                                id: undefined,
                                city: '',
                                price: undefined,
                              });
                        }}
                      />

                      <Autocomplete
                        {...register('bus')}
                        disablePortal
                        fullWidth={true}
                        size="small"
                        sx={{ backgroundColor: 'white' }}
                        options={buses}
                        getOptionLabel={(item: IBus) => `${item.name}`}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={staticData.journeyTable.bus}
                            FormHelperTextProps={{
                              color: '#256223',
                            }}
                          />
                        )}
                        onChange={(event, newValue) => {
                          newValue
                            ? setValue('bus', newValue)
                            : setValue('bus', {
                                id: undefined,
                                city: '',
                                price: undefined,
                              });
                          newValue
                            ? getBusById(newValue?.id)
                            : setSelectedBus(undefined);
                        }}
                      />
                    </Stack>
                    <Stack spacing={2} flexDirection={'column'} mt={2}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '16px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                      >
                        {`${staticData.journeyTable.departure_time}`}
                      </Typography>
                      <Stack spacing={2} direction={'row'}>
                        <DataPicker
                          staticData={staticData.journeyTable.departure_date}
                          lang={lang}
                          setValues={setDepartureValues}
                          values={departureValues}
                          small
                          minOff
                        />
                        {/* <TimPicker
                          staticData={staticData.journeyTable.departure_time}
                          lang={lang}
                          setValues={setDepartureValues}
                          values={departureValues}
                          minOff
                          small
                        /> */}
                      </Stack>
                    </Stack>
                    <Stack spacing={2} flexDirection={'column'} mt={2}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '16px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                      >
                        {`${staticData.journeyTable.arrival_time}`}
                      </Typography>
                      <Stack spacing={2} direction={'row'}>
                        <DataPicker
                          staticData={staticData.journeyTable.departure_date}
                          lang={lang}
                          setValues={setArrivalValues}
                          values={arrivalValues}
                          small
                          minOff
                        />
                        {/* <TimPicker
                          staticData={staticData.journeyTable.departure_time}
                          lang={lang}
                          setValues={setArrivalValues}
                          values={arrivalValues}
                          minOff
                          small
                        /> */}
                      </Stack>
                      {selectedBus && (
                        <Stack width={'100%'}>
                          <Box>
                            <Tabs
                              value={float}
                              onChange={handleChange}
                              aria-label={staticData.journeyTable.float}
                              sx={{
                                minHeight: 'auto',
                                mb: 2,
                                '& .MuiTabs-indicator': {
                                  display: 'none',
                                },

                                '& .Mui-selected': {
                                  backgroundColor: `${theme.palette.info.main}`,
                                },
                                '& .MuiTab-root': {
                                  px: 1,
                                  py: 0.5,
                                  fontSize: '10px',
                                  minHeight: '22px',
                                  minWidth: '60px',
                                  borderRadius: '4px',
                                  textTransform: 'none',
                                },
                              }}
                            >
                              <Tab
                                label={`${staticData.journeyTable.float} 1`}
                                {...a11yProps(0)}
                              />

                              <Tab
                                label={`${staticData.journeyTable.float} 2`}
                                {...a11yProps(1)}
                              />
                            </Tabs>
                            <CustomTabPanel value={float} index={0}>
                              <FormGroup
                                sx={{ display: 'flex', flexDirection: 'row' }}
                              >
                                <BusSeats
                                  rows_1={selectedBus?.rows_1}
                                  rows_2={selectedBus?.rows_2}
                                  rows_3={selectedBus?.rows_3}
                                  is_wc={selectedBus?.wc ? 'yes' : 'no'}
                                  enter_2={selectedBus?.enter_2}
                                  enter_1={selectedBus?.enter_1}
                                  seats={firstFloorSeats}
                                  seats_start={1}
                                  floor={1}
                                  small
                                  handleCheck={handleCheck}
                                />
                              </FormGroup>
                            </CustomTabPanel>
                            <CustomTabPanel value={float} index={1}>
                              <FormGroup
                                sx={{ display: 'flex', flexDirection: 'row' }}
                              >
                                <BusSeats
                                  rows_1={selectedBus?.rows_4}
                                  rows_2={selectedBus?.rows_5}
                                  enter_1={selectedBus?.enter_3}
                                  seats_start={
                                    selectedBus?.first_floor_seats_count + 1 ||
                                    0
                                  }
                                  floor={2}
                                  small
                                  handleCheck={handleCheck}
                                  seats={secondFloorSeats}
                                />
                              </FormGroup>
                            </CustomTabPanel>
                            <Stack mt={2}>
                              <Button
                                sx={{
                                  display: 'flex',
                                  width: 'fit-content',
                                  textTransform: 'none',
                                  fontSize: '20px',
                                  fontWeight: '400',
                                }}
                                color={'secondary'}
                                size={'small'}
                                variant={'contained'}
                                type={'button'}
                                // disabled={!isValid}
                                onClick={handleSeatBlock}
                              >
                                {staticData.journeyTable.blocked}
                              </Button>
                            </Stack>
                          </Box>
                        </Stack>
                      )}
                    </Stack>
                  </Container>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4} height={'100%'}>
              <Container disableGutters maxWidth={'md'}>
                <Paper>
                  <Box width={'100%'} minHeight={732} p={2}>
                    <Grid
                      height={'100%'}
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      <Grid
                        item
                        sm={12}
                        display={'flex'}
                        flexDirection={'column'}
                      >
                        <Stack
                          spacing={2}
                          display={'flex'}
                          direction={'column'}
                          height={'100%'}
                        >
                          <Stack
                            spacing={2}
                            display={'flex'}
                            height={'100%'}
                            direction={'column'}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {staticData.journeyTable.rout}
                            </Typography>
                            {rout.cities && (
                              <Stack
                                spacing={1}
                                direction={'column'}
                                p={2}
                                sx={{
                                  borderRadius: '4px',
                                  backgroundColor: '#E3EDF9',
                                }}
                              >
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'row'}
                                >
                                  <Box height={16} width={16}>
                                    <Circle height={16} width={16} />
                                  </Box>
                                  {rout && (
                                    <Stack
                                      spacing={1}
                                      alignItems={'start'}
                                      direction={'column'}
                                    >
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',
                                          fontWeight: 700,
                                          fontSize: '16px',
                                          lineHeight: '140%',
                                          color: color_title,
                                        }}
                                        color={colorHeading}
                                      >
                                        {rout.cities[0].city}
                                      </Typography>
                                    </Stack>
                                  )}
                                </Stack>

                                {rout?.cities?.length > 2
                                  ? rout?.cities
                                      ?.slice(1, -1)
                                      .map((stop: StopsProps, ind: number) => (
                                        <Stack
                                          key={`${stop.id} ${ind}`}
                                          spacing={1}
                                          direction={'column'}
                                        >
                                          <Stack
                                            spacing={1}
                                            alignItems={'start'}
                                            direction={'row'}
                                          >
                                            <Box height={16} width={16}>
                                              <Bus_marker
                                                height={16}
                                                width={16}
                                              />
                                            </Box>

                                            <Stack
                                              spacing={1}
                                              alignItems={'start'}
                                              direction={'row'}
                                            >
                                              <Typography
                                                sx={{
                                                  fontFamily: 'Inter',
                                                  fontStyle: 'normal',
                                                  fontWeight: 400,
                                                  fontSize: '16px',
                                                  lineHeight: '140%',
                                                  color: color_title,
                                                }}
                                                color={colorHeading}
                                              >
                                                {stop.city}
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontFamily: 'Inter',
                                                  fontStyle: 'normal',
                                                  fontWeight: 400,
                                                  fontSize: '16px',
                                                  lineHeight: '140%',
                                                  color: color_title,
                                                }}
                                                color={colorHeading}
                                              >
                                                {stop.price
                                                  ? `${stop.price}  ${getCurrency(3)}`
                                                  : ''}
                                              </Typography>
                                            </Stack>
                                          </Stack>
                                        </Stack>
                                      ))
                                  : null}

                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'row'}
                                >
                                  <Box height={16} width={16}>
                                    <ToCircle height={16} width={16} />
                                  </Box>
                                  {rout.cities && (
                                    <Stack
                                      spacing={1}
                                      alignItems={'start'}
                                      direction={'row'}
                                    >
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          fontSize: '16px',
                                          lineHeight: '140%',
                                          color: color_title,
                                        }}
                                        color={colorHeading}
                                      >
                                        {
                                          rout.cities[rout.cities.length - 1]
                                            .city
                                        }
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          fontSize: '16px',
                                          lineHeight: '140%',
                                          color: color_title,
                                        }}
                                        color={colorHeading}
                                      >
                                        {rout.price
                                          ? `${rout.price}  ${getCurrency(3)}`
                                          : ''}
                                      </Typography>
                                    </Stack>
                                  )}
                                </Stack>
                              </Stack>
                            )}
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {staticData.journeyTable.bus}
                            </Typography>
                            {selectedBus && (
                              <Stack
                                spacing={1}
                                direction={'column'}
                                p={2}
                                sx={{
                                  borderRadius: '4px',
                                  backgroundColor: '#E3EDF9',
                                }}
                              >
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {staticData.journeyTable.title}:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {selectedBus.name}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {staticData.journeyTable.services}:
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {staticData.journeyTable.wc}:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {bus.is_wc_working
                                        ? staticData.journeyTable.yes
                                        : staticData.journeyTable.no}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {staticData.journeyTable.plate}:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {bus.plates_number}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {
                                        staticData.journeyTable
                                          .seats_first_floor
                                      }
                                      :
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {bus.first_floor_seats_count}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  spacing={1}
                                  alignItems={'start'}
                                  direction={'column'}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {
                                        staticData.journeyTable
                                          .seats_second_floor
                                      }
                                      :
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {bus.second_floor_seats_count}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Stack>
                            )}

                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {staticData.journeyTable.departure_time}
                            </Typography>
                            {departureValues.date && (
                              <Stack
                                spacing={1}
                                direction={'column'}
                                p={2}
                                sx={{
                                  borderRadius: '4px',
                                  backgroundColor: '#E3EDF9',
                                }}
                              >
                                <Stack direction={'row'} spacing={2}>
                                  <Stack alignItems={'start'} direction={'row'}>
                                    <Box height={16} width={16} mr={1}>
                                      <ClockIcon
                                        height={16}
                                        width={16}
                                        sx={{ color: '#404040' }}
                                      />
                                    </Box>

                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {departureValues.time
                                        ? dayjs(departureValues.time).format(
                                            'HH:mm',
                                          )
                                        : ''}
                                    </Typography>
                                  </Stack>
                                  <Stack alignItems={'start'} direction={'row'}>
                                    <Box height={16} width={16} mr={1}>
                                      <CalendarIcon
                                        height={16}
                                        width={16}
                                        sx={{ color: '#404040' }}
                                      />
                                    </Box>

                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {departureValues.date
                                        ? dayjs(departureValues.date).format(
                                            'DD.MM.YYYY',
                                          )
                                        : ''}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Stack>
                            )}
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '16px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {staticData.journeyTable.arrival_time}
                            </Typography>
                            {arrivalValues.date && (
                              <Stack
                                spacing={1}
                                direction={'column'}
                                p={2}
                                sx={{
                                  borderRadius: '4px',
                                  backgroundColor: '#E3EDF9',
                                }}
                              >
                                <Stack direction={'row'} spacing={2}>
                                  <Stack alignItems={'start'} direction={'row'}>
                                    <Box height={16} width={16} mr={1}>
                                      <ClockIcon
                                        height={16}
                                        width={16}
                                        sx={{ color: '#404040' }}
                                      />
                                    </Box>

                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {departureValues.time
                                        ? dayjs(arrivalValues.time).format(
                                            'HH:mm',
                                          )
                                        : ''}
                                    </Typography>
                                  </Stack>
                                  <Stack alignItems={'start'} direction={'row'}>
                                    <Box height={16} width={16} mr={1}>
                                      <CalendarIcon
                                        height={16}
                                        width={16}
                                        sx={{ color: '#404040' }}
                                      />
                                    </Box>

                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {departureValues.date
                                        ? dayjs(departureValues.date).format(
                                            'DD.MM.YYYY',
                                          )
                                        : ''}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Stack>
                            )}
                            <Box display={'flex'}>
                              <Button
                                sx={{ height: 50 }}
                                color={'success'}
                                size={'large'}
                                variant={'contained'}
                                fullWidth
                                type={'submit'}
                                disabled={
                                  !rout.id ||
                                  !bus.id ||
                                  !departureValues.date ||
                                  !arrivalValues.date
                                }
                              >
                                {staticData.journeyTable.to_journey}
                              </Button>
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddJourneyCard;
