'use client';

import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Controller, useForm } from 'react-hook-form';

import axios from 'axios';

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
} from '@mui/material';

import Circle from '../../../../../../public/icons/journey_from_circle.svg';
import ToCircle from '../../../../../../public/icons/journey_to_circle.svg';
import Marker from '../../../../../../public/icons/map-marker.svg';
import Trash from '../../../../../../public/icons/trash-can.svg';
import Bus_marker from '../../../../../../public/icons/bus-marker.svg';

import theme from '@/theme';
import { grey } from '@mui/material/colors';
const color_title = grey[800];
const colorHeading = grey[900];

import { getSession } from '@/lib/auth';
import { Locale } from '@/i18n.config';
import { IRent } from '@/interface/IRent';

import { dashboardRoutStaticData } from '@/interface/IStaticData';
import { IRout, StopsProps } from '@/interface/IJourney';
import { getCurrency } from '@/helpers/getCurrency';
import { TimPicker } from '@/components/common/TimPicker';
import dayjs from 'dayjs';

// import BusService from '../../../Rent/BusService/BusService';

interface IInfoCardProps {
  rout: IRout;
  staticData: dashboardRoutStaticData;
  lang: Locale;
}

interface CityProp {
  id: any;
  city: string;
  price?: string | number | undefined;
  coords_x?: string | undefined;
  cooords_y?: string | undefined;
  address: string;
  order?: string;
  arrival_time?: string;
  is_stop?: boolean;
}

const colorIcon = grey[700];

