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
import { useCallback, useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';

import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';

import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { getSession } from '@/lib/auth';
import { JourneyInfo } from '../JourneyInfo';
import { getRoutInfo } from '../JourneyInfo/getInfo';

const discount = 30;

interface UserData {
  email: string;
  phone: string;
  name: string;
  passanger_type: string;
  surname: string;
  comment: string;
  luggage: string;
  seat: number | null;
  floor: number | null;
  price: number | null;
  id: string;
}

type State = {
  [key: string]: UserData;
};

type SeatsObject = {
  [floor: string]: number[];
};

type Seat = { floor: number | null; seat: number | null };

const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const getTotal = (values: State) => {
  let sum = 0;
  Object.values(values).forEach(({ price }) => {
    if (price !== null && !isNaN(price)) {
      sum += price;
    }
  });
  return sum;
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const seatsString = searchParams.get('selectedSeats');
  const seatsObject = seatsString ? JSON.parse(seatsString) : null;
  const routIdString = searchParams.get('routId');
  const routId = routIdString ? JSON.parse(routIdString as string) : null;

  const [values, setValues] = useState<State>({});
  const [passengerSeat, setPassengerSeat] = useState<Seat[]>([]);
  const [data, setData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoutInfo(routId, lang);

        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const transformSeats = (seatsObject: SeatsObject): Seat[] => {
    const transformedSeats: Seat[] = [];
    for (const [floor, seats] of Object.entries(seatsObject)) {
      for (const seat of seats) {
        transformedSeats.push({ floor: Number(floor), seat });
      }
    }
    return transformedSeats;
  };

  useEffect(() => {
    if (seatsObject) {
      setPassengerSeat(transformSeats(seatsObject));
    }
  }, []);

  useEffect(() => {
    if (passengerSeat.length > 0) {
      setValues(prevState => {
        const updatedValues = { ...prevState };

        passengerSeat.forEach((seat, index) => {
          const passengerKey = `passenger${index + 1}`;
          updatedValues[passengerKey] = {
            id: passengerKey,
            email: userData?.email || '',
            name: userData?.first_name || '',
            surname: userData?.last_name || '',
            phone: userData?.phone || '',
            passanger_type: prevState[passengerKey]?.passanger_type || 'adult',
            comment: prevState[passengerKey]?.comment || '',
            luggage: prevState[passengerKey]?.luggage || 'base',
            seat: seat.seat || null,
            floor: seat.floor || null,
            price: data?.routes[0]?.price || null,
          };
        });

        return updatedValues;
      });
    }
  }, [passengerSeat, userData, data]);

  const handleChange = (userKey: string) => (prop: keyof UserData) => {
    return debounce(
      (
        event:
          | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          | SelectChangeEvent<string>,
      ) => {
        prop === 'passanger_type'
          ? setValues(prevState => ({
              ...prevState,
              [userKey]: {
                ...prevState[userKey],
                price:
                  event.target.value === 'child'
                    ? data?.routes[0]?.price - discount
                    : data?.routes[0]?.price,
                [prop]: event.target.value,
              },
            }))
          : setValues(prevState => ({
              ...prevState,
              [userKey]: {
                ...prevState[userKey],
                [prop]: event.target.value,
              },
            }));
      },
      600,
    );
  };

  const Reserve = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const session = await getSession();
      if (!session) return null;
      for (const passengerKey in values) {
        if (Object.hasOwnProperty.call(values, passengerKey)) {
          const passenger = values[passengerKey];

          const formData = new FormData();
          formData.append('name', passenger.name);
          formData.append('surname', passenger.surname);
          formData.append('comment', passenger.comment);
          formData.append(
            'reserved_seat',
            passenger.seat ? String(passenger.seat) : '',
          );
          formData.append(
            'reserved_floor_seat',
            passenger.floor ? String(passenger.floor) : '',
          );
          formData.append('additional_baggage', passenger.luggage);
          formData.append('passanger_type', passenger.passanger_type);

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/uk/api/journey/${routId}/create_ticket`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + `${session.access}`,
              },
            },
          );
        }
      }

      router.push(`/${lang}/my-order`);
    } catch (error) {
      console.error(error);
    }
  };

  const Remove = (index: number) => {
    setPassengerSeat(prevSeats => {
      const updatedSeats = [...prevSeats];
      updatedSeats.splice(index, 1);
      return updatedSeats;
    });
    setValues(prevState => {
      const updatedValues = { ...prevState };
      const passengerKey = `passenger${index + 1}`;
      delete updatedValues[passengerKey];
      return updatedValues;
    });
  };

  const Add = () => {
    const newSeat: Seat = { floor: null, seat: null };

    setPassengerSeat(prevSeats => {
      return [...prevSeats, newSeat];
    });
  };

  return (
    <Box>
      <Grid
        container
        component={'form'}
        bgcolor={'transparent'}
        sx={{ rowGap: { xs: '16px', lg: 0 }, columnGap: { lg: '16px' } }}
      >
        <Grid
          item
          xs={12}
          lg={8}
          sx={{ flexDirection: 'column' }}
          rowGap={2}
          bgcolor={'transparent'}
          display={'flex'}
        >
          {Object.keys(values).map((key, index) => {
            const value = values[key];
            return (
              <Grid
                container
                p={4}
                bgcolor={'white'}
                className={Style.content}
                rowGap={2}
                key={index}
              >
                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignContent={'center'}
                >
                  <Typography>
                    {staticData.orderForm.passenger} {index + 1}
                  </Typography>
                  {value.floor ? (
                    <Typography>
                      {staticData.orderForm.floor} {value.floor}
                    </Typography>
                  ) : (
                    <Box display={'flex'} alignItems={'center'} columnGap={1}>
                      <Typography>{staticData.orderForm.floor}</Typography>
                      <Button
                        sx={{
                          p: '4px 8px',
                          fontWeight: '400',
                          textTransform: 'none',
                          fontSize: '12px',

                          justifyContent: 'flex-end',
                        }}
                        color="secondary"
                        variant={'contained'}
                        onClick={() => console.log('click')}
                      >
                        {staticData.orderForm.select_button.title}
                      </Button>
                    </Box>
                  )}
                  {value.seat ? (
                    <Typography>
                      {staticData.orderForm.seat} {value.seat}
                    </Typography>
                  ) : (
                    <Box display={'flex'} alignItems={'center'} columnGap={1}>
                      <Typography>{staticData.orderForm.seat}</Typography>
                      <Button
                        sx={{
                          p: '4px 8px',
                          fontWeight: '400',
                          textTransform: 'none',
                          fontSize: '12px',

                          justifyContent: 'flex-end',
                        }}
                        color="secondary"
                        variant={'contained'}
                        onClick={() => console.log('click')}
                      >
                        {staticData.orderForm.select_button.title}
                      </Button>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={5.8}>
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

                <Grid item xs={12} sm={5.8}>
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

                <Grid item xs={12} sm={5.8}>
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
                <Grid item xs={12} sm={5.8}>
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

                <Grid item xs={6}>
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
                      onChange={handleChange(`passenger${index + 1}`)(
                        'luggage',
                      )}
                      value={
                        index === 0
                          ? values.passenger1?.luggage
                          : values[`passenger${index + 1}`]?.luggage
                      }
                    >
                      <FormControlLabel
                        value="base"
                        control={<Radio sx={{ py: 0.5 }} />}
                        label={staticData.orderForm.base_bag}
                        className={
                          values.passenger1.luggage === 'base'
                            ? Style.radio_base
                            : Style.radio_base_disable
                        }
                      />
                      <FormControlLabel
                        value="extra"
                        control={<Radio sx={{ py: 0.5 }} />}
                        label={staticData.orderForm.extra_bag}
                        className={
                          values.passenger1.luggage === 'extra'
                            ? Style.radio_extra
                            : Style.radio_extra_disable
                        }
                      />
                      <FormControlLabel
                        value="our"
                        control={<Radio sx={{ py: 0.5 }} />}
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
                  <Typography
                    fontSize={'20px'}
                    display={'inline-flex'}
                    alignItems={'baseline'}
                    columnGap={0.5}
                  >
                    {staticData.orderForm.price}
                    <Typography
                      fontWeight={700}
                      component={'span'}
                      fontSize={'24px'}
                    >
                      {data?.routes && value.passanger_type === 'adult'
                        ? `${data?.routes[0].price}`
                        : `${data?.routes[0].price - discount}`}
                    </Typography>
                    <Typography component={'span'} fontSize={'12px'}>
                      UAH
                    </Typography>
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
            );
          })}

          <Grid item xs={12}>
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
        </Grid>
        <Grid
          item
          p={4}
          bgcolor={'white'}
          className={Style.content}
          xs={12}
          lg={3.8}
          sx={{ height: { lg: 'max-content' } }}
        >
          <Grid container display={'flex'} rowGap={2} width={'100%'}>
            {data && (
              <JourneyInfo data={data} staticData={staticData} lang={lang} />
            )}
            <Grid item xs={12}>
              <Typography
                color={'primary'}
                sx={{ fontSize: { xs: '20px' } }}
                display={'inline-flex'}
                alignItems={'baseline'}
                columnGap={1}
              >
                {staticData.orderForm.total}
                <Typography
                  component={'span'}
                  color={'primary'}
                  fontWeight={700}
                  sx={{ fontSize: { xs: '24px' } }}
                >
                  {getTotal(values)}
                </Typography>
                <Typography
                  component={'span'}
                  color={'primary'}
                  sx={{ fontSize: { xs: '12px' } }}
                >
                  {/* {data?.bus ? data.bus[0].name : ''} */} UAH
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12}>
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
                startIcon={<LockIcon />}
                // onClick={Reserve}
              >
                {staticData.orderForm.reserve_button.title}
              </Button>
            </Grid>
            <Grid item xs={12}>
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
                onClick={Reserve}
              >
                {staticData.orderForm.payment_button.title}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
