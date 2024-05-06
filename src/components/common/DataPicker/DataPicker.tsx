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
import debounce from '@mui/utils/debounce';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import * as React from 'react';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';

export function DataPicker({
  staticData,
  lang,
  minOff,
  setValues,
  values,
  isWhite,
  small,
  isShowDelIcon = false,
}: {
  staticData: string;
  lang: Locale;
  minOff?: boolean;
  setValues: any;
  values: any;
  isWhite?: boolean;
  small?: boolean;
  isShowDelIcon?: boolean;
}) {
  const [datePickerValue, setDatePickerValue] = React.useState<null | Dayjs>(
    null,
  );
  const [open, setOpen] = useState<boolean>(false);

  const today = dayjs();
  const handleDateChange = debounce(newValue => {
    setDatePickerValue(newValue);
    setValues({ ...values, date: newValue?.toISOString() });
  }, 1000);

  React.useEffect(() => {
    minOff ? setDatePickerValue(null) : setDatePickerValue(today);
  }, [minOff]);

  const handleClearDate = () => {
    setDatePickerValue(null);
    setValues({ ...values, date: '' });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
      <Box
        width={minOff ? '100%' : 'initial'}
        sx={{
          position: 'relative',
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
          value={datePickerValue}
          slotProps={{ textField: { size: small ? 'small' : 'medium' } }}
          // onChange={newValue => handleDateChange(newValue)}
          onChange={handleDateChange}
          // @ts-ignore

          onViewChange={(params: object) => (
            <TextField {...params} onClick={e => setOpen(true)} />
          )}
        />
        {values.date && isShowDelIcon && (
          <IconButton
            size={'small'}
            sx={{ position: 'absolute', top: 3, right: 34 }}
            onClick={handleClearDate}
          >
            <HighlightOffOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </LocalizationProvider>
  );
}
