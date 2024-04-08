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
  price: number | undefined;
}

const AddRoutCard = ({ staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [city, setCity] = useState<CityProp[]>([]);
  const [selectedStop, setSelectedStop] = useState<CityProp>({
    id: undefined,
    city: '',
    price: undefined,
  });

  const [deleteId, setDeleteId] = useState<any>([]);

  const nameRegex = /^[^\s№?]+$/;
  const UploadFileSchema = yup.object().shape({
    // from_place: yup
    //   .object()
    //   .shape({
    //     id: yup.number().required(),
    //     city: yup.string().required(),
    //     price: yup.number().nullable(),
    //   })
    //   .required(),
    // to_place: yup
    //   .object()
    //   .shape({
    //     id: yup.number().required(),
    //     city: yup.string().required(),
    //     price: yup.number().nullable(),
    //   })
    //   .required(),
    // price: yup
    //   .number()
    //   .integer(staticData.errors.error_number)
    //   .positive(staticData.errors.error_number),
    // stop_price: yup
    //   .number()
    //   .integer(staticData.errors.error_number)
    //   .positive(staticData.errors.error_number),
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
        price: undefined,
      },
      to_place: {
        id: undefined,
        city: '',
        price: undefined,
      },
      price: 0,
      stops: [],
      is_stop: false,
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
  console.log('f', from_place);
  const router = useRouter();

  const handleDeleteStop = (id: number) => {
    // setImagesList((prevImagesList: ItemProps[]) =>
    //   prevImagesList.filter(
    //     (item: ItemProps) => String(item.id) !== String(id),
    //   ),
    // );
  };

  const onSubmitForm = async (data: IRout) => {
    try {
      const session = await getSession();
      // const formData = new FormData();

      // formData.append('from_place', data.from_place.city || '');
      // formData.append('to_place', data.to_place.city || '');
      // formData.append('price', data?.to_place.price?.toString() || '');

      const response = await axios.post(
        `${BASE_URL}/${selectLang}/api/admin/routes/create`,
        // formData,
        {
          from_place: data.from_place.city || '',
          to_place: data.to_place.city || '',
          price: data?.to_place.price?.toString() || '',
          is_popular: data?.is_popular || false,
          // stops: {}
        },
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type': 'application/json',
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
    setSelectedStop({ id: undefined, city: '', price: undefined });
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
                          getOptionLabel={(item: CityProp) => item.city}
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
                          getOptionLabel={(item: CityProp) => item.city}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label={staticData.routTable.city}
                              FormHelperTextProps={{
                                color: '#256223',
                              }}
                              // helperText={errors?.to_place?.message}
                              // onError={!!errors?.to_place}
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
                          label={staticData.routTable.price}
                          InputLabelProps={{
                            style: { color: '#808080' },
                          }}
                          value={watch('to_place.price') || ''}
                          onChange={e =>
                            setValue('to_place.price', e.target.value)
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
                                id: undefined,
                                city: newInputValue,
                                price: undefined,
                              },
                            );
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

                              // Додавання нового об'єкту selectedStop до поточного масиву
                              const updatedStops = [
                                ...currentStops,
                                selectedStop,
                              ];

                              // Оновлення значення поля форми stops
                              setValue('stops', updatedStops);
                            }}
                          >
                            {staticData.routTable.add_btn}
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
                                    {to_place.price} UAH
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
                                // disabled={!isValid}
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
