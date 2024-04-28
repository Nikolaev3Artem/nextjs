'use client';

import {
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import * as yup from 'yup';
import { filesize } from 'filesize';
import { IContactText, IEditorText } from '@/interface/IEditorText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaTrashAlt } from 'react-icons/fa';
import { enqueueSnackbar } from 'notistack';

// import { setAccordionClose } from '../../../../store/admin/accordion/accordionOpenSlice';
// import { useAppDispatch, useAppSelector } from '../../../../store/auth/redux';
import theme from '@/theme';
// import { onSubmitForm } from '../../../../utils/onSubmit';
import Rule from '@/components/protected/dashboard/Rule/Rule';
import TextEditor from '@/components/protected/dashboard/TextEditor/TextEditor';
import CustomAccordion from '@/components/protected/dashboard/Accordion/CustomAccordion';
import CustomButtonAccordion from '@/components/protected/dashboard/Accordion/CustomButtonAccordion';
import Style from './ruleform.module.css';
import { useLangContext } from '@/app/context';
import Image from 'next/image';
import { Locale } from '@/i18n.config';
import {
  dashboardContactsStaticData,
  dashboardRuleStaticData,
} from '@/interface/IStaticData';
import { getSession } from '@/lib/auth';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const color_title = grey[800];
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectLang, setSelectLang } = useLangContext();
  const [size, setSize] = useState<any>(0);
  const [workTime, setWorkTime] = useState<Dayjs[]>(() => []);
  const [workDay, setWorkDay] = useState<string[]>(() => ['mo', 'mo']);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any>(null);

  const onSubmit = async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      setIsLoading(true);

      const formData = new FormData();

      const weekdays_time_string = `${dayjs(workTime[0]).format('HH:mm')} - ${dayjs(workTime[1]).format('HH:mm')}`;

      formData.append('text', text || '');
      formData.append('text2', text2 || '');
      formData.append('title', title || '');
      formData.append('alt', alt || '');
      formData.append('icon', selectLang || '');
      formData.append('address', address || '');

      formData.append('email', email || '');
      formData.append('weekdays_work', weekdays_work || '');

      formData.append(
        'weekdays_time',
        weekdays_time_string || res?.weekdays_time || '',
      );
      formData.append('weekends', weekends || '');
      formData.append('lunch_time', lunch_time || '');

      img.length && formData.append('img', img[0] || null);
      let response;

      if (!res) {
        console.log('post');
        response = await axios.post(
          `${BASE_URL}${selectLang}/api/admin/${rout}/create/`,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + session.access,
              'Content-Type':
                'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
          },
        );
      } else {
        console.log('update', res.id);
        response = await axios.put(
          `${BASE_URL}/${selectLang}/api/admin/${rout}/update/${res.id}/`,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + session.access,
              'Content-Type':
                'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
          },
        );
      }
      reset();
      await getData();
      if (response?.status === 200) {
        setTimeout(() => {
          enqueueSnackbar(`${staticData.snackBar.success}`, {
            variant: 'success',
          });
        }, 1500);
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
  }

  const UploadFileSchema = yup.object().shape({
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
    // title2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    text2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    alt: yup.string().max(30, `${staticData.form.errors.alt_more30}`),
  });

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/${selectLang}/api/contacts/`,
      );
      console.log(data);
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

  const {
    register,
    handleSubmit,
    reset,
    resetField,
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

  const handleChange = (event: SelectChangeEvent, ind: number) => {
    const updatedWorkDay = [...workDay];
    updatedWorkDay[ind] = event.target.value;
    setWorkDay(updatedWorkDay);
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
                    src={imagePreviewUrl || res?.img}
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
                      {weekdays_work || (res && res?.weekdays_work)}
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
                      {lunch_time || (res && res?.lunch_time)}
                    </Typography>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {weekends || (res && res?.weekends)}
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
                          defaultValue={null}
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
                          {/* <TextEditor
                            data={1}
                            // titleOne={staticData.form.text.text1}
                            res={res}
                            setEditorData={setEditorData1}
                            lang={lang}
                            label={staticData.form.text.label}
                          /> */}
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
                                variant={'outlined'}
                                FormHelperTextProps={{
                                  color: '#256223',
                                }}
                                helperText={errors?.email?.message}
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
                          {/* <Box
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
                                variant={'outlined'}
                                FormHelperTextProps={{
                                  color: '#256223',
                                }}
                                helperText={errors?.email?.message}
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
                          </Box> */}
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
                                  labelId="workday-start-label"
                                  id="workday-start"
                                  value={workDay[0]}
                                  size="small"
                                  onChange={ev => handleChange(ev, 0)}
                                  sx={{ width: '100%' }}
                                >
                                  {staticData.form.text.workDay.map(day => {
                                    return (
                                      <MenuItem
                                        id={day.name}
                                        value={day.shot_name}
                                      >
                                        {day.title}
                                      </MenuItem>
                                    );
                                  })}
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
                                <Select
                                  labelId="workday-end-label"
                                  id="workday-end"
                                  value={workDay[1]}
                                  sx={{ width: '100%' }}
                                  onChange={ev => handleChange(ev, 1)}
                                  size="small"
                                >
                                  {staticData.form.text.workDay.map(day => {
                                    return (
                                      <MenuItem
                                        id={day.name}
                                        value={day.shot_name}
                                      >
                                        {day.title}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
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
