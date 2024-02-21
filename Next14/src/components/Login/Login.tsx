'use client';

import Container from '@mui/material/Container';

import { buttonClasses } from '@mui/base/Button';
import TabPanel from '@mui/lab/TabPanel';

import Tabs from '@mui/material/Tabs';
import { TabsList } from '@mui/base/TabsList';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import tabsClasses, { Typography } from '@mui/material';
// import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TwitterIcon from '@mui/icons-material/Twitter';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, Fade, Stack } from '@mui/material';
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
import CssBaseline from '@mui/material/CssBaseline';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import Logo from '../../../public/logobleck.svg';
import { IProfile } from '@/interface/IUser';
// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
// import { removToken } from '../../../store/auth/tokenSlice';
// import {
//   useGetTokenMutation,
//   useGetUserQuery,
// } from '../../../store/auth/user.api';
import Style from './Login.module.css';
import { Wrapper } from '../Wrapper';
import { Locale } from '@/i18n.config';
import { loginStaticDataProp } from '@/interface/IStaticData';

// const TabS = styled(Tabs)`
//   font-family: IBM Plex Sans, sans-serif;
//   color: #333333;
//   cursor: pointer;
//   font-size: 0.875rem;
//   font-weight: 500;
//   background-color: transparent;
//   width: 100%;
//   height: 30px;
//   padding: 12px;
//   margin: 6px 6px;
//   border: none;
//   border-radius: 4px;
//   display: flex;
//   justify-content: center;

//   //&:hover {
//   //  background-color: #ccc;
//   //}
// ;
// }

// &:focus {
//   color: #fff;
// }

// &.${tabsClasses.selected} {
//   position: absolute;
//   background-color: #fff;
//   color: #0072E5;
//   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   transition: all .2s ease-in-out;
//   transition-property: width, height, left;
// }

// &.${buttonClasses.disabled} {
//   opacity: 0.5;
//   cursor: not-allowed;
// }
// `;

// const TabsListS = styled(TabsList)(
//   ({ theme }) => `

//   background-color: #e5e5e5e5;
//   width: 100%;
//   border-radius: 12px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-content: space-between;
//   `,
// );
// const TabPanelS = styled(TabPanel)`
//   width: 100%;
//   font-family:
//     Inter,
//     -apple-system,
//     sans-serif,
//     sans-serif;
//   font-size: 0.875rem;
// `;

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

interface IAuth {
  access_token: string;
  id_token: string;
}

const BASE_URL = 'http://127.0.0.1:8000/api/customer/';

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

    // try {
    //     const response = await axios.post<IToken>(
    //         "http://127.0.0.1:8000/auth/jwt/create/",
    //         {
    //             headers: {
    //                 "TopContent-Type": "application/json",
    //             },
    //             email: values.email,
    //             password: values.password,
    //         }
    //     )
    //     dispatch(setToken(response.data))
    //     // dispatch(setTokenRefresh(response.data.refresh))
    //     localStorage.setItem("access", response.data.access)
    //     localStorage.setItem("refresh", response.data.refresh)
    //     dispatch(userFetching())
    //     const {data} = await axios.get<IProfile[]>(
    //         "http://127.0.0.1:8000/api/customer/",
    //         {
    //             headers: {
    //                 "TopContent-Type": "application/json",
    //                 Authorization: "Bearer " + response.data.access,
    //             },
    //         }
    //     )
    //     dispatch(userFetchingSuccsess(data))
    //
    //     await router.push("/")
    // } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //         dispatch(userFetchingErorr(error.message))
    //         console.log("error message: ", error.message)
    //         // 👇️ error: AxiosError<any, any>
    //         return error.message
    //     } else {
    //         console.log("unexpected error: ", error)
    //         return "An unexpected error occurred"
    //     }
    // }
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
          <Link href={`${lang}/`}>
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
