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
} from '@mui/material';

import Style from '@/components/published/Rent/CardInfo/cardinfo.module.css';
import Circle from '../../../../../../public/icons/journey_from_circle.svg';
import ToCircle from '../../../../../../public/icons/journey_to_circle.svg';
import Marker from '../../../../../../public/icons/map-marker.svg';
import Trash from '../../../../../../public/icons/trash-can.svg';
import Bus_marker from '../../../../../../public/icons/bus-marker.svg';

import theme from '@/theme';
import { grey } from '@mui/material/colors';
const color_title = grey[800];
const colorHeading = grey[900];

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import { useLangContext } from '@/app/context';
import { getSession } from '@/lib/auth';
import { Locale } from '@/i18n.config';
import { IRent } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/bus/add/page';
import { dashboardRoutStaticData } from '@/interface/IStaticData';
import { IRout } from '@/interface/IJourney';
// import BusService from '../../../Rent/BusService/BusService';

interface IInfoCardProps {
  staticData: dashboardRoutStaticData;
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

const AddRoutCard = ({ staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [city, setCity] = useState<CityProp[]>([]);
  const [selectedStop, setSelectedStop] = useState<CityProp>({
    id: undefined,
    city: '',
    address: '',
    coords_x: '',
    cooords_y: '',
  });

  const nameRegex = /^[^\s№?]+$/;
  const UploadFileSchema = yup.object().shape({
    from_place: yup.object().shape({
      id: yup.number().required(),
      city: yup.string().required(),
      // address: yup.string().required(),
      // price: yup.number().nullable(),
    }),
    to_place: yup.object().shape({
      id: yup.number().required(),
      city: yup.string().required(),
      // price: yup.number().nullable(),
      // address: yup.string().required(),
    }),

    price: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),
    stop_price: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),
  });

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<IRout>({
    defaultValues: {
      from_place: {
        id: undefined,
        city: '',
        address: '',
        coords_x: '',
        cooords_y: '',
      },
      to_place: {
        id: undefined,
        city: '',
        address: '',
        coords_x: '',
        cooords_y: '',
      },
      price: 0,
      stops: [],
      is_popular: false,
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });
  const { selectLang } = useLangContext();
  const from_place = watch('from_place');
  const to_place = watch('to_place');
  const price = watch('price');
  const stops = watch('stops');
  const is_stop = watch('is_stop');
  const is_popular = watch('is_popular');

  const router = useRouter();

  const handleDeleteStop = (id: number) => {
    const stops = getValues('stops');
    const updatedCity = stops.filter(item => item.id !== id);
    setValue('stops', updatedCity);
  };

  const onSubmitForm = async (data: IRout) => {
    try {
      const session = await getSession();
      const formData = new FormData();
      const jsonPrice = JSON.stringify(data?.price);

      // formData.append('from_place', data.from_place.city || '');
      // formData.append('to_place', data.from_place.city || '');
      // formData.append('price', jsonPrice || '');
      // formData.append('price', data?.isPopular?.toString() || 'false');

      const response = await axios.post(
        `${BASE_URL}/${selectLang}/api/admin/routes/create`,

        {
          price: data?.price,
          isPopular: data?.is_popular,
          travel_time: '3000',
        },

        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type': 'application/json',
          },
        },
      );
      const rout_id = await response?.data?.id;

      const from_place_resp = await axios.put(
        `${BASE_URL}/${selectLang}/api/admin/routes/${rout_id}/add_stop/${data.from_place.id}`,

        {
          isPopular: true,
        },

        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      const to_place_resp = await axios.put(
        `${BASE_URL}/${selectLang}/api/admin/routes/${rout_id}/add_stop/${data.to_place.id}`,

        {
          isPopular: true,
        },

        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        enqueueSnackbar(`${staticData.routTable.snackBar.update_success}`, {
          variant: 'success',
        });
        router.push(`/${lang}/dashboard/rout/`);
      }
      if (response.status === 201) {
        enqueueSnackbar(`${staticData.routTable.snackBar.add_success}`, {
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
      if (!session) return null;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/admin/city/?limit=599`,
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

  // const handleAddCity = () => {
  //   setCity(prevCity => [...prevCity, selectedStop]);
  //   setSelectedStop({ id: undefined, city: '', price: undefined });
  // };

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

                        <Autocomplete
                          {...register('from_place')}
                          disablePortal
                          fullWidth={true}
                          size="small"
                          sx={{ backgroundColor: 'white' }}
                          options={city}
                          getOptionLabel={(item: CityProp) =>
                            `${item.city} ${item.address}`
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
                                });
                          }}
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
                        <Autocomplete
                          {...register('to_place')}
                          disablePortal
                          fullWidth={true}
                          size="small"
                          sx={{ backgroundColor: 'white' }}
                          options={city}
                          getOptionLabel={(item: CityProp) =>
                            `${item.city} ${item.address}`
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={staticData.routTable.city}
                              FormHelperTextProps={{
                                color: '#256223',
                              }}
                              // helperText={errors?.from_place?.message.}
                              // onError={!!errors?.from_place?.message?.city}
                            />
                          )}
                          onChange={(event, newValue) => {
                            newValue
                              ? setValue('to_place', newValue)
                              : setValue('to_place', {
                                  id: undefined,
                                  city: '',
                                  price: undefined,
                                });
                          }}
                        />
                        <TextField
                          // {...register('from_place.price')}
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
                          value={selectedStop.city}
                          disablePortal
                          fullWidth={true}
                          size="small"
                          sx={{ backgroundColor: 'white' }}
                          options={city.map(
                            (item: CityProp) => `${item.city} ${item.address}`,
                          )}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={staticData.routTable.city}
                            />
                          )}
                          onInputChange={(event, newInputValue, reason) => {
                            const selectedCity = city.find(
                              item => item.city === newInputValue,
                            );
                            setSelectedStop(
                              selectedCity || {
                                id: undefined,
                                city: newInputValue,
                                price: '',
                              },
                            );
                          }}
                        />
                      </Stack>
                      <Stack>
                        <TextField
                          // {...register('from_place.price')}
                          size={'small'}
                          type="number"
                          label={staticData.routTable.price}
                          InputLabelProps={{
                            style: { color: '#808080' },
                          }}
                          // value={watch('selectedStop.price') || 0}
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
                          {...register('is_stop')}
                          color="success"
                          sx={{ padding: 0, color: '#808080' }}
                          checked={is_stop}
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
                            disabled={!is_stop}
                            onClick={() => {
                              const currentStops = getValues('stops');

                              const updatedStops = [
                                ...currentStops,
                                selectedStop,
                              ];

                              setValue('stops', updatedStops);
                              setValue('is_stop', false);
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
                  <Box width={'100%'} height={732} p={2}>
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
                                      <Bus_marker height={16} width={16} />
                                    </Box>

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
                                        {stop.city}
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
                                        {stop.price} UAH
                                      </Typography>
                                      <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
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
                                        <IconButton
                                          onClick={() => {
                                            if (stop.id)
                                              handleDeleteStop(stop.id);
                                          }}
                                          size={'small'}
                                        >
                                          <Trash height={20} width={20} />
                                        </IconButton>
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
                                {to_place.city && (
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
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                      color={colorHeading}
                                    >
                                      {price} UAH
                                    </Typography>
                                    <Box
                                      display={'flex'}
                                      alignItems={'center'}
                                      justifyContent={'space-between'}
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
                                        {to_place.address}
                                      </Typography>
                                      <Box height={16} width={16}>
                                        <Marker height={16} width={16} />
                                      </Box>
                                    </Box>
                                  </Stack>
                                )}
                              </Stack>
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

export default AddRoutCard;
