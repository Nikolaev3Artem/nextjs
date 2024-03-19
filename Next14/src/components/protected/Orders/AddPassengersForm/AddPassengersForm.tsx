'use client';

import { Locale } from '@/i18n.config';
import { orderStaticData } from '@/interface/IStaticData';
import { IProfile } from '@/interface/IUser';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Typography,
  Theme,
} from '@mui/material';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Style from './AddPassengersForm.module.css';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';

import Button from '@mui/material/Button';
import theme from '@/theme';

interface UserData {
  email: string;
  phone: string;
  name: string;
  passanger_type: string;
  surname: string;
  comment: string;
  luggage: string;
}

type State = {
  [key: string]: UserData;
};

export const AddPassengersForm = ({
  staticData,
  lang,
  userData,
}: {
  staticData: orderStaticData;
  lang: Locale;
  userData: IProfile | null | undefined;
}) => {
  const [values, setValues] = useState<State>({
    passenger1: {
      email: userData?.email || '',
      name: userData?.first_name || '',
      surname: '',
      phone: userData?.phone || '',
      passanger_type: 'adult',
      comment: 'string' || '',
      luggage: '' || 'base',
    },
  });

  const [passengerSeat, setPassengerSeat] = useState([22, 23]);

  const handleChange =
    (userKey: string) =>
    (prop: keyof UserData) =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<UserData>,
    ) => {
      setValues(prevState => {
        return {
          ...prevState,
          [userKey]: {
            ...prevState[userKey],
            [prop]: event.target.value,
          },
        };
      });
    };

  const Reserve = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(values);
  };

  const Remove = (index: number) => {
    setPassengerSeat(prevSeats => {
      const updatedSeats = [...prevSeats];

      updatedSeats.splice(index, 1);
      return updatedSeats;
    });
  };

  const Add = () => {
    setPassengerSeat(prevSeats => {
      const updatedSeats = [...prevSeats];
      const nextSeatNumber = Math.max(...updatedSeats) + 1;
      updatedSeats.push(nextSeatNumber);
      return updatedSeats;
    });
  };

  return (
    <Grid component="form" container bgcolor={'transparent'}>
      {Array.from({ length: passengerSeat.length }, (_, index) => (
        <Grid
          key={index}
          item
          p={4}
          bgcolor={'white'}
          className={Style.content}
        >
          <Grid container spacing={2} bgcolor={'white'}>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Typography>
                {staticData.orderForm.passenger} {index + 1}
              </Typography>

              <Typography>
                {staticData.orderForm.seat} {passengerSeat[index]}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ my: 1 }}
                required
                fullWidth
                id="name"
                label={staticData.orderForm.name}
                value={values.name}
                onChange={handleChange(`passenger${index + 1}`)('name')}
                name="name"
                variant="outlined"
                autoFocus
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ my: 1 }}
                required
                fullWidth
                id="surname"
                label={staticData.orderForm.surname}
                value={values.surname}
                onChange={handleChange(`passenger${index + 1}`)('surname')}
                name="surname"
                variant="outlined"
                autoFocus
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ my: 1 }}
                required
                fullWidth
                id="phone"
                label={staticData.orderForm.phone}
                value={values.phone}
                onChange={handleChange(`passenger${index + 1}`)('phone')}
                name="phone"
                variant="outlined"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ my: 1 }}
                required
                fullWidth
                id="email"
                label={staticData.orderForm.email}
                value={index === 0 ? values.passenger1.email : ''}
                onChange={handleChange(`passenger${index + 1}`)('email')}
                name="email"
                variant="outlined"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  labelId=" passanger_type"
                  id=" passanger_type"
                  value={
                    index === 0
                      ? values.passenger1?.passanger_type
                      : values[`passenger${index + 1}`]?.passanger_type
                  }
                  defaultValue="adult"
                  onChange={handleChange(`passenger${index + 1}`)(
                    'passanger_type',
                  )}
                >
                  <MenuItem value="adult">
                    {staticData.orderForm.adult}
                  </MenuItem>
                  <MenuItem value="child">
                    {staticData.orderForm.child}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ my: 1 }}
                fullWidth
                id="comment"
                label={staticData.orderForm.comment}
                value={values.comment}
                onChange={handleChange(`passenger${index + 1}`)('comment')}
                name="comment"
                variant="outlined"
                autoFocus
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={8}>
              <FormControl>
                <FormLabel id="luggage">
                  <Typography fontWeight={700}>
                    {staticData.orderForm.extra_luggage}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="luggage"
                  defaultValue="base"
                  name="luggage"
                  onChange={handleChange(`passenger${index + 1}`)('luggage')}
                  value={
                    index === 0
                      ? values.passenger1?.luggage
                      : values[`passenger${index + 1}`]?.luggage
                  }
                >
                  <FormControlLabel
                    value="base"
                    control={<Radio />}
                    label={staticData.orderForm.base_bag}
                    className={
                      values.passenger1.luggage === 'base'
                        ? Style.radio_base
                        : Style.radio_base_disable
                    }
                  />
                  <FormControlLabel
                    value="extra"
                    control={<Radio />}
                    label={staticData.orderForm.extra_bag}
                    className={
                      values.passenger1.luggage === 'extra'
                        ? Style.radio_extra
                        : Style.radio_extra_disable
                    }
                  />
                  <FormControlLabel
                    value="our"
                    control={<Radio />}
                    label={staticData.orderForm.our_bag}
                    className={Style.radio_our}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Typography>
                {staticData.orderForm.price}
                <Typography fontWeight={700} component={'span'}>
                  7000
                </Typography>
                <Typography component={'span'}>UAH</Typography>
              </Typography>
            </Grid>

            {index !== 0 && (
              <Grid item xs={12} textAlign={'end'}>
                <Button
                  sx={{
                    p: '4px 8px',
                    fontWeight: '400',
                    textTransform: 'none',
                    fontSize: '12px',
                    backgroundColor: '#B22234',
                    justifyContent: 'flex-end',

                    '&:hover': {
                      backgroundColor: '#DD5407',
                    },
                  }}
                  variant={'contained'}
                  onClick={() => Remove(index)}
                >
                  {staticData.orderForm.remove_button.title}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} lg={2} xl={2}>
        <Button
          sx={{
            height: '54px',
            fontWeight: '400',
            textTransform: 'none',
            fontSize: '16px',
          }}
          fullWidth
          variant={'contained'}
          color={'success'}
          onClick={Add}
        >
          {staticData.orderForm.add_button.title}
        </Button>
      </Grid>
      <Grid item md={2} lg={2} xl={2}>
        <Button
          sx={{
            height: '54px',
            fontWeight: '400',
            textTransform: 'none',
            fontSize: '16px',
          }}
          fullWidth
          variant={'contained'}
          color={'secondary'}
          onClick={Reserve}
        >
          {staticData.orderForm.reserve_button.title}
        </Button>
      </Grid>
    </Grid>
  );
};
