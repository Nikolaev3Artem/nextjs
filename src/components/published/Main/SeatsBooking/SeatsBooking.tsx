import { JourneySeatsBookingModal } from '@/components/published/Main/JourneySeatsBookingModal';

import { IJourney } from '@/interface/IJourney';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { grey } from '@mui/material/colors';
import { Box, Button, Stack, Typography } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { IoMdArrowForward } from 'react-icons/io';

import CalendarIcon from '../../../../../public/icons/calendar-month.svg';
import dayjs from 'dayjs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import { useEffect, useState } from 'react';
import theme from '@/theme';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { styled } from '@mui/material/styles';
import BusConstructor from '@/components/protected/dashboard/Bus/BusConstructor/BusConstructor';
import BusSeats from '../../../common/BusSeats/BusSeats';
import { ISeat } from '@/interface/IRent';

const color_title = grey[800];

export const SeatsBooking = ({
  data,
  onClose,
  isShowModal,
  staticData,
  lang,
  addPassClick,
  addPassengers,
}: {
  data: IJourney;
  onClose: () => void;
  isShowModal: boolean;
  staticData: MainStaticDataProps;
  lang: Locale;
  addPassengers: boolean;
  addPassClick?: any;
}) => {
  const getColor = (name: string) => {
    switch (name) {
      case 'available':
        return '#7ADB6A';
      case 'occupied':
        return '#BFBFBF';
      case 'selected':
        return '#296FCA';
      default:
        return '#BFBFBF';
    }
  };

  interface SelectedSeatsState {
    1: number[];
    2: number[];
    [key: string]: number[];
  }
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatsState>({
    1: [],
    2: [],
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    setFirstFloorSeats(data?.bus[0]?.first_floor_seats);
  }, [data?.bus[0]?.first_floor_seats]);
  useEffect(() => {
    setSecondFloorSeats(data?.bus[0]?.second_floor_seats);
  }, [data?.bus[0]?.second_floor_seats]);

  const [firstFloorSeats, setFirstFloorSeats] = useState<ISeat[]>();
  const [secondFloorSeats, setSecondFloorSeats] = useState<ISeat[]>();

  const handleCheck = (seatNumber: number, floor: number) => {
    setSelectedSeats(prevSelectedSeats => ({
      ...prevSelectedSeats,
      [floor]: prevSelectedSeats[floor].includes(seatNumber)
        ? prevSelectedSeats[floor].filter(seatId => seatId !== seatNumber)
        : [...prevSelectedSeats[floor], seatNumber],
    }));

    if (floor === 1) {
      setFirstFloorSeats(prevState => {
        const updatedSeats = prevState?.map(seat => {
          if (seat.seat === seatNumber) {
            if (seat.status === 'Selected') {
              return { ...seat, status: 'Empty' };
            }

            return { ...seat, status: 'Selected' };
          }
          return seat;
        });

        return updatedSeats;
      });
    }
    if (floor === 2) {
      setSecondFloorSeats(prevState => {
        const updatedSeats = prevState?.map(seat => {
          if (seat.seat === seatNumber) {
            if (seat.status === 'Selected') {
              return { ...seat, status: 'Empty' };
            }

            return { ...seat, status: 'Selected' };
          }
          return seat;
        });

        return updatedSeats;
      });
    }
  };

  const getLinkHref = () => {
    const nonEmptySeats = Object.fromEntries(
      Object.entries(selectedSeats).filter(([_, value]) => value.length > 0),
    );
    const queryParams = new URLSearchParams();
    queryParams.set('selectedSeats', JSON.stringify(nonEmptySeats));
    queryParams.set('routId', `${data?.id}`);
    const pathWithParams = `/${lang}/my-order/new-order?${queryParams}`;
    return pathWithParams;
  };

  const BpIcon = styled('span')(({ theme }: { theme: any }) => ({
    borderRadius: '4px',
    width: '56px',
    height: '53px',
    backgroundColor: theme.palette.success.main,
    border: '1px #BFBFBF solid',

    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.secondary.main,
    },
    'input:disabled ~ &': {
      backgroundColor: '#BFBFBF',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',

    'input:hover ~ &': {
      backgroundColor: theme.palette.secondary.main,
    },
  });

  function BpCheckbox(props: CheckboxProps) {
    return (
      <Checkbox
        sx={{
          '&:hover': { bgcolor: 'transparent' },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        {...props}
      />
    );
  }

  return (
    <JourneySeatsBookingModal onClose={onClose} isShowModal={isShowModal}>
      <Box sx={{ overflowY: 'scroll', height: { xs: '94vh', md: 'auto' } }}>
        <Box
          p={4}
          display={'flex'}
          width={'100%'}
          justifyContent={'flex-start'}
          position={'relative'}
          flexDirection={'column'}
          rowGap={2}
        >
          <IconButton
            onClick={onClose}
            sx={{
              fontSize: '18px',
              position: 'absolute',
              top: 2,
              right: 2,
            }}
          >
            <MdOutlineClose />
          </IconButton>
          <Stack
            width={'100%'}
            direction={{ sm: 'row', xs: 'column' }}
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '29px',
                lineHeight: '140%',
                color: color_title,
              }}
            >
              {staticData.seat_booking.title}
            </Typography>

            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{
                columnGap: 1,
              }}
            >
              {staticData.seat_booking.seats.map((el, ind) => {
                return (
                  <Box
                    key={ind}
                    display={'flex'}
                    alignItems={'center'}
                    sx={{
                      columnGap: 1,
                    }}
                  >
                    <Typography fontSize={'12px'}>{el.title}</Typography>
                    <Box
                      component={'span'}
                      sx={{
                        display: 'block',
                        width: 24,
                        height: 24,
                        borderRadius: '4px',
                        backgroundColor: getColor(el.name),
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Stack>
          <Stack
            width={'100%'}
            alignItems={'flex-start'}
            display={'flex'}
            justifyContent={'space-between'}
            direction={{ md: 'row', xs: 'column' }}
          >
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              display={'flex'}
              justifyContent={'flex-start'}
              columnGap={1}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '140%',
                  color: color_title,
                }}
              >
                {data?.routes[0]?.cities[0].city}
              </Typography>
              <IoMdArrowForward width={3} height={3} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '140%',
                  color: color_title,
                }}
              >
                {
                  data?.routes[0]?.cities[data?.routes[0]?.cities?.length - 1]
                    .city
                }
              </Typography>

              <CalendarIcon width={'24px'} height={'24px'} />

              <Typography
                color={'primary'}
                sx={{ fontSize: { xs: '13px', md: '20px' } }}
              >
                {data?.departure_date
                  ? dayjs(data?.departure_date).format('DD.MM.YYYY')
                  : dayjs().format('DD.MM.YYYY')}
              </Typography>
            </Box>
            <Typography fontSize={'19px'} fontWeight={700}>
              {staticData.seat_booking.selected_seats}
              {selectedSeats[value + 1].length > 0
                ? selectedSeats[value + 1].map(
                    (el, ind) =>
                      `${el}${selectedSeats[value + 1].length !== ind + 1 ? ', ' : ''}`,
                  )
                : 0}
            </Typography>
          </Stack>
          <Stack width={'100%'}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label={staticData.seat_booking.float}
                sx={{
                  minHeight: 'auto',
                  mb: 2,
                  '& .MuiTabs-indicator': {
                    display: 'none',
                  },

                  '& .Mui-selected': {
                    backgroundColor: `${theme.palette.info.main}`,
                  },
                  '& .MuiTab-root': {
                    px: 1,
                    py: 0.5,
                    fontSize: '10px',
                    minHeight: '22px',
                    minWidth: '60px',
                    borderRadius: '4px',
                    textTransform: 'none',
                  },
                }}
              >
                <Tab
                  label={`${staticData.seat_booking.float} 1`}
                  {...a11yProps(0)}
                />
                {data?.bus[0]?.second_floor_seats_count > 0 && (
                  <Tab
                    label={`${staticData.seat_booking.float} 2`}
                    {...a11yProps(1)}
                  />
                )}
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <Box>
                  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <BusSeats
                      rows_1={data?.bus[0]?.rows_1}
                      enter_1={data?.bus[0]?.enter_1}
                      rows_2={data?.bus[0]?.rows_2}
                      rows_3={data?.bus[0]?.rows_3}
                      enter_2={data?.bus[0]?.enter_2}
                      seats={firstFloorSeats}
                      seats_start={1}
                      handleCheck={handleCheck}
                      floor={1}
                      is_wc={data?.bus[0]?.wc ? 'yes' : 'no'}
                    />
                  </FormGroup>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box>
                  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <BusSeats
                      rows_1={data?.bus[0]?.rows_4}
                      enter_1={data?.bus[0]?.enter_3}
                      rows_2={data?.bus[0]?.rows_5}
                      seats={secondFloorSeats}
                      seats_start={data?.bus[0]?.first_floor_seats_count + 1}
                      handleCheck={handleCheck}
                      floor={2}
                    />
                  </FormGroup>
                </Box>
              </CustomTabPanel>
            </Box>
          </Stack>
          <Stack
            width={'100%'}
            direction={'row'}
            alignItems={'center'}
            display={'flex'}
            justifyContent={'flex-end'}
          >
            <Button
              sx={{
                p: '8px 24px',
                fontWeight: '400',
                textTransform: 'none',
                fontSize: { sm: '16px', lg: '20px' },
              }}
              variant={'text'}
              onClick={onClose}
            >
              {staticData.cancel_btn.title}
            </Button>

            {addPassengers ? (
              <Button
                sx={{
                  p: '8px 24px',
                  fontWeight: '400',
                  textTransform: 'none',
                  fontSize: { sm: '16px', lg: '20px' },
                }}
                variant={'contained'}
                color={'success'}
                onClick={() => {
                  setSelectedSeats({
                    1: [],
                    2: [],
                  });
                  addPassClick(selectedSeats);
                }}
                disabled={
                  selectedSeats[1].length === 0 && selectedSeats[2].length === 0
                }
              >
                {staticData.select_btn.title}
              </Button>
            ) : (
              <Button
                sx={{
                  p: '8px 24px',
                  fontWeight: '400',
                  textTransform: 'none',
                  fontSize: { sm: '16px', lg: '20px' },
                }}
                variant={'contained'}
                color={'success'}
                LinkComponent={Link}
                href={getLinkHref()}
                disabled={
                  selectedSeats[1].length === 0 && selectedSeats[2].length === 0
                }
              >
                {staticData.select_btn.title}
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </JourneySeatsBookingModal>
  );
};
