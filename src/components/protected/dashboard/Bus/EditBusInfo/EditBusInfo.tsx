'use client';

import { useEffect, useState } from 'react';
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
  Select,
  MenuItem,
} from '@mui/material';

import Style from '@/components/published/Rent/CardInfo/cardinfo.module.css';
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
import { dashboardBusStaticData } from '@/interface/IStaticData';
import BusConstructor from '../BusConstructor/BusConstructor';

// import BusService from '../../../Rent/BusService/BusService';

interface IInfoCardProps {
  bus: IRent;
  staticData: dashboardBusStaticData;
  lang: Locale;
}

interface ItemProps {
  id: number;
  photo: string | number;
}

const EditBusInfo = ({ bus, staticData, lang }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);
  const [imagesList, setImagesList] = useState<any>([]);
  const [deleteId, setDeleteId] = useState<any>([]);
  const [float, setFloat] = useState(0);
  const [firstFloorSeatsCount, setFirstFloorSeatsCount] = useState<number>(0);
  const [secondFloorSeatsCount, setSecondFloorSeatsCount] = useState<
    number | null
  >(null);

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

  useEffect(() => {
    if (!bus || !bus.images_list) {
      return;
    }

    setImagesList(bus.images_list);
  }, [bus.images_list]);

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
  const nameRegex = /^[^\s№?]+$/;
  const UploadFileSchema = yup.object().shape({
    file: yup
      .mixed()
      .test(`${staticData.errors.size}`, (value: any) => {
        if (value?.length) {
          return value && value[0]?.size <= 5242880;
        } else {
          return {};
        }
      })
      .test('Type', `${staticData.errors.formats}`, (value: any) => {
        if (value?.length) {
          return (
            value &&
            (value[0]?.type === 'image/jpeg' ||
              value[0]?.type === 'image/jpg' ||
              value[0]?.type === 'image/png' ||
              value[0]?.type === 'image/webp')
          );
        } else {
          return {};
        }
      }),
    name: yup
      .string()
      .max(30, `${staticData.errors.name_more30}`)
      .matches(nameRegex, `${staticData.errors.error_text}`),
    first_floor_seats_count: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),
    second_floor_seats_count: yup
      .number()
      .integer(staticData.errors.error_number),
    is_wc_working: yup.boolean(),
    plates_number: yup.string().max(10, `${staticData.errors.plates_number10}`),
    wc: yup.string(),
    rows_1: yup.number(),
    rows_2: yup.number(),
    rows_3: yup.number(),
    rows_4: yup.number(),
    rows_5: yup.number(),
    enter_1: yup.boolean(),
    enter_2: yup.boolean(),
    enter_3: yup.boolean(),
  });

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

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IRent>({
    defaultValues: {
      name: bus.name || '',
      first_floor_seats_count:
        firstFloorSeatsCount || bus?.first_floor_seats_count || 0,
      second_floor_seats_count:
        secondFloorSeatsCount || bus?.second_floor_seats_count || 0,
      busIdService: [],
      photo: bus?.photo || null,
      rentable: bus?.rentable || false,
      uploaded_images: {},
      plates_number: bus?.plates_number || '',
      is_wc_working: bus?.is_wc_working || false,
      wc: bus?.wc ? 'yes' : 'no',
      rows_1: bus.rows_1 || 0,
      rows_2: bus.rows_2 || 0,
      rows_3: bus.rows_3 || 0,
      rows_4: bus.rows_4 || 0,
      rows_5: bus.rows_5 || 0,
      enter_1: bus.enter_1 || false,
      enter_2: bus.enter_2 || false,
      enter_3: bus.enter_3 || false,
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });
  const { selectLang } = useLangContext();
  const files = watch('uploaded_images');
  const name = watch('name');
  const first_floor_seats_count = watch('first_floor_seats_count');
  const second_floor_seats_count = watch('second_floor_seats_count');
  const plates_number = watch('plates_number');
  const wc = watch('wc');
  const rentable = watch('rentable');
  const photo = watch('photo');
  const is_wc_working = watch('is_wc_working');
  const rows_1 = watch('rows_1');
  const rows_2 = watch('rows_2');
  const rows_3 = watch('rows_3');
  const rows_4 = watch('rows_4');
  const rows_5 = watch('rows_5');
  const enter_1 = watch('enter_1');
  const enter_2 = watch('enter_2');
  const enter_3 = watch('enter_3');

  const rout = useRouter();

  const handleDeleteFile = (id: string) => {
    setImagesList((prevImagesList: ItemProps[]) =>
      prevImagesList.filter(
        (item: ItemProps) => String(item.id) !== String(id),
      ),
    );
  };

  const handleDeleteImages = (key: string, item: IRent) => {
    setImagesList((prevImagesList: ItemProps[]) => {
      const updatedImagesList = prevImagesList.filter(
        (el: ItemProps) => el.id !== item.id,
      );
      return updatedImagesList;
    });
    setDeleteId((prevState: number[]) => [...prevState, item.id]);
  };

  const onSubmitForm = async (data: IRent) => {
    if (!bus) return;

    try {
      const session = await getSession();
      const formData = new FormData();

      if (data.busIdService) {
        Object.values(data.busIdService).forEach((item: any) => {
          formData.append('busIdService', item.id || null);
        });
      }
      formData.append('name', data.name || '');
      formData.append(
        'first_floor_seats_count',
        // @ts-ignore
        firstFloorSeatsCount?.toString() || 0,
      );
      formData.append(
        'second_floor_seats_count',
        // @ts-ignore
        secondFloorSeatsCount?.toString() || 0,
      );

      formData.append(
        'is_wc_working',
        data?.is_wc_working?.toString() || 'false',
      );
      formData.append('rentable', data.rentable);
      formData.append('wc', data?.wc === 'yes' ? 'true' : 'false');
      // @ts-ignore
      formData.append('rows_1', data?.rows_1 || 0);
      // @ts-ignore
      formData.append('rows_2', data?.rows_2 || 0);
      // @ts-ignore
      formData.append('rows_3', data?.rows_3 || 0);
      // @ts-ignore
      formData.append('rows_4', data?.rows_4 || 0);
      // @ts-ignore
      formData.append('rows_5', data?.rows_5 || 0);
      // @ts-ignore
      formData.append('enter_1', data?.enter_1 || false);
      // @ts-ignore
      formData.append('enter_2', data?.enter_2 || false);
      // @ts-ignore
      formData.append('enter_3', data?.enter_3 || false);
      formData.append('plates_number', data.plates_number);
      data.photo?.length
        ? formData.append('photo', data.photo[0] || null)
        : formData.append('photo', bus.photo);

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

      if (data.uploaded_images) {
        const imageFormData = new FormData();
        Object.values(data.uploaded_images).forEach(async (file: any) => {
          imageFormData.append('photo', file);
          const response = await axios.post(
            `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/add_photo/`,
            imageFormData,
            {
              headers: {
                Authorization: 'Bearer ' + session.access,
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        });
      }

      if (deleteId.length > 0) {
        deleteId.map(async (id: number) => {
          const response = await axios.delete(
            `${BASE_URL}/${selectLang}/api/admin/service/bus/${bus.id}/delete_photo/${id}`,

            {
              headers: {
                Authorization: 'Bearer ' + session.access,
                'Content-Type': 'multipart/form-data',
              },
            },
          );
        });
      }

      if (response.status === 200) {
        enqueueSnackbar(`${staticData.busTable.snackBar.update_success}`, {
          variant: 'success',
        });
        rout.push(`/${lang}/dashboard/bus/`);
      }
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
  };

  const clearable = () => {
    setImagePreviewUrl(bus.photo);
    resetField('photo');
  };

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFloat(newValue);
  };

  return (
    <>
      <Box height={'100%'} width={'100%'}>
        {/* @ts-ignore */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item xs={6} height={'100%'}>
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
                      {staticData.busTable.fill_form}
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
                          {staticData.busTable.name}
                        </Typography>
                        <TextField
                          {...register('name')}
                          size={'small'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          helperText={errors?.name?.message}
                          error={!!errors?.name}
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
                          {staticData.busTable.plate}
                        </Typography>
                        <TextField
                          {...register('plates_number')}
                          size={'small'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          helperText={errors?.plates_number?.message}
                          error={!!errors?.plates_number}
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
                          {staticData.busTable.poster}
                        </Typography>
                        <TextField
                          {...register('photo', {
                            onChange: event => {
                              // fileSizeFile(event);
                              if (event.target?.files[0] !== undefined) {
                                setImagePreviewUrl(
                                  window.URL.createObjectURL(
                                    event.target?.files[0],
                                  ),
                                );
                              } else {
                                clearable();
                              }
                            },
                          })}
                          size={'small'}
                          type={'file'}
                          FormHelperTextProps={{
                            color: '#256223',
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
                          {staticData.busTable.images}
                        </Typography>
                        <TextField
                          {...register('uploaded_images', {
                            onChange: event => {
                              const fileList = event.target.files;

                              if (fileList.length > 0) {
                                const newImagesList = Array.from(fileList).map(
                                  (file, index) => {
                                    return {
                                      //@ts-ignore
                                      id: file.name,
                                      //@ts-ignore
                                      photo: window.URL.createObjectURL(file),
                                    };
                                  },
                                );

                                setImagesList((prevImagesList: ItemProps[]) => [
                                  ...prevImagesList,
                                  ...newImagesList,
                                ]);
                              } else {
                                clearable();
                              }
                            },
                          })}
                          size={'small'}
                          type={'file'}
                          inputProps={{
                            multiple: true,
                          }}
                        />
                        {imagesList.length > 0 &&
                          Object.entries(imagesList).map(
                            ([key, item]: [string, any], ind) => {
                              return (
                                item && (
                                  <Box
                                    key={key}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                        color: color_title,
                                      }}
                                    >
                                      {staticData.busTable.images}
                                      {item.id}
                                    </Typography>
                                    <IconButton
                                      onClick={() => {
                                        if (
                                          item.photo &&
                                          item.photo.startsWith(
                                            '/media/bus_service/photos/',
                                          )
                                        ) {
                                          handleDeleteImages(key, item);
                                        } else {
                                          handleDeleteFile(item.id);
                                        }
                                      }}
                                      color="error"
                                      aria-label="delete"
                                      sx={{ width: '10px', height: '10px' }}
                                    >
                                      <HighlightOffOutlinedIcon />
                                    </IconButton>
                                  </Box>
                                )
                              );
                            },
                          )}
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
                          {staticData.busTable.wc}
                        </Typography>
                        <Checkbox
                          {...register('is_wc_working')}
                          color="success"
                          checked={is_wc_working}
                        />
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
                          {staticData.busTable.rentable}
                        </Typography>
                        <Checkbox
                          {...register('rentable')}
                          color="success"
                          checked={rentable}
                        />
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
            <Grid item xs={5} height={'100%'}>
              <Container disableGutters maxWidth={'md'}>
                <Paper>
                  <Box width={'100%'} height={732} px={3} py={3}>
                    <Grid
                      height={'100%'}
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      <Grid
                        sm={12}
                        display={'flex'}
                        flexDirection={'column'}
                        item
                      >
                        <Box>
                          <Box
                            style={{
                              borderRadius: '4px',
                            }}
                            className={Style.navigation_wrapper}
                          >
                            {bus?.images_list &&
                            bus?.images_list?.length > 0 ? (
                              <Box
                                style={{
                                  borderRadius: '4px',
                                }}
                                ref={sliderRef}
                                className="keen-slider"
                              >
                                {imagesList && bus?.images_list.length < 1 ? (
                                  <Skeleton />
                                ) : (
                                  imagesList &&
                                  imagesList.map(
                                    (image: any, index: number) => (
                                      <Box
                                        key={index}
                                        style={{
                                          borderRadius: '4px',
                                        }}
                                        height={sm ? 200 : 350}
                                        width={'100%'}
                                        className="keen-slider__slide"
                                      >
                                        <Image
                                          style={{
                                            borderRadius: '4px',
                                            objectFit: 'cover',
                                          }}
                                          src={
                                            image.photo.startsWith(
                                              '/media/bus_service/photos/',
                                            )
                                              ? `http://api.lehendatrans.com${image.photo}`
                                              : image.photo
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
                                  )
                                )}
                              </Box>
                            ) : (
                              <Box
                                style={{
                                  borderRadius: '4px',
                                }}
                                height={sm ? 200 : 350}
                                // height={'150px'}
                                position={'relative'}
                              >
                                {imagePreviewUrl ? (
                                  <Image
                                    style={{
                                      borderRadius: '4px',
                                      objectFit: 'cover',
                                    }}
                                    src={imagePreviewUrl}
                                    // width={852}
                                    // height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    quality={100}
                                    alt={`${staticData.busTable.alt}`}
                                  />
                                ) : bus.photo ? (
                                  <Image
                                    style={{
                                      borderRadius: '4px',
                                      objectFit: 'cover',
                                    }}
                                    src={
                                      bus.photo
                                        ? `http://api.lehendatrans.com${bus.photo}`
                                        : ''
                                    }
                                    // width={852}
                                    // height={400}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill
                                    quality={100}
                                    alt={`${staticData.busTable.alt}`}
                                  />
                                ) : (
                                  <Skeleton height={sm ? 200 : 350} />
                                )}
                              </Box>
                            )}
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
                                  <div
                                    key={idx}
                                    onClick={(e: any) => {
                                      e.stopPropagation();
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
                      </Grid>
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
                                  {staticData.busTable.plate}
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
                                  {second_floor_seats_count}
                                  {/* {secondFloorSeatsCount
                                    ? secondFloorSeatsCount
                                    : bus.second_floor_seats_count} */}
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
                              disabled={!isValid}
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
