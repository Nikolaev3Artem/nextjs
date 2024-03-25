'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Container, Divider, Fade, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import axios from 'axios';

import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import Logo from '../../../../public/logobleck.svg';

import Style from './signup.module.css';
import { Locale } from '@/i18n.config';
import { registrationStaticDataProp } from '@/interface/IStaticData';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface State {
  email: string;
  password: string;
  name: string;
  showPassword: boolean;
}
export default function Signup({
  staticData,
  lang,
}: {
  staticData: registrationStaticDataProp;
  lang: Locale;
}) {
  const [data, setData] = React.useState<State>({
    email: '',
    password: '',
    name: '',
    showPassword: false,
  });
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  let formData = {
    email: data.email,
    password: data.password,
  };

  const signup = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/users/`,
        {
          headers: {
            'TopContent-Type': 'application/json',
          },
          email: data.email,
          password: data.password,
        },
      );

      if (res.status === 201) {
        const log = await login(formData);
        if (log === 200) {
          router.push(`/${lang}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
          className={Style.signup__content}
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
              className={Style.signup__text}
            >
              {staticData.reg_email}
            </Typography>
            <TextField
              sx={{ my: 1 }}
              required
              fullWidth
              id="email"
              label={staticData.email}
              value={data.email}
              onChange={handleChange('email')}
              name="email"
              variant="outlined"
              autoFocus
            />
            <TextField
              sx={{ my: 1 }}
              required
              fullWidth
              id="name"
              label={staticData.name}
              value={data.name}
              onChange={handleChange('name')}
              name="name"
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
                type={data.showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {data.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  </InputAdornment>
                }
                label={staticData.pass}
              />
            </FormControl>
            <Button
              color={'success'}
              sx={{
                my: 1,
                mb: 2,
                height: '50px',
                textTransform: 'none',
              }}
              size="large"
              variant="contained"
              onClick={signup}
              fullWidth
            >
              {staticData.reg_button}
            </Button>

            <Divider />

            <div className={Style.signup__login}>
              <Link href={`/${lang}/auth/`}>{staticData.login_link}</Link>
            </div>
          </Box>
        </Box>
      </Container>
    </Fade>
  );
}
