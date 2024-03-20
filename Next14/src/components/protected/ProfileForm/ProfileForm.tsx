'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
// import Style from './profile.module.css';
import { Locale } from '@/i18n.config';
import { getProfileDictionaries } from '@/lib/dictionary';
import FormControl from '@mui/material/FormControl';
import { BiSave } from 'react-icons/bi';
import { profileStaticData } from '@/interface/IStaticData';
import { SyntheticEvent, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataPicker } from '@/components/published/Main/DataPicker';
import axios from 'axios';
import Style from '@/app/[lang]/(protected)/profile/profile.module.css';
import { IProfile, IUser } from '@/interface/IUser';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth';

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
  console.log('f', userData);
  const [values, setValues] = useState<State>({
    email: userData?.email || '',
    name: userData?.first_name || '',
    password: userData?.last_name || '',
    surname: '',
    phone: userData?.phone || '',
    patronymic: '',
    birthday: '',
    login: '',
    showPassword: false,
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

  const Save = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const session = await getSession();
      if (!session) return null;

      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}uk/api/customer/update/${userData?.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90e…iOjh9.m2x-1ynqSSeoED59wrFAPebu4T1k-F6lCNcnMzrl3_A',
          },

          first_name: values.name,
        },
      );

      // if (result === 200) {
      //   router.back();
      // }
      console.log(result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ');
        return 'An unexpected error occurred';
      }
    }
  };

  return (
    <Grid
      component="form"
      sx={{ mt: 1, p: 0, pr: 2, pb: 2 }}
      container
      spacing={2}
      bgcolor={'white'}
      className={Style.content}
    >
      <Grid item xs={6}>
        <TextField
          sx={{ my: 1 }}
          required
          fullWidth
          id="name"
          label={staticData.form.name}
          value={values.name}
          onChange={handleChange('name')}
          name="name"
          variant="outlined"
          autoFocus
        />
        <TextField
          sx={{ my: 1 }}
          required
          fullWidth
          id="surname"
          label={staticData.form.surname}
          value={values.surname}
          onChange={handleChange('surname')}
          name="surname"
          variant="outlined"
        />
        <TextField
          sx={{
            my: 1,
            visibility: staticData.form.patronymic ? 'visible' : 'hidden',
          }}
          required
          fullWidth
          id="patronymic"
          label={staticData.form.patronymic}
          value={values.patronymic}
          onChange={handleChange('patronymic')}
          name="patronymic"
          variant="outlined"
        />
        <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            {staticData.form.password}
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
            label={staticData.form.password}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          sx={{ my: 1 }}
          required
          fullWidth
          id="phone"
          label={staticData.form.phone}
          value={values.phone}
          onChange={handleChange('phone')}
          name="phone"
          variant="outlined"
        />
        <TextField
          sx={{ my: 1 }}
          required
          fullWidth
          id="email"
          label={staticData.form.email}
          value={values.email}
          onChange={handleChange('email')}
          name="email"
          variant="outlined"
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
          required
          fullWidth
          id="login"
          label={staticData.form.login}
          value={values.login}
          onChange={handleChange('login')}
          name="login"
          variant="outlined"
        />
      </Grid>

      {/* <TextField
        sx={{ my: 1 }}
        required
        fullWidth
        id="birthday"
        label={staticData.form.birthday}
        value={values.email}
        onChange={handleChange('birthday')}
        name="birthday"
        variant="outlined"
      ></TextField> */}

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
        onClick={Save}
        startIcon={<BiSave />}
      >
        {staticData.button.save.title}
      </Button>
    </Grid>
  );
};
