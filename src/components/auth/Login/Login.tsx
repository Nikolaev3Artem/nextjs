'use client';

import Container from '@mui/material/Container';

import { Typography } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, Fade } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

import { grey } from '@mui/material/colors';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { useRouter } from 'next/navigation';

import { SyntheticEvent, useState } from 'react';

import Logo from '../../../../public/logobleck.svg';
import { IProfile } from '@/interface/IUser';

import Style from './Login.module.css';
import { Locale } from '@/i18n.config';
import { loginStaticDataProp } from '@/interface/IStaticData';
import axios from 'axios';
import { cookies } from 'next/headers';
import { getSession, login } from '@/lib/auth';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

export function Login({
  staticData,
  lang,
}: {
  staticData: loginStaticDataProp;
  lang: Locale;
}) {
  const router = useRouter();
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const [user, setUser] = useState<IProfile[]>([]);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsloading] = useState(false);

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

  const SignIn = async (event: SyntheticEvent) => {
    setIsloading(true);
    event.preventDefault();
    try {
      const result = await login(values);

      if (result === 200) {
        enqueueSnackbar(`${staticData.snack_bar.success}`, {
          variant: 'success',
        });
        const currentPath = window.location.pathname;
        const previousPath = document.referrer;

        if (currentPath === previousPath) {
          router.replace('/');
        } else {
          router.back();
        }
      }
      if (result !== 200) {
        enqueueSnackbar(`${staticData.snack_bar.error}`, {
          variant: 'error',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(`${staticData.snack_bar.error}`, {
          variant: 'error',
        });
        console.log('error message: ', error.message);
        return error.message;
      } else {
        enqueueSnackbar(`${staticData.snack_bar.error}`, {
          variant: 'error',
        });
        console.log('unexpected error: ');
        return 'An unexpected error occurred';
      }
    } finally {
      setIsloading(false);
    }
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const SignInPhone = (event: any) => {
    event.preventDefault();
    console.log(phone);
  };
  return (
    <>
      <SnackbarProvider />
      <Fade in>
        <Container maxWidth="xs" disableGutters>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className={Style.login__content}
          >
            <Link href={`/${lang}`}>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'transparent',
                  width: '100px',
                  height: '100px',
                }}
              >
                <Logo width={100} height={100} />
              </Avatar>
            </Link>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography
                sx={{ color: grey[700], fontSize: 16 }}
                my={2}
                className={Style.login__text}
              >
                {staticData.login_email}
              </Typography>
              <TextField
                sx={{ my: 1 }}
                required
                fullWidth
                id="email"
                label={staticData.email}
                value={values.email}
                onChange={handleChange('email')}
                name="email"
                variant="outlined"
                autoFocus
              />
              <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {staticData.pass}
                </InputLabel>

                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label={staticData.pass}
                />
              </FormControl>
              <Button
                color={'secondary'}
                sx={{
                  my: 1,
                  mb: 1,
                  height: '50px',
                  textTransform: 'none',
                }}
                size="large"
                variant="contained"
                onClick={SignIn}
                fullWidth
                disabled={isLoading}
              >
                {staticData.sign_in}
              </Button>
              <Box className={Style.login__forgot}>
                <Link href="#">{staticData.forgot_pass}</Link>
              </Box>
              <Divider />

              <div className={Style.login__registration}>
                <Link href={`/${lang}/auth/registration`}>
                  {staticData.reg_link}
                </Link>
              </div>
            </Box>
          </Box>
        </Container>
      </Fade>
    </>
  );
}
