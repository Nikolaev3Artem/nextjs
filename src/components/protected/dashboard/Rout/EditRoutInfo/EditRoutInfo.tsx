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
  rout: IRout;
  staticData: dashboardRoutStaticData;
  lang: Locale;
}

interface CityProp {
  id: number | null;
  city: string;
  price: number | null;
}

const EditRoutInfo = ({ rout, staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [city, setCity] = useState<CityProp[]>([]);
  const [selectedStop, setSelectedStop] = useState<CityProp>({
    id: null,
    city: '',
    price: null,
  });

  const [deleteId, setDeleteId] = useState<any>([]);

  const nameRegex = /^[^\s№?]+$/;
  const UploadFileSchema = yup.object().shape({
    from_place: yup
      .string()
      .max(30, `${staticData.errors.name_more30}`)
      .matches(nameRegex, `${staticData.errors.error_text}`),
    to_place: yup
      .string()
      .max(30, `${staticData.errors.name_more30}`)
      .matches(nameRegex, `${staticData.errors.error_text}`),
    price: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),
  });

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IRout>({
    defaultValues: {
      from_place: rout?.from_place || {},
      to_place: rout?.to_place || {},
      price: rout?.price || 0,
      stops: rout?.stops || [],
      is_stop: false,
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

  const router = useRouter();

  const handleDeleteStop = (id: number) => {
    // setImagesList((prevImagesList: ItemProps[]) =>
    //   prevImagesList.filter(
    //     (item: ItemProps) => String(item.id) !== String(id),
    //   ),
    // );
  };

  const onSubmitForm = async (data: IRent) => {
    if (!rout) return;
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

  const getCity = useCallback(async () => {
    try {
      // const response = await axios.get<CityProp[]>(`${BASE_URL}/${selectLang}/api/main`);
      // get city
      const response = {
        data: {
          results: [
            {
              id: 3,
              city: 'Tokio',
              price: 200,
            },
            {
              id: 4,
              city: 'Berlin',
              price: 200,
            },
            {
              id: 4,
              city: 'NY',
              price: 200,
            },
          ],
        },
      };
      setCity(response.data.results);
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

  const handleAddCity = () => {
    setCity(prevCity => [...prevCity, selectedStop]);
    setSelectedStop({ id: null, city: '', price: null });
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
                      {`${staticData.routTable.rout} ${rout ? rout?.from_place : ''} - ${rout ? rout?.to_place : ''}`}
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
                        <TextField
                          {...register('from_place')}
                          size={'small'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          // helperText={errors?.from_place?.message}
                          // error={!!errors?.from_place}
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
                        <TextField
                          {...register('to_place')}
                          size={'small'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          // helperText={errors?.to_place?.message}
                          // error={!!errors?.to_place}
                        />
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
                          options={city.map((item: CityProp) => item.city)}
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
                                id: null,
                                city: newInputValue,
                                price: null,
                              },
                            );
                          }}
                        />
                      </Stack>
                      <Stack
                        direction={'row'}
                        spacing={1}
                        justifyItems={'center'}
                        alignItems={'center'}
                        display={'flex'}
                      >
                        <Checkbox
                          {...register('is_stop')}
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
                          {staticData.routTable.stop}
                        </Typography>
                        <Box display={'flex'}>
                          <Button
                            color={'secondary'}
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
                                      Двірцева площа, 1, Львів, Львівська
                                      область
                                    </Typography>
                                    <Box height={16} width={16}>
                                      <Marker height={16} width={16} />
                                    </Box>
                                  </Box>
                                </Stack>
                              </Stack>
                            </Stack>

                            {stops.length > 0 ? (
                              stops.map(stop => (
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
                                          Двірцева площа, 1, Львів, Львівська
                                          область
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
                                      Двірцева площа, 1, Львів, Львівська
                                      область
                                    </Typography>
                                    <Box height={16} width={16}>
                                      <Marker height={16} width={16} />
                                    </Box>
                                  </Box>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Box display={'flex'}>
                              <Button
                                sx={{ height: 50 }}
                                color={'success'}
                                size={'large'}
                                variant={'contained'}
                                fullWidth
                                type={'submit'}
                                disabled={!isValid}
                                onClick={handleAddCity}
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
