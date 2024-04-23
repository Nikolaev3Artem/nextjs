import { JourneySeatsBookingModal } from '@/components/published/Main/JourneySeatsBookingModal';

import { IJourney, StopsProps } from '@/interface/IJourney';
import {
  dashboardCityStaticData,
  MainStaticDataProps,
} from '@/interface/IStaticData';
import { grey } from '@mui/material/colors';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { IoMdArrowForward } from 'react-icons/io';
import { BiSave } from 'react-icons/bi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import dayjs from 'dayjs';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import { useEffect, useState } from 'react';
import theme from '@/theme';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { styled } from '@mui/material/styles';
import BusConstructor from '@/components/protected/dashboard/Bus/BusConstructor/BusConstructor';
import { EditCityModal } from '../EditCityModal';
import { useForm } from 'react-hook-form';
import { getSession } from '@/lib/auth';
import axios from 'axios';
import { useLangContext } from '@/app/context';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const color_title = grey[800];

export const AddCity = ({
  onClose,
  isShowModal,
  staticData,
  lang,
}: {
  onClose: () => void;
  isShowModal: boolean;
  staticData: dashboardCityStaticData;
  lang: Locale;
}) => {
  const { selectLang } = useLangContext();
  const rout = useRouter();
  const cityRegex = /^[^%$?{}]+$/;
  const locationRegex = /^[\d.,]+$/;
  const UploadFileSchema = yup.object().shape({
    city: yup
      .string()
      .trim()
      .max(30, `${staticData.errors.name_more30}`)
      .matches(cityRegex, `${staticData.errors.error_text}`),
    id: yup
      .number()
      .integer(staticData.errors.error_number)
      .positive(staticData.errors.error_number),

    address: yup.string().max(60, `${staticData.errors.name_more30}`),
    cooords_y: yup
      .string()
      .trim()
      .max(40, `${staticData.errors.name_more30}`)
      .matches(locationRegex, `${staticData.errors.error_text}`),
    coords_x: yup
      .string()
      .trim()
      .max(40, `${staticData.errors.name_more30}`)
      .matches(locationRegex, `${staticData.errors.error_text}`),
  });

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
  } = useForm<StopsProps>({
    defaultValues: {
      city: '',
      id: undefined,
      address: '',
      cooords_y: '',
      coords_x: '',
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  const city = watch('city');
  const id = watch('id');
  const coords_x = watch('coords_x');
  const cooords_y = watch('cooords_y');
  const address = watch('address');
  console.log('city', city);
  async function onSubmitForm(data: StopsProps) {
    try {
      const session = await getSession();
      if (!session) return null;
      const formData = new FormData();

      formData.append('city', data.city.trim() || '');
      formData.append('id', data?.id?.toString() || '');

      formData.append('coords_x', data.coords_x?.trim() || '');

      formData.append('cooords_y', data.cooords_y?.trim() || '');

      formData.append('address', data.address?.trim() || '');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}${selectLang}/api/admin/stop/create`,
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
        enqueueSnackbar(`${staticData.cityTable.snackBar.add_success}`, {
          variant: 'success',
        });
        onClose();
        // rout.push(`/${lang}/dashboard/city/`);
        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.cityTable.snackBar.add_error}`, {
        variant: 'error',
      });
    }
  }

  return (
    <EditCityModal onClose={onClose} isShowModal={isShowModal}>
      <Box>
        <Box
          p={4}
          display={'flex'}
          width={'100%'}
          justifyContent={'flex-start'}
          position={'relative'}
          flexDirection={'column'}
          rowGap={2}
        >
          <IconButton
            onClick={onClose}
            sx={{
              fontSize: '18px',
              position: 'absolute',
              top: 2,
              right: 2,
            }}
          >
            <MdOutlineClose />
          </IconButton>

          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '29px',
              lineHeight: '140%',
              color: color_title,
            }}
          >
            {staticData.new_city}
          </Typography>
          <Box>
            {/* @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <Grid container direction={'row'} spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('city')}
                    fullWidth
                    size={'small'}
                    value={city}
                    label={staticData.cityTable.city}
                    InputLabelProps={{
                      style: { color: '#808080' },
                    }}
                    FormHelperTextProps={{
                      color: '#256223',
                    }}
                    helperText={errors?.city?.message}
                    error={!!errors?.city}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('address')}
                    size={'small'}
                    fullWidth
                    value={address}
                    label={staticData.cityTable.address}
                    InputLabelProps={{
                      style: { color: '#808080' },
                    }}
                    FormHelperTextProps={{
                      color: '#256223',
                    }}
                    helperText={errors?.address?.message}
                    error={!!errors?.address}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    {...register('coords_x')}
                    size={'small'}
                    fullWidth
                    value={coords_x}
                    label={staticData.cityTable.location}
                    InputLabelProps={{
                      style: { color: '#808080' },
                    }}
                    FormHelperTextProps={{
                      color: '#256223',
                    }}
                    helperText={errors?.coords_x?.message}
                    error={!!errors?.coords_x}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register('cooords_y')}
                    size={'small'}
                    fullWidth
                    label={staticData.cityTable.location}
                    InputLabelProps={{
                      style: { color: '#808080' },
                    }}
                    value={cooords_y}
                    FormHelperTextProps={{
                      color: '#256223',
                    }}
                    helperText={errors?.cooords_y?.message}
                    error={!!errors?.cooords_y}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    {staticData.cityTable.save}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </EditCityModal>
  );
};
