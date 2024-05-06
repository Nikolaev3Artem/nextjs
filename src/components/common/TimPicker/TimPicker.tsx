'use client';

import { Locale } from '@/i18n.config';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/lt';
import 'dayjs/locale/pt';
import 'dayjs/locale/uk';

import * as React from 'react';
import { useState } from 'react';

export function TimPicker({
  staticData,
  lang,
  minOff,
  setValues,
  values,
  isWhite,
  small,
  defaultValue,
}: {
  staticData: string;
  lang: Locale;
  minOff?: boolean;
  setValues: any;
  values: any;
  isWhite?: boolean;
  small?: boolean;
  defaultValue?: string;
}) {
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);

  const today = dayjs();
  React.useEffect(() => {
    if (defaultValue) {
      setDatePickerValue(
        dayjs().startOf('day').add(parseInt(defaultValue), 'minute'),
      );
    }
  }, [defaultValue]);

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
        <TimePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          label={staticData}
          minTime={minOff ? null : today}
          autoFocus={false}
          value={minOff ? null : datePickerValue}
          slotProps={{ textField: { size: small ? 'small' : 'medium' } }}
          onChange={newValue => {
            setDatePickerValue(newValue);
            setValues({ ...values, time: newValue });
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
