'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Checkbox,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n.config';
import * as yup from 'yup';
import { filesize } from 'filesize';
import { getSession } from '@/lib/auth';
import dayjs, { Dayjs } from 'dayjs';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';

import theme from '@/theme';
import Style from './ruleform.module.css';
import { useLangContext } from '@/app/context';

import { dashboardContactsStaticData } from '@/interface/IStaticData';

import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IContactText, PhoneType } from '@/interface/IEditorText';
import { FaTrashAlt } from 'react-icons/fa';
import { BiSave } from 'react-icons/bi';
import { FaViber } from 'react-icons/fa';
import { TbBrandTelegram } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { grey } from '@mui/material/colors';

const color_title = grey[800];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const ContactForm = ({
  staticData,
  lang,
  rout,
}: {
  staticData: dashboardContactsStaticData;
  lang: Locale;
  rout: string;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [res, setRes] = useState<IContactText>();
  const [social, setSocial] = useState<PhoneType[]>([]);
  const [addedSocial, setAddedSocial] = useState<PhoneType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectLang, setSelectLang } = useLangContext();
  const [size, setSize] = useState<any>(0);
  const [workTime, setWorkTime] = useState<Dayjs[]>(() => []);
  const [lunchTime, setLunchTime] = useState<Dayjs[]>(() => []);
  const [workDay, setWorkDay] = useState<string[]>(() => ['']);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any>(null);
  const [weekendDay, setWeekendDay] = React.useState<string[]>(['']);

  useEffect(() => {
    if (!res) {
      return;
    }

    res?.weekends
      ? setWeekendDay(res.weekends.split('-'))
      : setWeekendDay(['']);
  }, [res]);

  useEffect(() => {
    if (!res) {
      return;
    }
    const day = res?.weekdays_work?.split('-');
    res?.weekdays_work && day ? setWorkDay(day) : setWorkDay(['']);
    setLunchTime(
      res?.lunch_time
        ? res?.lunch_time?.split('-').map(el => dayjs(el.trim(), 'HH:mm'))
        : [],
    );

    setWorkTime(
      res?.weekdays_time
        ? res?.weekdays_time?.split('-').map(el => dayjs(el.trim(), 'HH:mm'))
        : [],
    );
  }, [res]);

  const onSubmit = async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      setIsLoading(true);

      const formData = new FormData();

      const weekdays_time_string = `${dayjs(workTime[0]).format('HH:mm')} - ${dayjs(workTime[1]).format('HH:mm')}`;

      formData.append('text', text || res?.text || '');
      formData.append('text2', text2 || res?.text2 || '');
      formData.append('title', title || res?.title || '');
      formData.append('alt', alt || res?.alt || '');
      formData.append('icon', selectLang || '');
      formData.append('address', address || res?.address || '');

      formData.append('email', email || res?.email || '');
      formData.append(
        'weekdays_work',
        weekdays_work || res?.weekdays_work || '',
      );

      const t = workTime.length > 0 ? weekdays_time_string : '';
      formData.append('weekdays_time', t || res?.weekdays_time || '');
      formData.append('weekends', weekends || res?.weekends || '');
      formData.append('lunch_time', lunch_time || res?.lunch_time || '');

      img.length && formData.append('img', img[0] || null);
      const response = await axios.post(
        `${BASE_URL}/${selectLang}/api/admin/contacts/create`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      reset();
      await getData();

      if (social.length > 0) {
        const requests = social.map(phone => {
          const socialFormData = new FormData();
          socialFormData.append('phone_number', phone.phone_number || '');
          socialFormData.append('telegram', phone.telegram || '');
          socialFormData.append('viber', phone.viber || '');
          socialFormData.append('whatsup', phone.whatsup || '');
          return axios.post(
            `${BASE_URL}/${selectLang}/api/admin/social_media/create`,
            socialFormData,
            {
              headers: {
                Authorization: 'Bearer ' + session.access,
                'Content-Type':
                  'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
              },
            },
          );
        });
        const responses = await Promise.all(requests);

        if (
          responses.every(response => response.status === 201) &&
          response.status === 201
        ) {
          setTimeout(() => {
            enqueueSnackbar(`${staticData.snackBar.success}`, {
              variant: 'success',
            });
          }, 1500);
        } else {
          enqueueSnackbar(`${staticData.snackBar.error}`, {
            variant: 'error',
          });
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.snackBar.error}`, {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  interface IFormInput {
    title: string | undefined;
    text: string | undefined;
    text2: string | undefined;
    alt: string | undefined;
    img: any;
    id: number;
    icon: string | undefined;
    address: string | undefined;
    email: string | undefined;
    weekdays_work: string | undefined;
    weekdays_time: string | undefined;
    weekends: string | undefined;
    lunch_time: string | undefined;
    phone: PhoneType;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phone_regex = /^\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const UploadFileSchema = yup.object().shape({
    phone: yup
      .object()
      .notRequired()
      .shape({
        phone_number: yup
          .string()
          .nullable()
          .test(
            'phone-format',
            'Неправильний формат номера телефону',
            function (value) {
              if (!value || value === '') {
                return true;
              }

              return phone_regex.test(value);
            },
          ),
      }),
    img: yup
      .mixed()
      .test(`${staticData.form.errors.size}`, (value: any) => {
        if (value.length) {
          return value && value[0]?.size <= 5242880;
        } else {
          return {};
        }
      })
      .test('Type', `${staticData.form.errors.formats}`, (value: any) => {
        if (value.length) {
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
    title: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    // main_desc: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    // title1: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    text: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    address: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    email: yup
      .string()
      .notRequired()
      // .nullable()
      // .matches(emailRegex, `${staticData.form.errors.email_formats}`)
      .max(60, `${staticData.form.errors.title_more60}`),
    // title2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    text2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    alt: yup.string().max(30, `${staticData.form.errors.alt_more30}`),
  });

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/${selectLang}/api/contacts`,
      );

      if (status === 200 && data?.length > 0) {
        setRes(data[data?.length - 1]);
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
    getData().catch(console.error);
  }, [getData]);

  const getSocial = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/${selectLang}/api/social_media`,
      );

      if (status === 200 && data?.length > 0) {
        setSocial(data);
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
    getSocial().catch(console.error);
  }, [getSocial]);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    setValue,
    watch,

    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      title: res?.title || '',
      text: res?.text || '',
      text2: res?.text2 || '',
      alt: res?.alt || '',
      icon: res?.icon || '',
      address: res?.address || '',
      email: res?.email || '',
      weekdays_work: res?.weekdays_work || '',
      weekdays_time: res?.weekdays_time || '',
      weekends: res?.weekends || '',
      lunch_time: res?.lunch_time || '',
      img: {},
      id: res?.id || 0,
      phone: {
        viber: '',
        telegram: '',
        whatsup: '',
        phone_number: '',
        id: Date.now(),
      },
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  const title = watch('title');
  const text = watch('text');
  const text2 = watch('text2');
  const alt = watch('alt');
  const img = watch('img');
  const icon = watch('icon');
  const address = watch('address');
  const email = watch('email');
  const weekdays_work = watch('weekdays_work');
  const phone = watch('phone');

  const weekends = watch('weekends');
  const lunch_time = watch('lunch_time');

  const fileSizeFile = (event: any) => {
    if (event.target?.files[0] !== undefined) {
      setSize(
        filesize(event.target?.files[0]?.size, {
          base: 2,
          standard: 'jedec',
        }),
      );
    } else {
      clearable();
    }
  };

  const clearable = () => {
    setImagePreviewUrl(res?.img);
    resetField('img');
  };

  const handleTimeChange = (newValue: Dayjs | null, index: number) => {
    const updatedWorkTime = [...workTime];
    if (newValue !== null) {
      updatedWorkTime[index] = newValue;
      setWorkTime(updatedWorkTime);
    }
  };

  const handleLunchTimeChange = (newValue: Dayjs | null, index: number) => {
    const updatedLunchTime = [...lunchTime];
    if (newValue !== null) {
      updatedLunchTime[index] = newValue;
      setLunchTime(updatedLunchTime);
    }
  };

  const handleChange = (event: SelectChangeEvent, ind: number) => {
    const updatedWorkDay = [...workDay];
    updatedWorkDay[ind] = event.target.value;
    setWorkDay(updatedWorkDay);
    setValue('weekdays_work', updatedWorkDay.toString().split(',').join('-'));
  };

  const handleWeekDayChange = (event: SelectChangeEvent<typeof weekendDay>) => {
    const {
      target: { value },
    } = event;
    setWeekendDay(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split('-') : value,
    );
    setValue('weekends', value.toString().split(',').join('-'));
  };

  const handleSocialCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const socialObjIndex = social.findIndex(obj => obj.id === id);

    if (socialObjIndex === -1) return;

    const updatedSocial = [...social];
    const socialObj = updatedSocial[socialObjIndex];
    const el = event.target.name.toString();

    if (el) {
      switch (el) {
        case 'viber':
          socialObj.viber = socialObj.viber ? '' : socialObj.phone_number;
          break;
        case 'telegram':
          socialObj.telegram = socialObj.telegram ? '' : socialObj.phone_number;

          break;
        case 'whatsup':
          socialObj.whatsup = socialObj.whatsup ? '' : socialObj.phone_number;

          break;
        default:
          break;
      }
    }
    updatedSocial[socialObjIndex] = socialObj;
    setSocial(updatedSocial);
  };

  const handleDeleteContact = (id: number) => {
    const updatedSocial = [...social].filter(phone => phone.id !== id);
    setSocial(updatedSocial);

    const updateAdd = [...addedSocial].filter(phone => phone.id !== id);
    setAddedSocial(updateAdd);
  };

  const handleAddContact = (phone: PhoneType) => {
    const updatedSocial = [...social, phone];

    setSocial(updatedSocial);

    const add = [...addedSocial, phone];
    setAddedSocial(add);
    setValue('phone', {
      viber: '',
      telegram: '',
      whatsup: '',
      phone_number: '',
      id: Date.now(),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        mb={2}
        sx={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '140%',
          color: color_title,
        }}
      >
        {staticData.preview}
      </Typography>

      <Container
        maxWidth={false}
        className={Style.home_form_img_content}
        disableGutters
      >
        <Box className={Style.home_form_wrapper_img}>
          {!isLoading ? (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <Fade in={true} timeout={1000}>
                {imagePreviewUrl || res?.img ? (
                  <Image
                    style={{
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                    src={
                      imagePreviewUrl ||
                      `http://api.lehendatrans.com${res?.img}`
                    }
                    alt={alt || res?.title || ''}
                    fill
                    priority={true}
                    quality={10}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    animation={'wave'}
                    width={'100%'}
                    height={'100%'}
                  />
                )}
              </Fade>
            </Box>
          ) : (
            <Skeleton
              variant="rectangular"
              animation={'wave'}
              width={'100%'}
              height={'100%'}
            />
          )}
        </Box>
        {!isLoading ? (
          <Fade in={true} timeout={1000}>
            <Box className={Style.home_form_content_position}>
              <Box className={Style.home_form_content_title}>
                <Typography className={Style.home_form_title}>
                  {title || (res && res?.title)}
                </Typography>

                <Grid
                  container
                  bgcolor={'white'}
                  mb={1}
                  borderRadius={0.5}
                  p={1}
                  mr={'auto'}
                >
                  <Grid item xs={12} mb={1}>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {text || (res && res?.text)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {address || (res && res?.address)}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {email || (res && res?.email)}
                    </Typography>

                    {social &&
                      social?.map(el => (
                        <Box
                          fontSize={16}
                          display={'flex'}
                          columnGap={1}
                          key={el.id}
                          alignItems={'center'}
                        >
                          <Typography
                            variant="body1"
                            className={Style.contact__phone}
                          >
                            {el.phone_number}
                          </Typography>
                          {el.telegram && (
                            <IconButton
                              sx={{
                                display: 'flex',
                                padding: 0,
                                width: '16px',
                              }}
                            >
                              <TbBrandTelegram
                                color={'404040'}
                                width={'10px'}
                                height={'10px'}
                              />
                            </IconButton>
                          )}
                          {el.viber && (
                            <IconButton
                              sx={{
                                display: 'flex',
                                padding: 0,
                                width: '16px',
                              }}
                            >
                              <FaViber color={'404040'} />
                            </IconButton>
                          )}
                          {el.whatsup && (
                            <IconButton
                              sx={{
                                display: 'flex',
                                padding: 0,
                                width: '16px',
                              }}
                            >
                              <FaWhatsapp color={'404040'} />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {staticData.form.text.schedule}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {weekdays_work?.toUpperCase() ||
                        (res && res?.weekdays_work?.toUpperCase())}
                    </Typography>

                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {workTime.length > 0
                        ? `${dayjs(workTime[0]).format('HH:mm')} - ${dayjs(workTime[1]).format('HH:mm')}`
                        : res && res?.weekdays_time}
                    </Typography>

                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {staticData.form.text.lunchtime}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {lunchTime.length > 0
                        ? `${dayjs(lunchTime[0]).format('HH:mm')} - ${dayjs(lunchTime[1]).format('HH:mm')}`
                        : res && res?.lunch_time}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {weekends || res?.weekends}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'400'}
                      variant="body1"
                    >
                      {staticData.form.text.weekend}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Fade>
        ) : (
          <Box className={Style.home_form_content_position_circular}>
            <Box className={Style.home_form_content_circular}>
              <CircularProgress color={'secondary'} />
            </Box>
          </Box>
        )}
      </Container>

      <Box
        className={Style.home_form}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container
            maxWidth={false}
            className={Style.home_form_content}
            disableGutters
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Grid container spacing={2} padding={2}>
                  <Grid item width={'100%'} xl={6}>
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        lineHeight: '140%',
                        color: color_title,
                      }}
                      mb={2}
                    >
                      {staticData.form.text.h1}
                    </Typography>
                    <Box
                      sx={{ width: '100%', minHeight: 64 }}
                      display={'flex'}
                      justifyContent={'center'}
                      flexDirection={'row'}
                    >
                      <>
                        <TextField
                          {...register('title')}
                          InputLabelProps={{
                            color: 'secondary',
                          }}
                          sx={{
                            '& label': {
                              fontSize: 14,
                              color: color_title,
                            },
                          }}
                          fullWidth
                          label={staticData.form.text.label}
                          size={'small'}
                          value={title}
                          variant={'outlined'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          helperText={errors?.title?.message}
                          error={!!errors?.title}
                          defaultChecked={false}
                          InputProps={{
                            color: 'secondary',
                            endAdornment: (
                              <InputAdornment position="end">
                                {title && title.length ? (
                                  <>
                                    <Typography
                                      sx={{ fontSize: 11 }}
                                      mr={1}
                                      color={'#999'}
                                    >
                                      ({title?.length}/60)
                                    </Typography>
                                    <IconButton
                                      className={Style.home_form_icon}
                                      size={'small'}
                                      onClick={() => {
                                        resetField('title');
                                      }}
                                    >
                                      <FaTrashAlt />
                                    </IconButton>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      mb={2}
                      sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        lineHeight: '140%',
                        color: color_title,
                      }}
                    >
                      {staticData.form.text.banner}
                    </Typography>
                    <Box sx={{ width: '100%', minHeight: 64 }}>
                      <TextField
                        {...register('img', {
                          onChange: event => {
                            fileSizeFile(event);
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
                        InputLabelProps={{
                          color: 'secondary',
                        }}
                        InputProps={{
                          color: 'secondary',
                          endAdornment: (
                            <InputAdornment position="end">
                              {img && img.length ? (
                                <Typography
                                  sx={{ fontSize: 11 }}
                                  mr={1}
                                  color={'#999'}
                                >
                                  ({size})
                                </Typography>
                              ) : (
                                <></>
                              )}
                              {img && img.length ? (
                                <IconButton
                                  className={Style.home_form_icon}
                                  size={'small'}
                                  onClick={clearable}
                                >
                                  <FaTrashAlt />
                                </IconButton>
                              ) : (
                                <></>
                              )}
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& input': {
                            fontSize: 14,
                            color: color_title,
                            paddingTop: '8.5px',
                            paddingBottom: '8.5px',
                            minHeight: '23px',
                          },
                        }}
                        fullWidth
                        type={'file'}
                        required={false}
                        color={'warning'}
                        size={'small'}
                        variant={'outlined'}
                        helperText={'' || errors?.img?.message?.toString()}
                        error={!!errors.img}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        lineHeight: '140%',
                        color: color_title,
                      }}
                      mb={2}
                    >
                      {staticData.form.text.alt}
                    </Typography>
                    <Box
                      sx={{ width: '100%', minHeight: 64 }}
                      display={'flex'}
                      justifyContent={'center'}
                      flexDirection={'row'}
                    >
                      <>
                        <TextField
                          {...register('alt')}
                          InputLabelProps={{
                            color: 'secondary',
                          }}
                          sx={{
                            '& label': {
                              fontSize: 14,
                              color: color_title,
                            },
                          }}
                          fullWidth
                          label={staticData.form.text.label}
                          size={'small'}
                          variant={'outlined'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          helperText={errors?.alt?.message}
                          error={!!errors?.alt}
                          defaultChecked={false}
                          defaultValue={null}
                          InputProps={{
                            color: 'secondary',
                            endAdornment: (
                              <InputAdornment position="end">
                                {alt && alt?.length ? (
                                  <>
                                    <Typography
                                      sx={{ fontSize: 11 }}
                                      mr={1}
                                      color={'#999'}
                                    >
                                      ({alt?.length}/60)
                                    </Typography>
                                    <IconButton
                                      className={Style.home_form_icon}
                                      size={'small'}
                                      onClick={() => {
                                        resetField('alt');
                                      }}
                                    >
                                      <FaTrashAlt />
                                    </IconButton>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container direction={'column'} padding={2}>
                  <Grid item>
                    <Box className={Style.text_editor_container}>
                      <Grid container direction={'row'} spacing={2}>
                        <Grid item xs={6}>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '18px',
                              lineHeight: '140%',
                              color: color_title,
                            }}
                            mb={2}
                          >
                            {staticData.form.text.address}
                          </Typography>
                          <Box
                            sx={{ width: '100%', minHeight: 64 }}
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'row'}
                          >
                            <>
                              <TextField
                                {...register('address')}
                                InputLabelProps={{
                                  color: 'secondary',
                                }}
                                sx={{
                                  '& label': {
                                    fontSize: 14,
                                    color: color_title,
                                  },
                                }}
                                fullWidth
                                label={staticData.form.text.label}
                                size={'small'}
                                variant={'outlined'}
                                FormHelperTextProps={{
                                  color: '#256223',
                                }}
                                helperText={errors?.address?.message}
                                error={!!errors?.address}
                                defaultChecked={false}
                                defaultValue={null}
                                InputProps={{
                                  color: 'secondary',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {address && address?.length ? (
                                        <>
                                          <Typography
                                            sx={{ fontSize: 11 }}
                                            mr={1}
                                            color={'#999'}
                                          >
                                            ({address?.length}/60)
                                          </Typography>
                                          <IconButton
                                            className={Style.home_form_icon}
                                            size={'small'}
                                            onClick={() => {
                                              resetField('address');
                                            }}
                                          >
                                            <FaTrashAlt />
                                          </IconButton>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '18px',
                              lineHeight: '140%',
                              color: color_title,
                            }}
                            mb={2}
                          >
                            {staticData.form.text.email}
                          </Typography>
                          <Box
                            sx={{ width: '100%', minHeight: 64 }}
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'row'}
                          >
                            <>
                              <TextField
                                {...register('email')}
                                InputLabelProps={{
                                  color: 'secondary',
                                }}
                                sx={{
                                  '& label': {
                                    fontSize: 14,
                                    color: color_title,
                                  },
                                }}
                                fullWidth
                                label={staticData.form.text.label}
                                size={'small'}
                                type="email"
                                variant={'outlined'}
                                FormHelperTextProps={{
                                  color: '#256223',
                                }}
                                helperText={
                                  errors?.email
                                    ? staticData.form.errors.email_formats
                                    : ''
                                }
                                error={!!errors?.email}
                                defaultChecked={false}
                                defaultValue={null}
                                InputProps={{
                                  color: 'secondary',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {email && email?.length ? (
                                        <>
                                          <Typography
                                            sx={{ fontSize: 11 }}
                                            mr={1}
                                            color={'#999'}
                                          >
                                            ({email?.length}/60)
                                          </Typography>
                                          <IconButton
                                            className={Style.home_form_icon}
                                            size={'small'}
                                            onClick={() => {
                                              resetField('email');
                                            }}
                                          >
                                            <FaTrashAlt />
                                          </IconButton>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '18px',
                              lineHeight: '140%',
                              color: color_title,
                            }}
                            mb={2}
                          >
                            {staticData.form.text.phone}
                          </Typography>
                          <Box
                            sx={{ width: '100%', minHeight: 64 }}
                            display={'flex'}
                            flexDirection={'column'}
                            mb={0.5}
                          >
                            {social &&
                              social.map((el, ind) => (
                                <Box
                                  key={el.id || ind}
                                  width={'100%'}
                                  display={'flex'}
                                  alignItems={'center'}
                                  columnGap={1}
                                >
                                  <Typography
                                    className={Style.contact__phone}
                                    sx={{ marginRight: '16px' }}
                                  >
                                    {el.phone_number}
                                  </Typography>
                                  <FormGroup
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    <FormControlLabel
                                      sx={{ padding: 0 }}
                                      control={
                                        <Checkbox
                                          checked={
                                            el?.viber?.length > 0 ? true : false
                                          }
                                          onChange={ev =>
                                            handleSocialCheck(ev, el.id)
                                          }
                                          name="viber"
                                          size="small"
                                        />
                                      }
                                      label="viber"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            el?.telegram?.length > 0
                                              ? true
                                              : false
                                          }
                                          onChange={ev =>
                                            handleSocialCheck(ev, el.id)
                                          }
                                          name="telegram"
                                          size="small"
                                        />
                                      }
                                      label="telegram"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            el?.whatsup?.length > 0
                                              ? true
                                              : false
                                          }
                                          onChange={ev =>
                                            handleSocialCheck(ev, el.id)
                                          }
                                          name="whatsup"
                                          size="small"
                                        />
                                      }
                                      label="whatsup"
                                    />
                                  </FormGroup>
                                  <IconButton
                                    onClick={() => {
                                      handleDeleteContact(el.id);
                                    }}
                                    color="error"
                                    aria-label="delete"
                                    sx={{ width: '20px', height: '20px' }}
                                  >
                                    <HighlightOffOutlinedIcon />
                                  </IconButton>
                                </Box>
                              ))}
                            <Box
                              width={'100%'}
                              display={'flex'}
                              alignItems={'center'}
                              columnGap={1}
                              mt={1}
                            >
                              <TextField
                                {...register('phone.phone_number')}
                                InputLabelProps={{
                                  color: 'secondary',
                                }}
                                onBlur={event => {
                                  // Викликаємо функцію trim для введеного значення
                                  const trimmedValue =
                                    event.target.value.trim();
                                  setValue('phone.phone_number', trimmedValue);
                                }}
                                sx={{
                                  width: '132px',
                                  minWidth: '132px',
                                  marginRight: '16px',
                                  px: '2px',
                                  '& label': {
                                    fontSize: 14,
                                    color: color_title,
                                  },
                                  '& .MuiFormHelperText-root': {
                                    position: 'absolute',
                                    top: '38px',
                                  },
                                  '& .MuiInputBase-root  .MuiInputBase-input': {
                                    px: '8px',
                                  },
                                }}
                                // fullWidth
                                label={staticData.form.text.label}
                                size={'small'}
                                variant={'outlined'}
                                FormHelperTextProps={{
                                  color: '#256223',
                                }}
                                // helperText={`${staticData.form.errors.email_formats}`}
                                error={!!errors?.phone}
                                defaultChecked={false}
                                defaultValue={null}
                              />
                              <FormGroup
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                <FormControlLabel
                                  sx={{ padding: 0 }}
                                  control={
                                    <Checkbox
                                      {...register('phone.viber')}
                                      onChange={e =>
                                        setValue(
                                          'phone.viber',
                                          e.target.checked
                                            ? phone.phone_number
                                            : '',
                                        )
                                      }
                                      name="viber"
                                      size="small"
                                    />
                                  }
                                  label="viber"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={e =>
                                        setValue(
                                          'phone.telegram',
                                          e.target.checked
                                            ? phone.phone_number
                                            : '',
                                        )
                                      }
                                      name="telegram"
                                      size="small"
                                    />
                                  }
                                  label="telegram"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={e =>
                                        setValue(
                                          'phone.whatsup',
                                          e.target.checked
                                            ? phone.phone_number
                                            : '',
                                        )
                                      }
                                      name="whatsup"
                                      size="small"
                                    />
                                  }
                                  label="whatsup"
                                />
                              </FormGroup>
                              {!errors.phone?.phone_number &&
                                phone?.phone_number && (
                                  <IconButton
                                    onClick={() => {
                                      handleAddContact(phone);
                                    }}
                                    aria-label="add"
                                    sx={{ padding: 0 }}
                                  >
                                    <AiOutlineCheckCircle
                                      color={'green'}
                                      size={24}
                                    />
                                  </IconButton>
                                )}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box>
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '18px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                              mb={2}
                            >
                              {staticData.form.text.schedule}
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={5.5} mb={2}>
                                <Select
                                  {...register('weekdays_time')}
                                  labelId="workday-start-label"
                                  id="workday-start"
                                  value={workDay[0]}
                                  size="small"
                                  onChange={ev => handleChange(ev, 0)}
                                  sx={{ width: '100%' }}
                                  MenuProps={{
                                    disableScrollLock: true,
                                  }}
                                >
                                  {staticData.form.text.workDay.map(
                                    (day, ind) => {
                                      return (
                                        <MenuItem
                                          key={day.shot_name || ind}
                                          id={day.name}
                                          value={day.shot_name}
                                        >
                                          {day.title}
                                        </MenuItem>
                                      );
                                    },
                                  )}
                                </Select>
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                -
                              </Grid>
                              <Grid item xs={5.5}>
                                {workDay[1] && (
                                  <Select
                                    labelId="workday-end-label"
                                    id="workday-end"
                                    value={workDay[1]}
                                    sx={{ width: '100%' }}
                                    onChange={ev => handleChange(ev, 1)}
                                    size="small"
                                    MenuProps={{
                                      disableScrollLock: true,
                                    }}
                                  >
                                    {staticData.form.text.workDay.map(
                                      (day, ind) => {
                                        return (
                                          <MenuItem
                                            key={day.shot_name || ind}
                                            id={day.name}
                                            value={day.shot_name}
                                          >
                                            {day.title}
                                          </MenuItem>
                                        );
                                      },
                                    )}
                                  </Select>
                                )}
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item xs={5.5}>
                                <TimeField
                                  label={staticData.form.text.label}
                                  format="HH:mm"
                                  size="small"
                                  value={workTime[0]}
                                  onChange={newValue =>
                                    handleTimeChange(newValue, 0)
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                -
                              </Grid>
                              <Grid item xs={5.5}>
                                <TimeField
                                  label={staticData.form.text.label}
                                  format="HH:mm"
                                  size="small"
                                  value={workTime[1]}
                                  onChange={newValue =>
                                    handleTimeChange(newValue, 1)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '18px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                              my={2}
                            >
                              {staticData.form.text.lunchtime}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={5.5}>
                                <TimeField
                                  label={staticData.form.text.label}
                                  format="HH:mm"
                                  size="small"
                                  value={lunchTime[0]}
                                  onChange={newValue =>
                                    handleLunchTimeChange(newValue, 0)
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                xs={1}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                -
                              </Grid>
                              <Grid item xs={5.5}>
                                <TimeField
                                  label={staticData.form.text.label}
                                  format="HH:mm"
                                  size="small"
                                  value={lunchTime[1]}
                                  onChange={newValue =>
                                    handleLunchTimeChange(newValue, 1)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Typography
                              sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '18px',
                                lineHeight: '140%',
                                color: color_title,
                              }}
                              my={2}
                            >
                              {staticData.form.text.weekend}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={5.5} mb={2}>
                                <FormControl fullWidth>
                                  {/* <InputLabel id="weekend-multiple-checkbox-label">
                                    {staticData.form.text.weekend}
                                  </InputLabel> */}
                                  <Select
                                    labelId="weekend-multiple-checkbox-label"
                                    id="weekend-multiple-checkbox"
                                    multiple
                                    value={weekendDay}
                                    size="small"
                                    onChange={handleWeekDayChange}
                                    renderValue={selected =>
                                      selected.length > 0
                                        ? selected.join(', ')
                                        : 'no select'
                                    }
                                    MenuProps={{
                                      disableScrollLock: true,
                                      PaperProps: {
                                        style: {
                                          maxHeight:
                                            ITEM_HEIGHT * 4.5 +
                                            ITEM_PADDING_TOP,
                                          width: 250,
                                        },
                                      },
                                    }}
                                  >
                                    {staticData.form.text.workDay.map(
                                      (day, ind) => (
                                        <MenuItem
                                          key={`${day.shot_name}${ind}`}
                                          value={day.shot_name}
                                        >
                                          <Checkbox
                                            checked={
                                              weekendDay.indexOf(
                                                day.shot_name,
                                              ) > -1
                                            }
                                          />
                                          <ListItemText primary={day.title} />
                                        </MenuItem>
                                      ),
                                    )}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                      <Stack spacing={2} direction={'row'}>
                        <Button
                          type={'submit'}
                          sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            fontWeight: 300,
                            fontSize: '16px',
                            lineHeight: '150%',
                            padding: '8px 16px',
                            gap: '4px',
                            height: '40px',
                          }}
                          startIcon={<BiSave />}
                          color={'secondary'}
                          variant={'contained'}
                          disabled={!isValid}
                        >
                          {staticData.form.save_btn.text}
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </form>
      </Box>
    </LocalizationProvider>
  );
};
