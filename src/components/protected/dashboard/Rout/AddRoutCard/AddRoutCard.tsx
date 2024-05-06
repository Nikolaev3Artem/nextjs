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
import { dashboardRoutStaticData } from '@/interface/IStaticData';
import { IRout, StopsProps } from '@/interface/IJourney';
import { TimPicker } from '@/components/common/TimPicker';
import dayjs from 'dayjs';
import { getCurrency } from '@/helpers/getCurrency';
// import BusService from '../../../Rent/BusService/BusService';

interface IInfoCardProps {
  staticData: dashboardRoutStaticData;
  lang: Locale;
}

interface CityProp {
  id: any;
  city: string;
  price?: string | number | undefined;
  coords_x?: string | undefined;
  cooords_y?: string | undefined;
  address?: string | undefined;
}

const AddRoutCard = ({ staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

  const [stops, setStops] = useState<StopsProps[]>([]);
  const [city, setCity] = useState<StopsProps[]>([]);
  const [durationValues, setDurationValues] = useState<any>({
    hour: '',
    minute: '',
  });

  const [selectedStop, setSelectedStop] = useState<StopsProps>({
    id: '',
    city: '',
    address: '',
    coords_x: '',
    cooords_y: '',
  });

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
    getValues,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<IRout>({
    defaultValues: {
      price: 0,
      travel_time: '',
      cities: [],
      is_popular: false,
      is_stop: false,
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const duration =
      parseInt(durationValues.hour) * 60 + parseInt(durationValues.minute);

    setValue('travel_time', duration.toString());
  }, [durationValues, setValue]);

  const from_place = watch('from_place');
  const to_place = watch('to_place');
  const price = watch('price');
  const is_stop = watch('is_stop');
  const is_popular = watch('is_popular');
  const travel_time = watch('travel_time');
  const router = useRouter();

  const handleDeleteStop = (id: string) => {
    const updatedCity = stops.filter(item => item.id !== id);
    setStops(updatedCity);
  };

  const onSubmitForm = async (data: IRout) => {
    try {
      const session = await getSession();
      if (!session) {
        router.push(`/${lang}/auth`);
      }

      const all_stops = [];
      // const reversedArray = stops.slice().reverse();
      stops.length > 0
        ? all_stops.push(data.from_place, ...stops, data.to_place)
        : all_stops.push(data.from_place, data.to_place);
      console.log(travel_time);
      const response = await axios.post(
        `${BASE_URL}/${lang}/api/admin/routes/create`,

        {
          price: data?.price,
          isPopular: data?.is_popular,
          travel_time: travel_time.toString(),
        },

        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        const rout_id = await response?.data?.id;

        async function executeRequestsSequentially(
          requests: (() => Promise<void>)[],
        ) {
          for (const request of requests) {
            await request();
          }
        }

        const requests: (() => Promise<void>)[] = all_stops.map(
          stop => () =>
            axios.put(
              `${BASE_URL}/${lang}/api/admin/routes/${rout_id}/add_stop/${stop.id}`,
              { price: stop.price || 0 },
              {
                headers: {
                  Authorization: 'Bearer ' + session.access,
                  'Content-Type':
                    'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                },
              },
            ),
        );

        await executeRequestsSequentially(requests);
        enqueueSnackbar(`${staticData.routTable.snackBar.update_success}`, {
          variant: 'success',
        });
        router.push(`/${lang}/dashboard/rout/`);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.routTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
  };

  const getCity = useCallback(async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push(`/${lang}/auth`);
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/city?limit=599`,
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
    getCity().catch(console.error);
  }, [getCity]);

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
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '140%',
                        color: color_title,
                      }}
                      mb={4}
                    >
                      {`${staticData.routTable.rout}`}
                    </Typography>
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

                        <Controller
                          name="from_place"
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
                                setValue('from_place', newValue);
                              }}
                            />
                          )}
                        />
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
                              }}
                            />
                          )}
                        />
                        <Stack direction={'row'} columnGap={2}>
                          <TextField
                            {...register('price')}
                            size={'small'}
                            type="number"
                            label={staticData.routTable.price}
                            InputLabelProps={{
                              style: { color: '#808080' },
                            }}
                            value={watch('price') || ''}
                            onChange={e =>
                              setValue('price', e.target.value.toString())
                            }
                          />

                          <Stack direction={'row'} alignItems={'center'}>
                            <TextField
                              type="number"
                              label={staticData.routTable.hours}
                              size="small"
                              onChange={event =>
                                setDurationValues({
                                  ...durationValues,
                                  hour: event.target.value,
                                })
                              }
                              InputProps={{
                                inputProps: { min: 0, max: 99 },
                              }}
                            />
                            <Typography mx={1}>-</Typography>
                            <TextField
                              type="number"
                              label={staticData.routTable.minutes}
                              size="small"
                              onChange={event =>
                                setDurationValues({
                                  ...durationValues,
                                  minute: event.target.value,
                                })
                              }
                              InputProps={{
                                inputProps: { min: 0, max: 60 },
                              }}
                            />
                          </Stack>
                        </Stack>

                        <Stack
                          justifyContent={'flex-end'}
                          alignItems={'center'}
                          display={'flex'}
                          flexDirection={'row'}
                          columnGap={1}
                        >
                          <Checkbox
                            checked={is_popular}
                            color="success"
                            sx={{ padding: 0, color: '#808080' }}
                            onChange={() => {
                              setValue('is_popular', !is_popular);
                            }}
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
                          sx={{ backgroundColor: 'white' }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          options={city.map(item => ({
                            city: item.city,
                            id: item.id,
                            address: item.address,
                            price: item.price,
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
                            const selectedCity = city.find(
                              item => item.id === newValue?.id,
                            );

                            selectedCity
                              ? setSelectedStop(selectedCity)
                              : setSelectedStop({
                                  id: '',
                                  city: '',
                                  address: '',
                                  coords_x: '',
                                  cooords_y: '',
                                });
                          }}
                        />
                      </Stack>
                      <Stack>
                        <TextField
                          size={'small'}
                          type="number"
                          value={selectedStop.price || ''}
                          label={staticData.routTable.price}
                          InputLabelProps={{
                            style: { color: '#808080' },
                          }}
                          onChange={e => {
                            const { value } = e.target;
                            setSelectedStop(prevSelectedStop => ({
                              ...prevSelectedStop,
                              price: value,
                            }));
                          }}
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
                          checked={is_stop}
                          onChange={() => {
                            setValue('is_stop', !is_stop);
                          }}
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
                            disabled={!is_stop || !selectedStop.price}
                            onClick={() => {
                              const stopExists = stops.find(
                                stop => stop.id === selectedStop.id,
                              );
                              setSelectedStop(prevSelectedStop => ({
                                ...prevSelectedStop,
                                price: '',
                              }));
                              if (!stopExists) {
                                setStops(prevStops => [
                                  ...prevStops,
                                  selectedStop,
                                ]);
                                setValue('is_stop', false);
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
                                {from_place?.city && (
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
                                      <Box height={20} width={20}>
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

                                    border: '1px solid rgba(181, 77, 77, 0.23)',
                                  }}
                                >
                                  <Stack
                                    spacing={1}
                                    alignItems={'start'}
                                    direction={'row'}
                                  >
                                    <Box height={16} width={16}>
                                      <Bus_marker height={16} width={16} />
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
                                        {`${stop.price}  ${getCurrency(3)}`}
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
                              {(durationValues.hour ||
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
                              )}
                            </Stack>
                            <Box
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'start'}
                            >
                              <Checkbox
                                checked={is_popular}
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

export default AddRoutCard;
