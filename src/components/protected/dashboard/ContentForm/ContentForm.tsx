'use client';

import {
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
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
import { IEditorText } from '@/interface/IEditorText';
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
import { dashboardRuleStaticData } from '@/interface/IStaticData';
import { getSession } from '@/lib/auth';

const color_title = grey[800];
export const ContentForm = ({
  staticData,
  lang,
  rout,
}: {
  staticData: dashboardRuleStaticData;
  lang: Locale;
  rout: string;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [res, setRes] = useState<IEditorText>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectLang, setSelectLang } = useLangContext();
  const [size, setSize] = useState<any>(0);
  const [editorData1, setEditorData1] = useState('');
  const [editorData2, setEditorData2] = useState('');

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any>(null);

  const onSubmit = async () => {
    try {
      const session = await getSession();
      if (!session) return null;

      setIsLoading(true);

      const formData = new FormData();
      formData.append('text1', editorData1 || '');
      formData.append('text2', editorData2 || '');
      formData.append('title1', title1 || '');
      formData.append('title2', title2 || '');
      formData.append('main_title', main_title || '');
      formData.append('main_desc', main_desc || '');

      file.length && formData.append('img', file[0] || null);
      let response;

      if (!res) {
        response = await axios.post(
          `${BASE_URL}${selectLang}/api/admin/${rout}/create`,
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
        response = await axios.put(
          `${BASE_URL}/${selectLang}/api/admin/${rout}/update/${res.id}`,
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
    main_title: string | undefined;
    main_desc: string | undefined;
    title1: string | undefined;
    title2: string | undefined;
    text1: string | undefined;
    text2: string | undefined;
    alt: string | undefined;
    file: any;
    id: number;
  }

  const UploadFileSchema = yup.object().shape({
    file: yup
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
    main_title: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    main_desc: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    title1: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    text1: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    title2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    text2: yup.string().max(60, `${staticData.form.errors.title_more60}`),
    alt: yup.string().max(30, `${staticData.form.errors.alt_more30}`),
  });

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${BASE_URL}/${selectLang}/api/${rout}`,
      );

      if (status === 200 && data.count > 0) {
        setRes(data.results[data.count - 1]);
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
      main_title: res?.main_title || '',
      main_desc: res?.main_desc || '',
      title1: res?.title1 || '',
      title2: res?.title2 || '',
      text1: res?.text1 || '',
      text2: res?.text2 || '',
      file: {},
      id: res?.id || 0,
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  const main_title = watch('main_title');
  const main_desc = watch('main_desc');
  const title1 = watch('title1');
  const title2 = watch('title2');
  const text1 = watch('text1');
  const text2 = watch('text2');
  const alt = watch('alt');
  const file = watch('file');

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
    resetField('file');
  };
  return (
    <>
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
                    alt={alt || res?.main_title || ''}
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
                  {main_title || (res && res?.main_title)}
                </Typography>
                <Typography className={Style.home_form_subtitle}>
                  {main_desc || (res && res?.main_desc)}
                </Typography>

                <Grid
                  container
                  bgcolor={'white'}
                  mb={1}
                  borderRadius={0.5}
                  p={1}
                  mr={'auto'}
                >
                  <Grid item xs={8} mb={1}>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {title1 || (res && res?.title1)}
                    </Typography>

                    <Box
                      className={Style.rule_text_content}
                      fontSize={16}
                      color={'darkslategray'}
                      component={'p'}
                      dangerouslySetInnerHTML={{
                        __html: editorData1 || res?.text1 || text1 || '',
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      className={Style.home_form_text_title}
                      fontWeight={'700'}
                      variant="body1"
                    >
                      {title2 || (res && res?.title2)}
                    </Typography>
                    <Box
                      className={Style.rule_text_content}
                      fontSize={16}
                      color={'darkslategray'}
                      dangerouslySetInnerHTML={{
                        __html: editorData2 || text2 || res?.text2 || '',
                      }}
                    />
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
                          {...register('main_title')}
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
                          value={main_title}
                          variant={'outlined'}
                          FormHelperTextProps={{
                            color: '#256223',
                          }}
                          helperText={errors?.main_title?.message}
                          error={!!errors?.main_title}
                          defaultChecked={false}
                          InputProps={{
                            color: 'secondary',
                            endAdornment: (
                              <InputAdornment position="end">
                                {main_title && main_title.length ? (
                                  <>
                                    <Typography
                                      sx={{ fontSize: 11 }}
                                      mr={1}
                                      color={'#999'}
                                    >
                                      ({main_title?.length}/60)
                                    </Typography>
                                    <IconButton
                                      className={Style.home_form_icon}
                                      size={'small'}
                                      onClick={() => {
                                        resetField('main_title');
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
                      {staticData.form.text.description}
                    </Typography>
                    <Box
                      sx={{ width: '100%', minHeight: 64 }}
                      display={'flex'}
                      justifyContent={'center'}
                      flexDirection={'row'}
                    >
                      <>
                        <TextField
                          {...register('main_desc')}
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
                          helperText={errors?.main_desc?.message}
                          error={!!errors?.main_desc}
                          defaultChecked={false}
                          defaultValue={null}
                          InputProps={{
                            color: 'secondary',
                            endAdornment: (
                              <InputAdornment position="end">
                                {main_desc && main_desc.length ? (
                                  <>
                                    <Typography
                                      sx={{ fontSize: 11 }}
                                      mr={1}
                                      color={'#999'}
                                    >
                                      ({main_desc?.length}/60)
                                    </Typography>
                                    <IconButton
                                      className={Style.home_form_icon}
                                      size={'small'}
                                      onClick={() => {
                                        resetField('main_desc');
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
                  <Grid item width={'100%'} xl={6}>
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
                        {...register('file', {
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
                              {file && file.length ? (
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
                              {file && file.length ? (
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
                        helperText={'' || errors?.file?.message?.toString()}
                        error={!!errors.file}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container direction={'column'} padding={2}>
                  <Grid item>
                    <Box className={Style.text_editor_container}>
                      <Grid container direction={'row'} spacing={2}>
                        <Grid item width={'100%'} mb={4} xl={6}>
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
                            {staticData.form.text.title1}
                          </Typography>
                          <Box
                            sx={{ width: '100%', minHeight: 64 }}
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'row'}
                          >
                            <>
                              <TextField
                                {...register('title1')}
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
                                helperText={errors?.title1?.message}
                                error={!!errors?.title1}
                                defaultChecked={false}
                                defaultValue={null}
                                InputProps={{
                                  color: 'secondary',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {title1 && title1?.length ? (
                                        <>
                                          <Typography
                                            sx={{ fontSize: 11 }}
                                            mr={1}
                                            color={'#999'}
                                          >
                                            ({title1?.length}/60)
                                          </Typography>
                                          <IconButton
                                            className={Style.home_form_icon}
                                            size={'small'}
                                            onClick={() => {
                                              resetField('title1');
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
                          {res && (
                            <TextEditor
                              data={1}
                              titleOne={staticData.form.text.text1}
                              res={res}
                              setEditorData={setEditorData1}
                              lang={lang}
                              label={staticData.form.text.label}
                            />
                          )}
                        </Grid>
                        <Grid item width={'100%'} mb={4} xl={6}>
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
                            {staticData.form.text.title2}
                          </Typography>
                          <Box
                            sx={{ width: '100%', minHeight: 64 }}
                            display={'flex'}
                            justifyContent={'center'}
                            flexDirection={'row'}
                          >
                            <>
                              <TextField
                                {...register('title2')}
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
                                helperText={errors?.title2?.message}
                                error={!!errors?.title2}
                                defaultChecked={false}
                                defaultValue={null}
                                InputProps={{
                                  color: 'secondary',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {title2 && title2?.length ? (
                                        <>
                                          <Typography
                                            sx={{ fontSize: 11 }}
                                            mr={1}
                                            color={'#999'}
                                          >
                                            ({title2?.length}/60)
                                          </Typography>
                                          <IconButton
                                            className={Style.home_form_icon}
                                            size={'small'}
                                            onClick={() => {
                                              resetField('title2');
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
                          {res && (
                            <TextEditor
                              data={2}
                              titleTwo={staticData.form.text.text2}
                              res={res}
                              setEditorData={setEditorData2}
                              lang={lang}
                              label={staticData.form.text.label}
                            />
                          )}
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
                          disabled={!isValid || !isDirty}
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
    </>
  );
};
