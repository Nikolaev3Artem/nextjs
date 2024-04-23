'use client';

import {
  Box,
  Checkbox,
  MenuItem,
  Paper,
  Select,
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
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { IRent } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/rent/add/page';
import theme from '@/theme';
import { BusService } from '@/components/common/BusService';
import Style from '../../../../published/Rent/CardInfo/cardinfo.module.css';
import { useLangContext } from '@/app/context';
import { dashboardBusStaticData } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { getSession } from '@/lib/auth';
import BusConstructor from '../BusConstructor/BusConstructor';
import { revalidatePath } from 'next/cache';

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
  const [firstFloorSeatsCount, setFirstFloorSeatsCount] = useState<number>(0);
  const [secondFloorSeatsCount, setSecondFloorSeatsCount] = useState<number>(0);
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
    control,
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
      is_wc_working: false,
      rows_1: 2,
      rows_2: 0,
      rows_3: 0,
      rows_4: 0,
      rows_5: 0,
      enter_1: true,
      enter_2: false,
      enter_3: false,
      wc: 'no',
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
  const is_wc_working = watch('is_wc_working');
  const files = watch('uploaded_images');
  const rows_1 = watch('rows_1');
  const rows_2 = watch('rows_2');
  const rows_3 = watch('rows_3');
  const rows_4 = watch('rows_4');
  const rows_5 = watch('rows_5');
  const enter_1 = watch('enter_1');
  const enter_2 = watch('enter_2');
  const enter_3 = watch('enter_3');
  const wc = useWatch({ name: 'wc', control: control });

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
        firstFloorSeatsCount?.toString() || '',
      );
      formData.append(
        'second_floor_seats_count',
        secondFloorSeatsCount?.toString() || '',
      );
      formData.append('is_active', data.is_active || 'false');
      formData.append(
        'is_wc_working',
        data?.is_wc_working?.toString() || 'false',
      );
      formData.append('wc', data.wc === 'yes' ? 'true' : 'false');
      formData.append('rows_1', data?.rows_1?.toString() || '');
      formData.append('rows_2', data?.rows_2?.toString() || '');
      formData.append('rows_3', data?.rows_3?.toString() || '');
      formData.append('rows_4', data?.rows_4?.toString() || '');
      formData.append('rows_5', data?.rows_5?.toString() || '');
      formData.append('enter_1', data?.enter_1?.toString() || '');
      formData.append('enter_2', data?.enter_2?.toString() || '');
      formData.append('enter_3', data?.enter_3?.toString() || '');

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
        revalidatePath(`/${lang}/dashboard/bus/id`);
        redirect(`/${lang}/dashboard/bus/`);
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
          <Grid item lg={7.5} height={'100%'}>
            <Paper>
              <Box p={3} display={'flex'} width={'100%'}>
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
                        inputProps={{
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

                    <Stack
                      direction={'row'}
                      spacing={1}
                      justifyItems={'center'}
                      alignItems={'center'}
                      display={'flex'}
                    >
                      <Checkbox
                        {...register('is_wc_working')}
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
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',

                          fontSize: '16px',
                          lineHeight: '140%',
                          color: '#808080',
                        }}
                      >
                        {is_wc_working
                          ? staticData.busTable.working
                          : staticData.busTable.not_working}
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
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.row}
                                </Typography>
                                <TextField
                                  value={rows_1}
                                  {...register('rows_1')}
                                  type="number"
                                  size={'small'}
                                  InputProps={{ inputProps: { min: 0 } }}
                                  InputLabelProps={{
                                    style: { color: '#808080' },
                                    shrink: true,
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 0
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={1.5} height={'100%'}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.enter}
                                </Typography>
                                <Checkbox
                                  {...register('enter_1')}
                                  checked={enter_1}
                                  color="success"
                                  sx={{
                                    padding: 0,
                                    color: '#808080',
                                    justifyContent: 'left',
                                    pb: '16px',
                                  }}
                                />
                                <Typography fontSize={12} mt={'auto'}>
                                  {staticData.busTable.seats_first_floor}: 2
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.row}
                                </Typography>
                                <TextField
                                  value={rows_2}
                                  type="number"
                                  {...register('rows_2')}
                                  size={'small'}
                                  InputProps={{ inputProps: { min: 0 } }}
                                  InputLabelProps={{
                                    style: { color: '#808080' },
                                    shrink: true,
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 0
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.wc}/{' '}
                                  {staticData.busTable.kitchen}
                                </Typography>
                                <Select
                                  {...register('wc')}
                                  id=" wc"
                                  value={wc}
                                  size="small"
                                >
                                  <MenuItem value="no">
                                    {staticData.busTable.no}
                                  </MenuItem>
                                  <MenuItem value="yes">
                                    {staticData.busTable.yes}
                                  </MenuItem>
                                </Select>
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 2
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={1.5} mb={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.enter}
                                </Typography>
                                <Checkbox
                                  {...register('enter_2')}
                                  checked={enter_2}
                                  color="success"
                                  sx={{
                                    padding: 0,
                                    color: '#808080',
                                    justifyContent: 'left',
                                    pb: '16px',
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 2
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.row}
                                </Typography>
                                <TextField
                                  value={rows_3}
                                  {...register('rows_3')}
                                  size={'small'}
                                  type="number"
                                  InputProps={{ inputProps: { min: 0 } }}
                                  InputLabelProps={{
                                    style: { color: '#808080' },
                                    shrink: true,
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 0
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>

                          <BusConstructor
                            rows_1={rows_1}
                            rows_2={rows_2}
                            rows_3={rows_3}
                            is_wc={wc}
                            enter_2={enter_2}
                            enter_1={enter_1}
                            setSeatsCount={setFirstFloorSeatsCount}
                            seats_start={1}
                          />
                        </CustomTabPanel>
                        <CustomTabPanel value={float} index={1}>
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.row}
                                </Typography>
                                <TextField
                                  value={rows_4}
                                  {...register('rows_4')}
                                  type="number"
                                  size={'small'}
                                  InputProps={{ inputProps: { min: 0 } }}
                                  InputLabelProps={{
                                    style: { color: '#808080' },
                                    shrink: true,
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 0
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={1.5} height={'100%'}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.enter}
                                </Typography>
                                <Checkbox
                                  {...register('enter_3')}
                                  checked={enter_3}
                                  color="success"
                                  sx={{
                                    padding: 0,
                                    color: '#808080',
                                    justifyContent: 'left',
                                    pb: '16px',
                                  }}
                                />
                                <Typography fontSize={12} mt={'auto'}>
                                  {staticData.busTable.seats_first_floor}: 2
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={2}>
                              <Stack rowGap={2}>
                                <Typography>
                                  {staticData.busTable.row}
                                </Typography>
                                <TextField
                                  value={rows_5}
                                  type="number"
                                  {...register('rows_5')}
                                  size={'small'}
                                  InputProps={{ inputProps: { min: 0 } }}
                                  InputLabelProps={{
                                    style: { color: '#808080' },
                                    shrink: true,
                                  }}
                                />
                                <Typography fontSize={12}>
                                  {staticData.busTable.seats_first_floor}: 0
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>

                          <BusConstructor
                            rows_1={rows_4}
                            rows_2={rows_5}
                            enter_1={enter_3}
                            setSeatsCount={setSecondFloorSeatsCount}
                            seats_start={firstFloorSeatsCount + 1}
                          />
                        </CustomTabPanel>
                      </Box>
                    </Stack>
                  </Stack>
                </Container>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={4.5} height={'100%'}>
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
                                      alt={`${staticData.busTable.alt}`}
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
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      instanceRef.current?.moveToIdx(idx);
                                    }}
                                    className={cn(
                                      [Style.dot],
                                      currentSlide === idx ? Style.active : '',
                                    )}
                                  ></div>
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
                                {is_wc_working
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
                                {firstFloorSeatsCount}
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
                                {secondFloorSeatsCount}
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
                              disabled={!isDirty || !isValid}
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