const EditRoutInfo = ({ rout, staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [city, setCity] = useState<CityProp[]>([]);
  const [stops, setStops] = useState<CityProp[]>([]);
  const [selectedStopValues, setSelectedStopValues] = useState<any>({
    time: '',
    // minute: '',
  });
  const [departureValues, setDepartureValues] = useState<any>({
    time: '',
    // minute: '',
  });
  const [arrivalValues, setArrivalValues] = useState<any>({
    time: '',
    // minute: '',
  });

  useEffect(() => {
    if (departureValues.time) {
      setValue(
        'from_place.departureValues',
        dayjs(departureValues.time).format('HH:mm'),
      );
    } else
      setValue(
        'from_place.departureValues',
        '',
        // dayjs(rout.cities[0].city).format('HH:mm'),'
      );
  }, [departureValues]);

  useEffect(() => {
    if (selectedStopValues.time) {
      setSelectedStop(prev => ({
        ...prev,
        arrival_time: dayjs(selectedStopValues.time).format('HH:mm'),
      }));
    }
  }, [selectedStopValues]);

  useEffect(() => {
    if (arrivalValues.time) {
      setValue(
        'to_place.arrivalValues',
        dayjs(arrivalValues.time).format('HH:mm'),
      );
    }
  }, [arrivalValues]);
  // const [durationValues, setDurationValues] = useState<any>({
  //   hour: '',
  //   minute: '',
  // });

  // useEffect(() => {
  //   const hours = `${String(Math.floor(parseInt(rout?.travel_time) / 60)).padStart(2, '0')}`;

  //   const remainingMinutes = `${String(parseInt(rout?.travel_time) % 60).padStart(2, '0')}`;

  //   setDurationValues({
  //     hour: hours,
  //     minute: remainingMinutes,
  //   });
  // }, [rout.travel_time]);

  const [selectedStop, setSelectedStop] = useState<CityProp>({
    id: '',
    city: '',
    address: '',
    coords_x: '',
    cooords_y: '',
  });

  const [deleteId, setDeleteId] = useState<any>([]);

  const nameRegex = /^[^\s№?]+$/;
  const UploadFileSchema = yup.object().shape({
    from_place: yup.object().shape({
      id: yup.number(),
    }),
    to_place: yup.object().shape({
      id: yup.number().required(),
    }),
    price: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),
    travel_time: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<IRout>({
    defaultValues: {
      from_place: rout?.cities[0] || {},
      to_place: rout?.cities[rout?.cities?.length - 1] || {},
      price: rout?.price || 0,
      cities: rout?.cities || [],
      is_stop: false,
      is_popular: rout.isPopular,
      travel_time: rout.travel_time || '',
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  const from_place = watch('from_place');
  const to_place = watch('to_place');
  const price = watch('price');
  const cities = watch('cities');
  const is_stop = watch('is_stop');

  const is_popular = watch('is_popular');
  const router = useRouter();

  const onSubmitForm = async (data: IRout) => {
    if (!rout) return;

    const all_stops = [];
    // const reversedArray = stops.slice().reverse();
    stops.length > 0
      ? all_stops.push(data.from_place, ...stops, data.to_place)
      : all_stops.push(data.from_place, data.to_place);
    console.log(data);
    console.log(all_stops);
    // try {
    //   const session = await getSession();
    //   const formData = new FormData();

    //   if (data.busIdService) {
    //     Object.values(data.busIdService).forEach((item: any) => {
    //       formData.append('busIdService', item.id || null);
    //     });
    //   }
    //   formData.append('name', data.name || '');
    //   formData.append(
    //     'first_floor_seats_count',
    //     // @ts-ignore
    //     data?.first_floor_seats_count || 0,
    //   );
    //   formData.append(
    //     'second_floor_seats_count',
    //     // @ts-ignore
    //     data?.second_floor_seats_count || 0,
    //   );
    //   formData.append('is_active', data.is_active);
    //   formData.append('wc', data.wc);
    //   formData.append('plates_number', data.plates_number);

    //   data.photo?.length
    //     ? formData.append('photo', data.photo[0] || null)
    //     : formData.append('photo', bus.photo);

    //   const response = await axios.patch(
    //     `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/update/`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: 'Bearer ' + session.access,
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     },
    //   );

    //   if (data.uploaded_images) {
    //     const imageFormData = new FormData();
    //     Object.values(data.uploaded_images).forEach(async (file: any) => {
    //       imageFormData.append('photo', file);
    //       const response = await axios.post(
    //         `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/add_photo/`,
    //         imageFormData,
    //         {
    //           headers: {
    //             Authorization: 'Bearer ' + session.access,
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         },
    //       );
    //     });
    //   }

    //   if (deleteId.length > 0) {
    //     deleteId.map(async (id: number) => {
    //       const response = await axios.delete(
    //         `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/delete_photo/${id}`,

    //         {
    //           headers: {
    //             Authorization: 'Bearer ' + session.access,
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         },
    //       );
    //     });
    //   }

    //   if (response.status === 200) {
    //     enqueueSnackbar(`${staticData.busTable.snackBar.update_success}`, {
    //       variant: 'success',
    //     });
    //     rout.push(`/${lang}/dashboard/bus/`);
    //   }
    //   if (response.status === 201) {
    //     enqueueSnackbar(`${staticData.busTable.snackBar.add_success}`, {
    //       variant: 'success',
    //     });
    //     rout.push(`/${lang}/dashboard/bus/`);
    //   }
    // }
    try {
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.routTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
  };

  const getCities = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/city?limit=999`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        setCity(response.data.results);
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
    getCities().catch(console.error);
  }, [getCities]);

  useEffect(() => {
    const newArray = rout?.cities?.slice(1, -1);
    // setStops(newArray);
  }, [rout]);

  const handleAddCity = () => {
    setStops(prevCity => [...prevCity, selectedStop]);
    setSelectedStop({ id: '', city: '', price: 0, address: '' });
  };

  const handleDeleteStop = (id: string) => {
    if (id) {
      setStops(prevState => prevState.filter(el => el.id !== id));
      setDeleteId((prevState: number[]) => [...prevState, id]);
    }
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
                  p={4}
                  display={'flex'}
                  width={'100%'}
                  flexDirection={'column'}
                >
                  <Container disableGutters>
                    <Stack spacing={2}>
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
                          {staticData.routTable.from}
                        </Typography>

                        <Autocomplete
                          {...register('from_place')}
                          disablePortal
                          fullWidth={true}
                          size="small"
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ backgroundColor: 'white' }}
                          options={city}
                          value={from_place}
                          getOptionLabel={(item: CityProp) =>
                            `${item.city}, ${item.address} `
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={staticData.routTable.city}
                              FormHelperTextProps={{
                                color: '#256223',
                              }}
                              // helperText={errors?.from_place?.message}
                              // onError={!!errors?.from_place}
                            />
                          )}
                          onChange={(event, newValue) => {
                            newValue
                              ? setValue('from_place', newValue)
                              : setValue('from_place', {
                                  id: undefined,
                                  city: '',
                                  price: undefined,
                                  address: '',
                                });
                          }}
                        />
                        <Stack
                          direction={'row'}
                          columnGap={2}
                          maxWidth={'350px'}
                        >
                          <TimPicker
                            staticData={staticData.routTable.departure_time}
                            lang={lang}
                            setValues={setDepartureValues}
                            values={departureValues}
                            small
                            minOff
                          />
                          <TextField
                            size={'small'}
                            label={staticData.routTable.order}
                            InputLabelProps={{
                              style: { color: '#808080' },
                            }}
                            value={from_place?.order || ''}
                            onChange={e =>
                              setValue(
                                'from_place.order',
                                e.target.value.toString(),
                              )
                            }
                          />
                        </Stack>
                      </Stack>

                      <Stack spacing={2} direction={'column'}>
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
                          {staticData.routTable.to}
                        </Typography>
                        <Controller
                          name="to_place"
                          // @ts-ignore
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              disablePortal
                              fullWidth
                              size="small"
                              options={city}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              getOptionLabel={item =>
                                `${item.city} ${item.address}`
                              }
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label={staticData.routTable.city}
                                  FormHelperTextProps={{ color: '#256223' }}
                                />
                              )}
                              onChange={(event, newValue) => {
                                setValue('to_place', newValue);
                                setValue('to_place.is_stop', true);
                              }}
                            />
                          )}
                        />
                        <Stack direction={'row'} columnGap={2}>
                          <TextField
                            // {...register('to_place.price')}
                            size={'small'}
                            type="number"
                            label={staticData.routTable.price}
                            InputLabelProps={{
                              style: { color: '#808080' },
                            }}
                            value={to_place?.price || price}
                            onChange={e =>
                              setValue(
                                'to_place.price',
                                e.target.value.toString(),
                              )
                            }
                          />
                          <Box width={'200px'}>
                            <TimPicker
                              staticData={staticData.routTable.arrival_time}
                              lang={lang}
                              setValues={setArrivalValues}
                              values={arrivalValues}
                              small
                              minOff
                            />
                          </Box>

                          <TextField
                            size={'small'}
                            label={staticData.routTable.order}
                            InputLabelProps={{
                              style: { color: '#808080' },
                            }}
                            value={to_place?.order || ''}
                            onChange={e =>
                              setValue(
                                'to_place.order',
                                e.target.value.toString(),
                              )
                            }
                          />
                        </Stack>

                        <Stack
                          justifyContent={'flex-end'}
                          alignItems={'center'}
                          display={'flex'}
                          flexDirection={'row'}
                          columnGap={1}
                        >
                          <Checkbox
                            {...register('is_popular')}
                            color="success"
                            checked={is_popular}
                            sx={{ padding: 0, color: '#808080' }}
                          />
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',

                              fontSize: '16px',
                              lineHeight: '140%',
                              color: '#808080',
                            }}
                          >
                            {staticData.routTable.is_popular}
                          </Typography>
                        </Stack>

                        {rout.cities.slice(1, -1).length > 0 && (
                          <Stack spacing={2} direction={'column'}>
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
                              {staticData.routTable.stops}
                            </Typography>

                            {stops?.map((stop, ind) => {
                              return (
                                <Stack spacing={2}>
                                  <Stack
                                    key={`${stop.coords_x}${ind}`}
                                    spacing={1}
                                    direction={'row'}
                                    p={'6px 14px'}
                                    sx={{
                                      borderRadius: '4px',
                                      justifyContent: 'space-between',
                                      border: '1px solid rgba(0, 0, 0, 0.23)',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                    >
                                      {`${stop.city}, ${stop.address}`}
                                    </Typography>

                                    <IconButton
                                      onClick={() => {
                                        handleDeleteStop(stop?.id);
                                      }}
                                      sx={{
                                        color: colorIcon,
                                        fontSize: 16,
                                        fill: '#424242',
                                        '&:hover': { fill: 'red' },
                                      }}
                                      size={'small'}
                                    >
                                      <Trash
                                        height={20}
                                        width={20}
                                        fill={'inherit'}
                                      />
                                    </IconButton>
                                  </Stack>

                                  <Stack>
                                    <Stack spacing={2} direction={'row'}>
                                      <TextField
                                        size={'small'}
                                        type="number"
                                        value={
                                          selectedStop?.price ||
                                          stop.price ||
                                          ''
                                        }
                                        label={staticData.routTable.price}
                                        InputLabelProps={{
                                          style: { color: '#808080' },
                                        }}
                                        onChange={e => {
                                          const { value } = e.target;
                                          setSelectedStop(
                                            (prevSelectedStop: any) => ({
                                              ...prevSelectedStop,
                                              price: value,
                                            }),
                                          );
                                        }}
                                      />
                                      <Box width={'200px'}>
                                        <TimPicker
                                          staticData={
                                            staticData.routTable.arrival_time
                                          }
                                          lang={lang}
                                          setValues={setSelectedStopValues}
                                          values={selectedStopValues}
                                          small
                                          minOff
                                        />
                                      </Box>

                                      <TextField
                                        size={'small'}
                                        label={staticData.routTable.order}
                                        InputLabelProps={{
                                          style: { color: '#808080' },
                                        }}
                                        // value={selectedStop?.order || ''}
                                        // onChange={e =>
                                        //   setSelectedStop(
                                        //     (prevSelectedStop: CityProp) => ({
                                        //       ...prevSelectedStop,
                                        //       order: e.target.value,
                                        //     }),
                                        //   )
                                        // }
                                      />
                                    </Stack>
                                    <Stack
                                      justifyContent={'flex-end'}
                                      alignItems={'center'}
                                      display={'flex'}
                                      flexDirection={'row'}
                                      columnGap={1}
                                    >
                                      <Checkbox
                                        // {...register('is_stop')}
                                        color="success"
                                        sx={{ padding: 0, color: '#808080' }}
                                        checked={selectedStop?.is_stop}
                                        // onChange={e =>
                                        //   setSelectedStop(
                                        //     (prevSelectedStop: CityProp) => ({
                                        //       ...prevSelectedStop,
                                        //       is_stop: !selectedStop.is_stop,
                                        //     }),
                                        //   )
                                        // }
                                      />
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',

                                          fontSize: '16px',
                                          lineHeight: '140%',
                                          color: '#808080',
                                        }}
                                      >
                                        {staticData.routTable.stop}
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              );
                            })}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Container>
                </Box>
              </Paper>
              <Paper>
                <Box
                  p={4}
                  display={'flex'}
                  width={'100%'}
                  flexDirection={'column'}
                >
                  <Container disableGutters>
                    <Stack spacing={2}>
                      <Stack spacing={2} direction={'column'}>
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
                          {staticData.routTable.add_stop}
                        </Typography>
                        <Autocomplete
                          disablePortal
                          fullWidth={true}
                          size="small"
                          // value={selectedStop}
                          sx={{ backgroundColor: 'white' }}
                          // isOptionEqualToValue={(option, value) =>
                          //   option.address === value.address
                          // }
                          options={city.map(item => ({
                            city: item.city,
                            id: item.id,
                            address: item.address,
                          }))}
                          getOptionLabel={option =>
                            `${option.city} ${option.address}`
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={staticData.routTable.city}
                            />
                          )}
                          onChange={(event, newValue) => {
                            // const selectedCity = city.find(
                            //   item => item.id === newValue?.id,
                            // );
                            // {
                            //   setSelectedStop(selectedCity);
                            // }
                          }}
                        />
                      </Stack>
                      <Stack spacing={2} direction={'row'}>
                        <TextField
                          size={'small'}
                          type="number"
                          value={selectedStop?.price || ''}
                          label={staticData.routTable.price}
                          InputLabelProps={{
                            style: { color: '#808080' },
                          }}
                          onChange={e => {
                            const { value } = e.target;
                            setSelectedStop((prevSelectedStop: any) => ({
                              ...prevSelectedStop,
                              price: value,
                            }));
                          }}
                        />
                        <Box width={'200px'}>
                          <TimPicker
                            staticData={staticData.routTable.arrival_time}
                            lang={lang}
                            setValues={setSelectedStopValues}
                            values={selectedStopValues}
                            small
                            minOff
                          />
                        </Box>

                        <TextField
                          size={'small'}
                          label={staticData.routTable.order}
                          InputLabelProps={{
                            style: { color: '#808080' },
                          }}
                          value={selectedStop?.order || ''}
                          onChange={e =>
                            setSelectedStop((prevSelectedStop: CityProp) => ({
                              ...prevSelectedStop,
                              order: e.target.value,
                            }))
                          }
                        />
                      </Stack>
                      <Stack
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        display={'flex'}
                        flexDirection={'row'}
                        columnGap={1}
                      >
                        <Checkbox
                          // {...register('is_stop')}
                          color="success"
                          sx={{ padding: 0, color: '#808080' }}
                          checked={selectedStop?.is_stop}
                          onChange={e =>
                            setSelectedStop((prevSelectedStop: CityProp) => ({
                              ...prevSelectedStop,
                              is_stop: !selectedStop.is_stop,
                            }))
                          }
                        />
                        <Typography
                          sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',

                            fontSize: '16px',
                            lineHeight: '140%',
                            color: '#808080',
                          }}
                        >
                          {staticData.routTable.stop}
                        </Typography>
                        <Box display={'flex'}>
                          <Button
                            color={'secondary'}
                            size={'large'}
                            variant={'contained'}
                            sx={{ textTransform: 'none' }}
                            fullWidth
                            disabled={!selectedStop?.arrival_time}
                            onClick={() => {
                              const stopExists = stops.find(
                                stop => stop.id === selectedStop.id,
                              );

                              if (!stopExists) {
                                setStops(prevStops => [
                                  ...prevStops,
                                  selectedStop,
                                ]);
                                setSelectedStopValues('');
                                setSelectedStop({
                                  id: undefined,
                                  city: '',
                                  address: '',
                                  coords_x: '',
                                  cooords_y: '',
                                  is_stop: false,
                                  price: '',
                                  arrival_time: '',
                                  order: '',
                                });
                              } else {
                                enqueueSnackbar(
                                  `${staticData.routTable.snackBar.add_stops_error}`,
                                  {
                                    variant: 'error',
                                  },
                                );
                              }
                            }}
                          >
                            {staticData.routTable.add_stop}
                          </Button>
                        </Box>
                      </Stack>
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
                              {staticData.routTable.rout}
                            </Typography>
                            <Stack
                              spacing={1}
                              direction={'column'}
                              p={2}
                              sx={{
                                borderRadius: '4px',

                                border: '1px solid rgba(0, 0, 0, 0.23)',
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
                                {from_place.city && (
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'column'}
                                    width={'100%'}
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
                                      {from_place.city}
                                    </Typography>
                                    <Box
                                      display={'flex'}
                                      alignItems={'center'}
                                      justifyContent={'space-between'}
                                      width={'100%'}
                                    >
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          fontSize: '12px',
                                          lineHeight: '150%',
                                          color: color_title,
                                        }}
                                        color={colorHeading}
                                      >
                                        {from_place.address}
                                      </Typography>
                                      <Box height={16} width={16}>
                                        <Marker height={16} width={16} />
                                      </Box>
                                    </Box>
                                  </Stack>
                                )}
                              </Stack>
                            </Stack>

                            {stops.length > 0 ? (
                              stops.map((stop, ind) => (
                                <Stack
                                  key={`${stop.id} ${ind}`}
                                  spacing={1}
                                  direction={'column'}
                                  p={2}
                                  sx={{
                                    borderRadius: '4px',

                                    border: '1px solid rgba(0, 0, 0, 0.23)',
                                  }}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Box height={16} width={16}>
                                      {stop.is_stop ? (
                                        <Bus_marker height={16} width={16} />
                                      ) : (
                                        <ToCircle height={16} width={16} />
                                      )}
                                    </Box>

                                    <Stack
                                      spacing={1}
                                      alignItems={'start'}
                                      direction={'column'}
                                      width={'100%'}
                                    >
                                      <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'flex-start'}
                                        width={'100%'}
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
                                          {stop.city}
                                        </Typography>
                                        <IconButton
                                          onClick={() => {
                                            if (stop.id)
                                              handleDeleteStop(stop.id);
                                          }}
                                          size={'small'}
                                          sx={{
                                            padding: 0,
                                            fill: '#424242',
                                            '&:hover': { fill: 'red' },
                                          }}
                                        >
                                          <Trash
                                            height={20}
                                            width={20}
                                            fill={'inherit'}
                                          />
                                        </IconButton>
                                      </Box>
                                      <Typography
                                        sx={{
                                          fontFamily: 'Inter',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          fontSize: '12px',
                                          lineHeight: '140%',
                                          color: color_title,
                                        }}
                                        color={colorHeading}
                                      >
                                        {stop.price
                                          ? `${stop.price}  ${getCurrency(3)}`
                                          : ''}
                                      </Typography>
                                      <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        width={'100%'}
                                      >
                                        <Typography
                                          sx={{
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '150%',
                                            color: color_title,
                                          }}
                                          color={colorHeading}
                                        >
                                          {stop.address}
                                        </Typography>
                                        <Box height={20} width={20}>
                                          <Marker height={16} width={16} />
                                        </Box>
                                      </Box>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              ))
                            ) : (
                              <Typography>
                                {staticData.routTable.no_stop}
                              </Typography>
                            )}

                            <Stack
                              spacing={1}
                              direction={'column'}
                              p={2}
                              sx={{
                                borderRadius: '4px',
                                backgroundColor: '#E3EDF9',
                                border: '1px solid rgba(0, 0, 0, 0.23)',
                              }}
                            >
                              <Stack
                                spacing={1}
                                alignItems={'start'}
                                direction={'row'}
                              >
                                <Box height={16} width={16}>
                                  <ToCircle height={16} width={16} />
                                </Box>
                                {to_place?.city && (
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
                                      {to_place.city}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {`${staticData.routTable.price}: ${price} ${getCurrency(3)}`}
                                    </Typography>
                                  </Stack>
                                )}
                              </Stack>
                              {to_place && (
                                <Stack
                                  direction={'row'}
                                  display={'flex'}
                                  alignItems={'flex-start'}
                                >
                                  <Box height={20} width={20}>
                                    <Marker height={16} width={16} />
                                  </Box>
                                  <Typography
                                    sx={{
                                      fontFamily: 'Inter',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      fontSize: '12px',
                                      lineHeight: '150%',
                                      color: color_title,
                                    }}
                                    color={colorHeading}
                                  >
                                    {to_place?.address}
                                  </Typography>
                                </Stack>
                              )}
                            </Stack>
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
                                  fontSize: '12px',
                                  lineHeight: '150%',
                                  color: color_title,
                                }}
                                color={colorHeading}
                              >
                                {staticData.routTable.duration}:
                              </Typography>
                              {/* {(durationValues.hour ||
                                durationValues.minute) && (
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                  color={colorHeading}
                                >
                                  {`${durationValues.hour} ${staticData.routTable.hours} ${durationValues.minute} ${staticData.routTable.minutes}`}
                                </Typography>
                              )} */}
                            </Stack>
                            {is_popular && (
                              <Box
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'start'}
                              >
                                <Checkbox
                                  checked
                                  color="success"
                                  sx={{ padding: 0, color: '#808080' }}
                                />
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                  color={colorHeading}
                                >
                                  {staticData.routTable.is_popular}
                                </Typography>
                              </Box>
                            )}

                            <Box display={'flex'}>
                              <Button
                                sx={{ height: 50 }}
                                color={'success'}
                                size={'large'}
                                variant={'contained'}
                                fullWidth
                                type={'submit'}
                                disabled={!isValid}
                              >
                                {staticData.routTable.save}
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

export default EditRoutInfo;
