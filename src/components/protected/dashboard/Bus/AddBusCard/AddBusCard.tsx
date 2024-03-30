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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import { BiSave } from 'react-icons/bi';

import axios from 'axios';
import cn from 'clsx';
import { getCookie } from 'cookies-next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IRent } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/rent/add/page';
import theme from '@/theme';
import { BusService } from '@/components/common/BusService';
import Style from '../../../../published/Rent/CardInfo/cardinfo.module.css';
import { useLangContext } from '@/app/context';
import { dashboardBusStaticData } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { getSession } from '@/lib/auth';

const color_title = grey[800];
const colorHeading = grey[900];

interface IAddRenCardProps {
  serviceBus?: readonly IServiceBus[];
  staticData: dashboardBusStaticData;
  lang: Locale;
}

const AddBusCard = ({ serviceBus, staticData, lang }: IAddRenCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataIDService, setDataIDService] = useState<number[]>([]);
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
  const [float, setFloat] = useState(0);
  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFloat(newValue);
  };

  // const clearable = () => {
  // 	setImagePreviewUrl(res[0].img)
  // 	resetField("file")
  // }

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
      first_floor_seats_count: undefined,
      second_floor_seats_count: undefined,
      busIdService: [],
      photo: '',
      is_active: false,
      uploaded_images: {},
      rentable: false,
      plates_number: '',
      is_Wc_Work: false,
    },
    mode: 'onChange',
  });
  const { selectLang } = useLangContext();
  const name = watch('name');
  const first_floor_seats_count = watch('first_floor_seats_count');
  const second_floor_seats_count = watch('second_floor_seats_count');
  const plates_number = watch('plates_number');
  // const busDataService = watch('busIdService');
  const photo = watch('photo');
  const is_active = watch('is_active');
  const is_Wc_Work = watch('is_Wc_Work');
  const files = watch('uploaded_images');

  async function onSubmitForm(data: IRent) {
    try {
      const session = await getSession();
      if (!session) return null;
      const formData = new FormData();
      // if (data.uploaded_images) {
      //   Object.values(data.uploaded_images).forEach((file: any) => {
      //     formData.append('uploaded_images', file);
      //   });
      // }
      if (data.busIdService) {
        Object.values(data.busIdService).forEach((item: any) => {
          formData.append('busIdService', item.id || []);
        });
      }
      formData.append('name', data.name || '');
      formData.append('rentable', data.rentable || 'false');

      formData.append('plates_number', data.plates_number || '');
      formData.append(
        'first_floor_seats_count',
        data?.first_floor_seats_count?.toString() || '',
      );
      formData.append(
        'second_floor_seats_count',
        data?.second_floor_seats_count?.toString() || '',
      );
      formData.append('is_active', data.is_active || 'false');
      data.photo?.length && formData.append('photo', data.photo[0] || null);
      const response = await axios.post(
        `${BASE_URL}${selectLang}/api/admin/service/bus/create/`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 201) {
        enqueueSnackbar(`${staticData.busTable.snackBar.add_success}`, {
          variant: 'success',
        });
        rout.push(`/${lang}/dashboard/bus/`);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.busTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
  }

  const rout = useRouter();

  const handleBack = () => {
    rout.back();
  };
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

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

  return (
    <Box height={'100%'} width={'100%'}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid container direction={'row'} spacing={2}>
          <Grid item lg={7} height={'100%'}>
            <Paper>
              <Box p={4} display={'flex'} width={'100%'}>
                <Container disableGutters>
                  <Stack spacing={2}>
                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('name')}
                        size={'small'}
                        label={staticData.busTable.name}
                        InputLabelProps={{
                          style: { color: '#808080' },
                        }}
                      />
                    </Stack>
                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('photo')}
                        size={'small'}
                        type={'file'}
                        InputLabelProps={{
                          style: { color: '#808080' },
                        }}
                        // label={staticData.busTable.poster}
                      />
                    </Stack>
                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('uploaded_images')}
                        size={'small'}
                        type={'file'}
                        // label={staticData.busTable.images}
                        inputProps={{
                          multiple: true,

                          style: { color: '#808080' },
                        }}
                      />
                      {files &&
                        Object.values(files).map((item: any, ind) => (
                          <Box key={item.id | ind}>
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 300,
                                fontSize: '11px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Box>
                        ))}
                    </Stack>
                    <Stack spacing={2} direction={'column'}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',

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
                        onInputChange={(event, value) =>
                          setValue('busIdService', value)
                        }
                        fullWidth
                        onChange={(e, value) => setValue('busIdService', value)}
                        renderInput={params => <TextField {...params} />}
                      /> */}
                    </Stack>
                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('plates_number')}
                        size={'small'}
                        label={staticData.busTable.plate}
                        InputLabelProps={{
                          style: { color: '#808080' },
                        }}
                      />
                    </Stack>
                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('first_floor_seats_count')}
                        size={'small'}
                        label={staticData.busTable.seats_first_floor}
                        InputLabelProps={{
                          style: { color: '#808080' },
                        }}
                      />
                    </Stack>

                    <Stack spacing={2} direction={'column'}>
                      <TextField
                        {...register('second_floor_seats_count')}
                        size={'small'}
                        label={staticData.busTable.seats_second_floor}
                        InputLabelProps={{
                          style: { color: '#808080' },
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
                        {...register('is_Wc_Work')}
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
                        {staticData.busTable.wc}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      spacing={1}
                      justifyItems={'center'}
                      alignItems={'center'}
                      display={'flex'}
                    >
                      <Checkbox
                        {...register('is_active')}
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
                        {staticData.busTable.active}
                      </Typography>
                    </Stack>

                    <Stack width={'100%'}>
                      <Box>
                        <Tabs
                          value={float}
                          onChange={handleChange}
                          aria-label={staticData.busTable.float}
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
                            label={`${staticData.busTable.float} 1`}
                            {...a11yProps(0)}
                          />

                          <Tab
                            label={`${staticData.busTable.float} 2`}
                            {...a11yProps(1)}
                          />
                        </Tabs>
                        <CustomTabPanel value={float} index={0}>
                          <Box>1</Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={float} index={1}>
                          <Box>2</Box>
                        </CustomTabPanel>
                      </Box>
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
                    flexDirection={'column'}
                    // container
                  >
                    <Grid
                      sm={12}
                      display={'flex'}
                      flexDirection={'column'}
                      item
                    >
                      {files.length ? (
                        <Box>
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
                              {Object.values(files).map(
                                (image: any, index: any) => (
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
                                      src={
                                        window.URL.createObjectURL(image) || ''
                                      }
                                      // width={852}
                                      // height={400}
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      fill
                                      quality={100}
                                      alt={'Bus photo'}
                                    />
                                  </Box>
                                ),
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
                                    instanceRef.current.track.details.slides
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
                                  instanceRef.current.track.details.slides
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
                        </Box>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          height={'95%'}
                          sx={{ borderRadius: '4px' }}
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      display={'flex'}
                      direction={'column'}
                      container
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
                                {staticData.busTable.name}:
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
                                {name}
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
                                {staticData.busTable.services}:
                              </Typography>
                              {/* <BusService busIdService={busDataService} /> */}
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
                                {staticData.busTable.wc}:
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
                                {is_Wc_Work
                                  ? staticData.busTable.working
                                  : staticData.busTable.not_working}
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
                                {staticData.busTable.plate}:
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
                                {plates_number}
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
                                {staticData.busTable.seats_first_floor}:
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
                                {first_floor_seats_count}
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
                                {second_floor_seats_count}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                        <Box display={'flex'}>
                          <Stack width={'100%'} spacing={4} direction={'row'}>
                            <Button
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '150%',
                                textTransform: 'none',
                              }}
                              color={'success'}
                              size={'large'}
                              variant={'contained'}
                              fullWidth
                              type={'submit'}
                              startIcon={<BiSave />}
                            >
                              {staticData.busTable.save}
                            </Button>
                          </Stack>
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
  );
};

export default AddBusCard;
