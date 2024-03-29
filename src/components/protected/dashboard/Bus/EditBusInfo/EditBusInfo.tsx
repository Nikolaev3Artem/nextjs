'use client';

import {
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import cn from 'clsx';
import { getCookie } from 'cookies-next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IRent } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/bus/add/page';
import theme from '@/theme';
// import BusService from '../../../Rent/BusService/BusService';
import Style from '@/components/published/Rent/CardInfo/cardinfo.module.css';
import { dashboardBusStaticData } from '@/interface/IStaticData';
import { useLangContext } from '@/app/context';
import { getSession } from '@/lib/auth';

const color_title = grey[800];
const colorHeading = grey[900];

interface IInfoCardProps {
  bus: IRent;
  staticData: dashboardBusStaticData;
  //   serviceBus?: readonly IServiceBus[];
}

const EditBusInfo = ({ bus, staticData }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props: {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
  }) {
    const disabled = props.disabled ? Style.arrow__disabled : '';
    return (
      <svg
        onClick={props.onClick}
        className={`${Style.arrow} ${
          props.left ? Style.arrow__left : Style.arrow__right
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    resetField,
    watch,
    setValue,

    formState: { errors, isDirty, isValid },
  } = useForm<IRent>({
    defaultValues: {
      name: '',
      first_floor_seats: '',
      second_floor_seats: '',
      busIdService: [],
      photo: '',
      is_active: '',
      uploaded_images: {},
    },
    mode: 'onChange',
  });
  const { selectLang } = useLangContext();
  const files = watch('uploaded_images');

  const onSubmitForm = async (data: IRent) => {
    if (!bus) return;
    try {
      const session = await getSession();
      const formData = new FormData();
      if (data.uploaded_images) {
        Object.values(data.uploaded_images).forEach((file: any) => {
          formData.append('images_list', file);
        });
      }
      if (data.busIdService) {
        Object.values(data.busIdService).forEach((item: any) => {
          formData.append('busIdService', item.id || null);
        });
      }
      formData.append('name', data.name || '');
      formData.append('first_floor_seats', data.first_floor_seats || '');
      formData.append('second_floor_seats', data.second_floor_seats || '');
      formData.append('is_active', data.is_active);
      data.photo?.length && formData.append('photo', data.photo[0] || null);

      const response = await axios.patch(
        `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/update/`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        enqueueSnackbar('Ваші зміни збережені', { variant: 'success' });
        rout.push('/dashboard/bus/');
      }
      if (response.status === 201) {
        enqueueSnackbar('Ваша карточка добавлена', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Помилка збереження змін', { variant: 'error' });
    }
  };

  const rout = useRouter();

  const handleBack = () => {
    rout.back();
  };

  return (
    <>
      <SnackbarProvider />
      <Box height={'100%'} width={'100%'}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item lg={7} height={'100%'}>
              <Paper>
                <Box p={4} display={'flex'} width={'100%'}>
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
                      Заповніть форму
                    </Typography>
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
                          {staticData.busTable.name}
                        </Typography>
                        <TextField {...register('name')} size={'small'} />
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
                          {staticData.busTable.services}
                        </Typography>
                        {/* <Autocomplete
                        {...register('busIdService')}
                        // disablePortal
                        size={'small'}
                        id="bus-service"
                        multiple
                        options={serviceBus || []}
                        getOptionLabel={(option: IServiceBus) =>
                          option.name || ''
                        }
                        // onInputChange={event => }
                        fullWidth
                        onChange={(e, value) => setValue('busIdService', value)}
                        renderInput={params => <TextField {...params} />}
                      /> */}
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
                          {staticData.busTable.seats_first_floor}
                        </Typography>
                        <TextField
                          {...register('first_floor_seats')}
                          size={'small'}
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
                          {staticData.busTable.seats_second_floor}
                        </Typography>
                        <TextField
                          {...register('second_floor_seats')}
                          size={'small'}
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
                          {staticData.busTable.poster}
                        </Typography>
                        <TextField
                          {...register('photo')}
                          size={'small'}
                          type={'file'}
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
                          {staticData.busTable.images}
                        </Typography>
                        <TextField
                          {...register('uploaded_images')}
                          size={'small'}
                          type={'file'}
                          inputProps={{
                            multiple: true,
                          }}
                        />

                        {files &&
                          Object.values(files).map((item: any) => (
                            <Typography
                              key={item.id}
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 300,
                                fontSize: '12px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {item.name}
                            </Typography>
                          ))}
                      </Stack>

                      <Stack
                        direction={'row'}
                        spacing={2}
                        justifyItems={'center'}
                        alignItems={'center'}
                        display={'flex'}
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
                          {staticData.busTable.active}
                        </Typography>
                        <Checkbox {...register('is_active')} />
                      </Stack>
                    </Stack>
                  </Container>
                </Box>
              </Paper>
            </Grid>
            <Grid item lg={5} height={'100%'}>
              <Container disableGutters maxWidth={'md'}>
                <Paper>
                  <Box width={'100%'} height={732} px={3} py={3}>
                    <Grid
                      height={'100%'}
                      display={'flex'}
                      direction={'column'}
                      container
                    >
                      <Grid
                        sm={6}
                        display={'flex'}
                        flexDirection={'column'}
                        item
                      >
                        <Box
                          style={{
                            borderRadius: '4px',
                          }}
                          className={Style.navigation_wrapper}
                        >
                          <Box
                            style={{
                              borderRadius: '4px',
                            }}
                            ref={sliderRef}
                            className="keen-slider"
                          >
                            {bus?.images_list && bus?.images_list.length < 1 ? (
                              <Skeleton />
                            ) : (
                              bus.images_list &&
                              bus.images_list.map((image, index) => (
                                <Box
                                  key={index}
                                  style={{
                                    borderRadius: '4px',
                                  }}
                                  height={sm ? 200 : 350}
                                  className="keen-slider__slide"
                                >
                                  <Image
                                    style={{
                                      borderRadius: '4px',
                                      objectFit: 'fill',
                                    }}
                                    src={image.image || ''}
                                    // width={852}
                                    // height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    quality={100}
                                    alt={`${staticData.busTable.alt}`}
                                  />
                                </Box>
                              ))
                            )}
                          </Box>
                          {loaded && instanceRef.current && (
                            <>
                              <Arrow
                                left
                                onClick={(e: any) =>
                                  e.stopPropagation() ||
                                  instanceRef.current?.prev()
                                }
                                disabled={currentSlide === 0}
                              />

                              <Arrow
                                onClick={(e: any) =>
                                  e.stopPropagation() ||
                                  instanceRef.current?.next()
                                }
                                disabled={
                                  currentSlide ===
                                  instanceRef.current.track.details?.slides
                                    .length -
                                    1
                                }
                              />
                            </>
                          )}
                        </Box>
                        {loaded && instanceRef.current && (
                          <div className={Style.dots}>
                            {[
                              ...Array(
                                instanceRef.current.track.details?.slides
                                  .length,
                              ).keys(),
                            ].map(idx => {
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                  }}
                                  className={cn(
                                    [Style.dot],
                                    currentSlide === idx ? Style.active : '',
                                  )}
                                ></button>
                              );
                            })}
                          </div>
                        )}
                      </Grid>
                      <Grid
                        item
                        sm={6}
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
                              {staticData.busTable.features}
                            </Typography>
                            <Stack
                              spacing={1}
                              direction={'column'}
                              p={2}
                              sx={{
                                bgcolor: '#E3EDF9',
                                borderRadius: '4px',
                                // boxShadow: "0 0 2px 1px #00000026"
                                // border: "1px solid #ccc"
                              }}
                            >
                              <Stack
                                spacing={1}
                                alignItems={'center'}
                                direction={'row'}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                >
                                  {staticData.busTable.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                  color={colorHeading}
                                >
                                  {bus.name}
                                </Typography>
                              </Stack>
                              <Stack
                                spacing={1}
                                alignItems={'center'}
                                direction={'row'}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                >
                                  {staticData.busTable.services}
                                </Typography>
                                {/* <BusService busIdService={rent.busIdService} /> */}
                              </Stack>
                              <Stack
                                spacing={1}
                                alignItems={'center'}
                                direction={'row'}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                >
                                  {staticData.busTable.seats_first_floor}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                  color={colorHeading}
                                >
                                  {bus?.first_floor_seats?.length}
                                </Typography>
                              </Stack>
                              <Stack
                                spacing={1}
                                alignItems={'center'}
                                direction={'row'}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                >
                                  {staticData.busTable.seats_second_floor}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '150%',
                                    color: color_title,
                                  }}
                                  color={colorHeading}
                                >
                                  {bus?.second_floor_seats?.length}
                                </Typography>
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
                            >
                              {staticData.busTable.save}
                            </Button>
                          </Box>
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

export default EditBusInfo;
