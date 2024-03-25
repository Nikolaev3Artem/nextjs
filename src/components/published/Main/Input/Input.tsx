'use client';

import { Locale } from '@/i18n.config';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Grid, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import Style from './Input.module.css';
import { useRoutsContext } from '@/app/context';

export function Input({
  staticData,
  popularRoutsFrom,
  popularRoutsTo,
  routsFrom,
  routsTo,
  setValues,
  values,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
  popularRoutsFrom: string[];
  popularRoutsTo: string[];
  routsFrom: string[];
  routsTo: string[];
  setValues: any;
  values: any;
}) {
  const [value1, setValue1] = useState<any>('');
  const [value2, setValue2] = useState<any>('');
  const {
    selectRoutsTo,
    setSelectRoutsTo,
    selectRoutsFrom,
    setSelectRoutsFrom,
  } = useRoutsContext();

  //   state => state.popular.active,
  // );
  let active = true;

  useEffect(() => {
    if ((active = true)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setValue1(selectRoutsTo);
      setValue2(selectRoutsFrom);
      setTimeout(() => {}, 1000);
    }
  }, [selectRoutsTo, selectRoutsFrom]);

  const handlePopRoutToClick = (el: string) => {
    setValue1(el);
    setValues({ ...values, ['from']: el });
  };

  const handlePopRoutFromClick = (el: string) => {
    setValue2(el);
    setValues({ ...values, ['to']: el });
  };

  return (
    <Box>
      <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Grid container direction={'column'} gap={2}>
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
                setValues({ ...values, ['from']: newInputValue });
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
                    sx={{ cursor: 'pointer' }}
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
                setValues({ ...values, ['to']: newInputValue });
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
                    sx={{ cursor: 'pointer' }}
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
