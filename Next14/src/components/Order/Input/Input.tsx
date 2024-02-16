'use client';

import { Locale } from '@/i18n.config';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
// import { removePopular, setPopular } from '../../../store/popular/popularSlice';

export function Input({
  staticData,
  lang,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
}) {
  const [value1, setValue1] = useState<any>('');
  const [value2, setValue2] = useState<any>('');
  const ref1 = useRef(null);

  const getCity = (lang: Locale) => {
    const city = {
      uk: [
        { label: 'Львів' },
        { label: 'Київ' },
        { label: 'Івано-Франківськ' },
        { label: 'Тернопіль' },
        { label: 'Ужгород' },
        { label: 'Закарпаття' },
        { label: 'Мукачево' },
      ],
      en: [
        { label: 'Lviv' },
        { label: 'Kyiv' },
        { label: 'Ivano-Frankivsk' },
        { label: 'Ternopil' },
        { label: 'Uzhhorod' },
        { label: 'Transcarpathia' },
        { label: 'Mukachevo' },
      ],
      pt: [
        { label: 'Lviv' },
        { label: 'Kyiv' },
        { label: 'Ivano-Frankivsk' },
        { label: 'Ternopil' },
        { label: 'Uzhhorod' },
        { label: 'Transcarpathia' },
        { label: 'Mukachevo' },
      ],
      lt: [
        { label: 'Lviv' },
        { label: 'Kyiv' },
        { label: 'Ivano-Frankivsk' },
        { label: 'Ternopil' },
        { label: 'Uzhhorod' },
        { label: 'Transcarpathia' },
        { label: 'Mukachevo' },
      ],
    };

    return city[lang];
  };

  //   const val1: string = useAppSelector(state => state.popular.val1);
  //   const val2: string = useAppSelector(state => state.popular.val2);
  //   const active: boolean | undefined = useAppSelector(
  //     state => state.popular.active,
  //   );

  let active = true;
  const router = useRouter();

  //   useEffect(() => {
  //     if ((active = true)) {
  //       window.scrollTo({
  //         top: 0,
  //         left: 0,
  //         behavior: 'smooth',
  //       });
  //       setValue1(val1);
  //       setValue2(val2);
  //     }
  //   }, [active]);

  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Autocomplete
          value={value1}
          freeSolo={true}
          disablePortal
          fullWidth={true}
          options={getCity(lang)}
          renderInput={params => (
            <TextField {...params} label={staticData.from} />
          )}
          onInputChange={(event, newInputValue, reason) => {
            setValue1(newInputValue);
          }}
        />
        <Autocomplete
          value={value2}
          freeSolo={true}
          fullWidth={true}
          disablePortal
          options={getCity(lang)}
          renderInput={params => (
            <TextField {...params} label={staticData.to} />
          )}
          onInputChange={(event, newInputValue) => {
            setValue2(newInputValue);
          }}
        />
      </Stack>
    </Box>
  );
}
