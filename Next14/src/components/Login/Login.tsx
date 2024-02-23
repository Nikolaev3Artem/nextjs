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
import { styled } from '@mui/system';
import cn from 'clsx';
// import Cookies from 'js-cookie';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import Logo from '../../../public/logobleck.svg';
import { IProfile, IToken } from '@/interface/IUser';
// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
// import { removToken } from '../../../store/auth/tokenSlice';
// import {
//   useGetTokenMutation,
//   useGetUserQuery,
// } from '../../../store/auth/user.api';
import Style from './Login.module.css';
import { Locale } from '@/i18n.config';
import { loginStaticDataProp } from '@/interface/IStaticData';
import axios from 'axios';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

interface IAuth {
  access_token: string;
  id_token: string;
}

export function Login({
  staticData,
  lang,
}: {
  staticData: loginStaticDataProp;
  lang: Locale;
}) {
  // const { data: session } = useSession()

  // useEffect(() => {
  //     const getTokenFromServer = async () => {
  //         // TODO: handle error when the access token expires
  //         const response = await axios.post(
  //             // DRF backend endpoint, api/social/google/ for example
  //             // this returns accessToken and refresh_token in the form of HTTPOnly cookies
  //             BASE_URL,
  //
  //             {}
  //         )
  //     }
  //     if (session) {
  //         getTokenFromServer()
  //     }
  // }, [session])

  const router = useRouter();
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const [user, setUser] = useState<IProfile[]>([]);
  const [phone, setPhone] = useState('');

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

  //   const [getToken, {}] = useGetTokenMutation();

  let val = {
    email: values.email,
    password: values.password,
  };

  //   const dispatch = useAppDispatch();
  const SignIn = async (event: SyntheticEvent) => {
    event.preventDefault();
    // Cookies.remove('access');
    // const { data: token }: any = await getToken(val);
    // console.log(token)

    // if (token) {
    //   // dispatch(setToken(token))
    //   //   Cookies.set('access', token.access);
    //   // localStorage.setItem("access", token.access)
    //   // localStorage.setItem("refresh", token.refresh)
    //   await router.push('/');
    // }

    try {
      const response = await axios.post<IToken>(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/jwt/create/`,
        {
          headers: {
            'TopContent-Type': 'application/json',
          },
          email: values.email,
          password: values.password,
        },
      );
      // dispatch(setToken(response.data));
      // dispatch(setTokenRefresh(response.data.refresh))
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      // dispatch(userFetching());
      const { data } = await axios.get<IProfile[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/customer/`,
        {
          headers: {
            'TopContent-Type': 'application/json',
            Authorization: 'Bearer ' + response.data.access,
          },
        },
      );
      // dispatch(userFetchingSuccsess(data));

      router.push(`${lang}/dashboard`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // dispatch(userFetchingErorr(error.message));
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
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
                // size={"small"}
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
  );
}
