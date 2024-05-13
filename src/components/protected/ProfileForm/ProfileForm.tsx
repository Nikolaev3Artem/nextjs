'use client';

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';

import { Locale } from '@/i18n.config';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import * as yup from 'yup';

import FormControl from '@mui/material/FormControl';
import { BiSave } from 'react-icons/bi';
import { profileStaticData } from '@/interface/IStaticData';
import { SyntheticEvent, useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataPicker } from '@/components/common/DataPicker';
import axios from 'axios';
import Style from '@/app/[lang]/(protected)/profile/profile.module.css';
import { IProfile, IUser } from '@/interface/IUser';

import { getSession } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

interface State {
  email: string;
  phone: string;
  name: string;
  surname: string;
  password: string;
  showPassword: boolean;
  patronymic: string;
  birthday: string;
  login: string;
}

export const ProfileForm = ({
  staticData,
  lang,
  userData,
}: {
  staticData: profileStaticData;
  lang: Locale;
  userData: IProfile | null | undefined;
}) => {
  const [values, setValues] = useState<any>({
    date: '',
  });

  useEffect(() => {}, [values.birthday]);
  const nameRegex = /^[^%$?{}]+$/;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const UploadFileSchema = yup.object().shape({
    phone: yup
      .string()
      .notRequired()
      .matches(phoneRegex, `${staticData.errors.format_error}`),
    email: yup
      .string()
      .notRequired()
      .matches(emailRegex, `${staticData.errors.format_error}`),
    name: yup.string().matches(nameRegex, `${staticData.errors.format_error}`),
    surname: yup
      .string()
      .matches(nameRegex, `${staticData.errors.format_error}`),
    patronymic: yup
      .string()
      .matches(nameRegex, `${staticData.errors.format_error}`),
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

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
  } = useForm<State>({
    defaultValues: {
      email: userData?.email || '',
      name: userData?.first_name || '',
      password: '',
      surname: userData?.last_name || '',
      phone: userData?.phone || '',
      patronymic: userData?.third_name || '',
      birthday: userData?.birth_date || '',
      login: '',
      showPassword: false,
    },
    // @ts-ignore
    resolver: yupResolver(UploadFileSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('birthday', values.date);
  }, [values.date]);

  const email = watch('email');
  const name = watch('name');
  const password = watch('password');
  const surname = watch('surname');
  const phone = watch('phone');
  const patronymic = watch('patronymic');
  const birthday = watch('birthday');
  const login = watch('login');

  const onSubmitForm = async (data: State) => {
    try {
      const session = await getSession();
      if (!session) return null;
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/users/${userData?.id}`,

        {
          first_name: name || '',
          last_name: surname || '',
          third_name: patronymic || '',
          email: email || '',
          phone: phone || '',
          birth_date: birthday || '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + `${session.access}`,
          },
        },
      );

      if (result.status === 200) {
        enqueueSnackbar(`${staticData.snackBar.success}`, {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(`${staticData.snackBar.error}`, {
          variant: 'error',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        enqueueSnackbar(`${staticData.snackBar.error}`, {
          variant: 'error',
        });
        // return error.message;
      } else {
        console.log('unexpected error: ');
        enqueueSnackbar(`${staticData.snackBar.error}`, {
          variant: 'error',
        });
        return 'An unexpected error occurred';
      }
    }
  };

  return (
    <>
      <SnackbarProvider />
      {/* @ts-ignore */}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid
          sx={{ mt: 1, p: 0, pr: 2, pb: 2, ml: 0 }}
          container
          spacing={2}
          bgcolor={'white'}
          className={Style.content}
        >
          <Grid item xs={6}>
            <TextField
              {...register('name')}
              sx={{ my: 1, position: 'relative' }}
              required
              fullWidth
              id="name"
              label={staticData.form.name}
              value={name}
              name="name"
              variant="outlined"
              helperText={errors?.name?.message}
              error={!!errors?.name}
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  left: 0,
                  bottom: '-17px',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
            />
            <TextField
              sx={{ my: 1, position: 'relative' }}
              {...register('surname')}
              required
              fullWidth
              id="surname"
              label={staticData.form.surname}
              value={surname}
              name="surname"
              variant="outlined"
              helperText={errors?.surname?.message}
              error={!!errors?.surname}
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  left: 0,
                  bottom: '-17px',
                },
              }}
            />
            <TextField
              {...register('patronymic')}
              sx={{
                my: 1,
                position: 'relative',
                visibility: staticData.form.patronymic ? 'visible' : 'hidden',
              }}
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
              fullWidth
              id="patronymic"
              label={staticData.form.patronymic}
              value={patronymic}
              helperText={errors?.patronymic?.message}
              error={!!errors?.patronymic}
              name="patronymic"
              variant="outlined"
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  left: 0,
                  bottom: '-17px',
                },
              }}
            />
            <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ color: '#808080' }}
              >
                {staticData.form.password}
              </InputLabel>

              <OutlinedInput
                // size={"small"}
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={password}
                {...register('password')}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={staticData.form.password}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              sx={{ my: 1, position: 'relative' }}
              required
              fullWidth
              {...register('phone')}
              id="phone"
              label={staticData.form.phone}
              value={phone}
              name="phone"
              variant="outlined"
              helperText={errors?.phone?.message}
              error={!!errors?.phone}
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  left: 0,
                  bottom: '-17px',
                },
              }}
            />
            <TextField
              sx={{ my: 1, position: 'relative' }}
              required
              fullWidth
              {...register('email')}
              id="email"
              label={staticData.form.email}
              value={email}
              helperText={errors?.email?.message}
              error={!!errors?.email}
              name="email"
              variant="outlined"
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
              FormHelperTextProps={{
                sx: {
                  position: 'absolute',
                  left: 0,
                  bottom: '-17px',
                },
              }}
            />
            <Grid item sx={{ my: 1 }}>
              <DataPicker
                staticData={staticData.form.birthday}
                lang={lang}
                setValues={setValues}
                values={values}
                minOff
              />
            </Grid>
            <TextField
              sx={{ my: 1 }}
              // required
              fullWidth
              {...register('login')}
              id="login"
              label={staticData.form.login}
              value={login}
              // onChange={handleChange('login')}
              name="login"
              variant="outlined"
              InputLabelProps={{
                sx: {
                  color: '#808080',
                },
              }}
            />
          </Grid>

          <Button
            color={'secondary'}
            sx={{
              mt: 1,
              ml: { xs: '16px', md: 'auto' },
              height: '50px',
              textTransform: 'none',
              width: { xs: '100%', md: 'fit-content' },
              minWidth: '156px',
            }}
            size="large"
            variant="contained"
            disabled={!isDirty || !isValid}
            type={'submit'}
            startIcon={<BiSave />}
          >
            {staticData.button.save.title}
          </Button>
        </Grid>
      </form>
    </>
  );
};
