'use client';

import { Locale } from '@/i18n.config';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Grid, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Style from './Input.module.css';

// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
// import { removePopular, setPopular } from '../../../store/popular/popularSlice';

export function Input({
  staticData,
  lang,
  popularRoutsFrom,
  popularRoutsTo,
  routsFrom,
  routsTo,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
  popularRoutsFrom: any;
  popularRoutsTo: any;
  routsFrom: any;
  routsTo: any;
}) {
  const [value1, setValue1] = useState<any>('');
  const [value2, setValue2] = useState<any>('');

  const ref1 = useRef(null);

  //   state => state.popular.active,
  // );
  let active = true;
  // useEffect(() => {
  //   setVal2(sessionStorage.getItem('PopularRouteTo'));
  //   setVal1(sessionStorage.getItem('PopularRouteFrom'));
  // }, [active, value1, val2]);

  const router = useRouter();

  useEffect(() => {
    if ((active = true)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setValue1(sessionStorage.getItem('PopularRouteTo'));
      setValue2(sessionStorage.getItem('PopularRouteFrom'));
      setTimeout(() => {
        sessionStorage.setItem('PopularRouteTo', '');
        sessionStorage.setItem('PopularRouteFrom', '');
      }, 1000);
    }
  }, [active]);

  const handlePopRoutToClick = (el: string) => {
    setValue1(el);
  };

  const handlePopRoutFromClick = (el: string) => {
    setValue2(el);
  };

  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Grid container direction={'column'} gap={2} width={'100%'}>
          <Grid item>
            <Autocomplete
              value={value1}
              disablePortal
              fullWidth={true}
              options={routsFrom}
              renderInput={params => (
                <TextField {...params} label={staticData.from} />
              )}
              onInputChange={(event, newInputValue, reason) => {
                setValue1(newInputValue);
              }}
            />
          </Grid>
          <Grid container component={'ul'} wrap="wrap" gap={2}>
            {popularRoutsTo &&
              popularRoutsTo.map((el: string) => {
                return (
                  <Grid
                    key={el}
                    item
                    component={'li'}
                    className={Style.input__popular}
                    py={0.5}
                    px={1}
                    borderRadius={1}
                    bgcolor={'#E5E5E5'}
                    onClick={() => handlePopRoutToClick(el)}
                  >
                    {el}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid container direction={'column'} gap={2} width={'100%'}>
          <Grid item>
            <Autocomplete
              value={value2}
              fullWidth={true}
              disablePortal
              options={routsTo}
              renderInput={params => (
                <TextField {...params} label={staticData.to} />
              )}
              onInputChange={(event, newInputValue) => {
                setValue2(newInputValue);
              }}
            />
          </Grid>
          <Grid container component={'ul'} wrap="wrap" gap={2}>
            {popularRoutsFrom &&
              popularRoutsFrom.map((el: string) => {
                return (
                  <Grid
                    item
                    key={el}
                    component={'li'}
                    className={Style.input__popular}
                    py={0.5}
                    px={1}
                    borderRadius={1}
                    bgcolor={'#E5E5E5'}
                    onClick={() => handlePopRoutFromClick(el)}
                  >
                    {el}
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
