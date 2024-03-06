'use client';

import { Locale } from '@/i18n.config';
import { MainStaticDataProps } from '@/interface/IStaticData';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/lt';
import 'dayjs/locale/pt';
import 'dayjs/locale/uk';
// import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

// import { useAppSelector } from '../../../store/auth/redux';

export function DataPicker({
  staticData,
  lang,
  minOff,
}: {
  staticData: string;
  lang: Locale;
  minOff?: boolean;
}) {
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs(),
  );
  const [open, setOpen] = useState<boolean>(false);

  const today = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
      <Box
        mx={minOff ? 0 : 2}
        width={minOff ? '100%' : 'initial'}
        sx={{
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <DatePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={staticData}
          minDate={minOff ? null : today}
          autoFocus={false}
          value={minOff ? null : datePickerValue}
          onChange={newValue => {
            setDatePickerValue(newValue);
          }}
          // @ts-ignore
          // slotProps={{
          // 	textField: {...params, onClick = {(e) => setOpen(true)}}
          // }}
          onViewChange={(params: object) => (
            <TextField {...params} onClick={e => setOpen(true)} />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
