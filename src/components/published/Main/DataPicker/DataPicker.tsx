'use client';

import { Locale } from '@/i18n.config';

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

import * as React from 'react';
import { useState } from 'react';

export function DataPicker({
  staticData,
  lang,
  minOff,
  setValues,
  values,
  isWhite,
  small,
}: {
  staticData: string;
  lang: Locale;
  minOff?: boolean;
  setValues: any;
  values: any;
  isWhite?: boolean;
  small?: boolean;
}) {
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs(),
  );
  const [open, setOpen] = useState<boolean>(false);

  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
      <Box
        width={minOff ? '100%' : 'initial'}
        sx={{
          '& .MuiFormControl-root': {
            width: '100%',
            backgroundColor: isWhite ? 'white' : 'transparent',
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
          slotProps={{ textField: { size: small ? 'small' : 'medium' } }}
          onChange={newValue => {
            setDatePickerValue(newValue);
            setValues({ ...values, date: newValue?.toISOString() });
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
