'use client';

import { yupResolver } from '@hookform/resolvers/yup';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { CircularProgress, Fade, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { filesize } from 'filesize';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import * as yup from 'yup';

import { IBanner } from '../../../../interface/IBanner';
import theme from '../../../../theme';
import Style from './fomrhomedashboard.module.css';
import { Locale } from '@/i18n.config';

const color_title = grey[800];
interface IBannerProps {
  res?: IBanner[];
  // lang: string
}

interface IFormInput {
  h1: string | undefined;
  description: string | undefined;
  alt: string | undefined;
  file: any;
}

const UploadFileSchema = yup.object().shape({
  file: yup
    .mixed()
    .test(
      'FileSize',
      'Файл не має бути не більшим ніж (5 MB)',
      (value: any) => {
        if (value.length) {
          return value && value[0]?.size <= 5242880;
        } else {
          return {};
        }
      },
    )
    .test(
      'Type',
      'Підтримуються лише такі формати: .jpeg, .jpg, .png, .webp',
      (value: any) => {
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
      },
    ),
  h1: yup.string().max(60, 'Заголовок не має містити більше ніж 60 символів'),
  description: yup
    .string()
    .max(60, 'Текст не має містити більше ніж 60 символів'),
  alt: yup.string().max(30, 'ALT не має містити більше ніж 30 символів'),
});

export const Form = ({ lang }: { lang: Locale }) => {
  console.log('ff', lang);
  const BASE_URL: string | undefined = process.env.REACT_APP_URL;
  const { enqueueSnackbar } = useSnackbar();

  const [size, setSize] = useState<any>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [res, setRes] = useState<IBanner[]>([]);

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({
    defaultValues: { h1: '', description: '', alt: '', file: {} },
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (!res) return;

    // let lang = localStorage.getItem("lang")
    setIsLoading(true);
    const formData = new FormData();
    formData.append('h1', data.h1 || '');
    formData.append('alt', data.alt || '');
    formData.append('is_active', 'true');

    data.file.length && formData.append('img', data.file[0] || null);

    formData.append('description', data.description || '');
    const response = await axios.put(
      `${BASE_URL}/${lang}/api/main/update/${res[0].id}`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + getCookie('access'),
          'Content-Type':
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
      },
    );
    reset();
    await getBanner();
    if (response.status === 200) {
      setTimeout(() => {
        setIsLoading(false);
        enqueueSnackbar('Ваші зміни збережені', { variant: 'success' });
      }, 1500);
    }
  };

  const h1 = watch('h1');
  const description = watch('description');
  const alt = watch('alt');
  const file = watch('file');

  const fileSizeFile = (event: any) => {
    if (event.target?.files[0] !== undefined) {
      setSize(
        filesize(event.target?.files[0]?.size, { base: 2, standard: 'jedec' }),
      );
    } else {
      clearable();
    }
  };

  const clearable = () => {
    setImagePreviewUrl(res[0].img);
    resetField('file');
  };

  const getBanner = useCallback(async () => {
    try {
      const { data } = await axios.get<IBanner[]>(
        `${BASE_URL}/${lang}/api/main`,
      );
      setRes(data);
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
    getBanner().catch(console.error);
  }, [getBanner]);

  return (
    <>
      <Box
        className={Style.home_form}
        pb={4}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
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
          Попередній перегляд
        </Typography>

        <Container
          maxWidth={false}
          className={Style.home_form_content}
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
                  {imagePreviewUrl || res[0] ? (
                    <Image
                      style={{
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                      src={imagePreviewUrl || res[0]?.img}
                      alt={alt || res[0]?.alt || ''}
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
            <Box className={Style.home_form_content_position}>
              <Box className={Style.home_form_content_title}>
                <Typography className={Style.home_form_title}>
                  {h1 || (res && res[0]?.h1)}
                </Typography>
                <Typography className={Style.home_form_subtitle}>
                  {description || (res && res[0]?.description)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box className={Style.home_form_content_position_circular}>
              <Box className={Style.home_form_content_circular}>
                <CircularProgress color={'secondary'} />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      <Stack sx={{ width: '100%' }} direction={'column'} spacing={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction={'row'} spacing={8}>
            <Grid item md={6}>
              <Box mb={2}>
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
                  Заголовок першого рівня H1
                </Typography>
                <Box
                  sx={{ width: '100%', minHeight: 64 }}
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                >
                  <>
                    <TextField
                      {...register('h1')}
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
                      label="Введіть текст"
                      size={'small'}
                      variant={'outlined'}
                      FormHelperTextProps={{
                        color: '#256223',
                      }}
                      helperText={errors?.h1?.message}
                      error={!!errors?.h1}
                      defaultChecked={false}
                      defaultValue={null}
                      InputProps={{
                        color: 'secondary',
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     {h1 && h1.length ? (
                        //       <>
                        //         <Typography
                        //           sx={{ fontSize: 11 }}
                        //           mr={1}
                        //           color={'#999'}
                        //         >
                        //           ({h1?.length}/60)
                        //         </Typography>
                        //         <IconButton
                        //           className={Style.home_form_icon}
                        //           size={'small'}
                        //           onClick={() => {
                        //             resetField('h1');
                        //           }}
                        //         >
                        //           <FaTrashAlt />
                        //         </IconButton>
                        //       </>
                        //     ) : (
                        //       <></>
                        //     )}
                        //   </InputAdornment>
                        // ),
                      }}
                    />
                  </>
                </Box>
              </Box>
              <Box mb={2}>
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
                  Заголовок додатковий текст
                </Typography>
                <Box sx={{ width: '100%', minHeight: 64 }}>
                  <TextField
                    {...register('description')}
                    InputLabelProps={{
                      color: 'secondary',
                    }}
                    InputProps={{
                      color: 'secondary',
                      //   endAdornment: (
                      //     // <InputAdornment position="end">
                      //     //   {description && description.length ? (
                      //     //     <>
                      //     //       <Typography
                      //     //         sx={{ fontSize: 11 }}
                      //     //         mr={1}
                      //     //         color={'#999'}
                      //     //       >
                      //     //         ({description?.length}/60)
                      //     //       </Typography>
                      //     //       <IconButton
                      //     //         className={Style.home_form_icon}
                      //     //         size={'small'}
                      //     //         onClick={() => {
                      //     //           resetField('description');
                      //     //         }}
                      //     //       >
                      //     //         <FaTrashAlt />
                      //     //       </IconButton>
                      //     //     </>
                      //     //   ) : (
                      //     //     <></>
                      //     //   )}
                      //     // </InputAdornment>
                      //   ),
                    }}
                    sx={{
                      '& label': {
                        fontSize: 14,
                        color: color_title,
                      },
                    }}
                    fullWidth
                    label="Введіть текст"
                    size={'small'}
                    variant={'outlined'}
                    defaultValue={''}
                    helperText={errors?.description?.message}
                    error={!!errors?.description}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box mb={2}>
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
                  Додатковий текст (alt)
                </Typography>
                <Box sx={{ width: '100%', minHeight: 64 }}>
                  <TextField
                    {...register('alt')}
                    InputLabelProps={{
                      color: 'secondary',
                    }}
                    InputProps={{
                      color: 'secondary',
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {alt && alt.length ? (
                      //         <InputAdornment>
                      //           <Typography
                      //             sx={{ fontSize: 11 }}
                      //             mr={1}
                      //             color={'#999'}
                      //           >
                      //             ({alt?.length}/30)
                      //           </Typography>
                      //           <IconButton
                      //             className={Style.home_form_icon}
                      //             size={'small'}
                      //             onClick={() => {
                      //               resetField('alt');
                      //             }}
                      //           >
                      //             <FaTrashAlt />
                      //           </IconButton>
                      //         </>
                      //       ) : (
                      //         <></>
                      //       )}
                      //     </InputAdornment>
                      //   ),
                    }}
                    sx={{
                      '& label': {
                        fontSize: 14,
                        color: color_title,
                      },
                    }}
                    fullWidth
                    label="Введіть текст"
                    size={'small'}
                    variant={'outlined'}
                    helperText={errors?.alt?.message}
                    error={!!errors?.alt}
                  />
                </Box>
              </Box>
              <Box>
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
                  Банер заднього плану
                </Typography>

                <Box sx={{ width: '100%', minHeight: 64 }}>
                  <TextField
                    {...register('file', {
                      onChange: event => {
                        fileSizeFile(event);
                        if (event.target?.files[0] !== undefined) {
                          setImagePreviewUrl(
                            window.URL.createObjectURL(event.target?.files[0]),
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
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {file && file.length ? (
                      //         <Typography
                      //           sx={{ fontSize: 11 }}
                      //           mr={1}
                      //           color={'#999'}
                      //         >
                      //           ({size})
                      //         </Typography>
                      //       ) : (
                      //         <></>
                      //       )}
                      //       {file && file.length ? (
                      //         <IconButton
                      //           className={Style.home_form_icon}
                      //           size={'small'}
                      //           onClick={clearable}
                      //         >
                      //           <FaTrashAlt />
                      //         </IconButton>
                      //       ) : (
                      //         <></>
                      //       )}
                      //     </InputAdornment>
                      //   ),
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
                    helperText={'' || errors?.file?.message?.toString()}
                    error={!!errors.file}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button
              disabled={!isDirty || !isValid}
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
              Зберегти
            </Button>
          </Box>
        </form>
      </Stack>
    </>
  );
};
