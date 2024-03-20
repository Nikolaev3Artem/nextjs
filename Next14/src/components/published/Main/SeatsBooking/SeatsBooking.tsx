import { JourneySeatsBookingModal } from '@/components/published/Main/JourneySeatsBookingModal';

import { IJourney } from '@/interface/IJourney';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { grey } from '@mui/material/colors';
import { Box, Button, Stack, Typography } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { IoMdArrowForward } from 'react-icons/io';
import { MdCalendarMonth } from 'react-icons/md';
import dayjs from 'dayjs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import theme from '@/theme';
import Link from 'next/link';
import { Locale } from '@/i18n.config';

const color_title = grey[800];

export const SeatsBooking = ({
  data,
  onClose,
  isShowModal,
  staticData,
  date,
  lang,
}: {
  data: IJourney;
  date: string;
  onClose: () => void;
  isShowModal: boolean;
  staticData: MainStaticDataProps;
  lang: Locale;
}) => {
  const getColor = (name: string) => {
    switch (name) {
      case 'available':
        return '#BFBFBF';
      case 'occupied':
        return '#7ADB6A';
      case 'selected':
        return '#296FCA';
      default:
        return '#BFBFBF';
    }
  };
  console.log(data);

  const first_floor = [
    { id: 1, seat: 1, status: 'EMPTY' },
    { id: 2, seat: 2, status: 'EMPTY' },
    { id: 3, seat: 3, status: 'EMPTY' },
    { id: 4, seat: 4, status: 'EMPTY' },
    { id: 5, seat: 5, status: 'EMPTY' },
    { id: 6, seat: 6, status: 'ORDERED' },
    { id: 7, seat: 7, status: 'EMPTY' },
    { id: 8, seat: 8, status: 'EMPTY' },
    { id: 9, seat: 9, status: 'EMPTY' },
    { id: 10, seat: 10, status: 'EMPTY' },
    { id: 11, seat: 11, status: 'EMPTY' },
    { id: 12, seat: 12, status: 'ORDERED' },
    { id: 13, seat: 13, status: 'EMPTY' },
    { id: 14, seat: 14, status: 'EMPTY' },
    { id: 15, seat: 15, status: 'EMPTY' },
    { id: 16, seat: 16, status: 'EMPTY' },
    { id: 17, seat: 17, status: 'EMPTY' },
    { id: 18, seat: 18, status: 'EMPTY' },
    { id: 19, seat: 19, status: 'EMPTY' },
    { id: 20, seat: 20, status: 'ORDERED' },
    { id: 21, seat: 21, status: 'EMPTY' },
    { id: 22, seat: 22, status: 'EMPTY' },
    { id: 23, seat: 23, status: 'EMPTY' },
    { id: 24, seat: 24, status: 'EMPTY' },
  ];

  const second_floor = [
    { id: 1, seat: 1, status: 'EMPTY' },
    { id: 2, seat: 2, status: 'EMPTY' },
    { id: 3, seat: 3, status: 'ORDERED' },
    { id: 4, seat: 4, status: 'EMPTY' },
    { id: 5, seat: 5, status: 'EMPTY' },
    { id: 6, seat: 6, status: 'EMPTY' },
    { id: 7, seat: 7, status: 'EMPTY' },
    { id: 8, seat: 8, status: 'EMPTY' },
    { id: 9, seat: 9, status: 'EMPTY' },
    { id: 10, seat: 10, status: 'EMPTY' },
    { id: 11, seat: 11, status: 'EMPTY' },
    { id: 12, seat: 12, status: 'EMPTY' },
    { id: 13, seat: 13, status: 'EMPTY' },
    { id: 14, seat: 14, status: 'ORDERED' },
    { id: 15, seat: 15, status: 'EMPTY' },
    { id: 16, seat: 16, status: 'EMPTY' },
    { id: 17, seat: 17, status: 'EMPTY' },
    { id: 18, seat: 18, status: 'EMPTY' },
    { id: 19, seat: 19, status: 'EMPTY' },
    { id: 20, seat: 20, status: 'EMPTY' },
    { id: 21, seat: 21, status: 'EMPTY' },
    { id: 22, seat: 22, status: 'EMPTY' },
    { id: 23, seat: 23, status: 'EMPTY' },
    { id: 24, seat: 24, status: 'ORDERED' },
  ];

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

  const handleCheck = (id: number, floor: number) => {
    setSelectedSeats(prevSelectedSeats => ({
      ...prevSelectedSeats,
      [floor]: prevSelectedSeats[floor].includes(id)
        ? prevSelectedSeats[floor].filter(seatId => seatId !== id)
        : [...prevSelectedSeats[floor], id],
    }));
  };

  const getLinkHref = () => {
    const nonEmptySeats = Object.fromEntries(
      Object.entries(selectedSeats).filter(([_, value]) => value.length > 0),
    );
    const queryParams = new URLSearchParams();
    queryParams.set('selectedSeats', JSON.stringify(nonEmptySeats));
    queryParams.set('routId', `${data.id}`);
    const pathWithParams = `/${lang}/my-order/new-order?${queryParams}`;
    return pathWithParams;
  };
  return (
    <JourneySeatsBookingModal onClose={onClose} isShowModal={isShowModal}>
      <Box>
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
            direction={'row'}
            alignItems={'center'}
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
              {staticData.seat_booking.seats.map(el => {
                return (
                  <Box
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
            direction={'row'}
            alignItems={'center'}
            display={'flex'}
            justifyContent={'space-between'}
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
                {data.routes[0].from_place}
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
                {data.routes[0].to_place}
              </Typography>

              <MdCalendarMonth width={'24px'} height={'24px'} />

              <Typography
                color={'primary'}
                sx={{ fontSize: { xs: '13px', md: '20px' } }}
              >
                {date
                  ? dayjs(date).format('DD.MM.YYYY')
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
                {data.bus[0].second_floor_seats_count > 0 && (
                  <Tab
                    label={`${staticData.seat_booking.float} 2`}
                    {...a11yProps(1)}
                  />
                )}
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <Box>
                  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    {data.bus[0].first_floor_seats.map(el => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() => handleCheck(el.seat, 1)}
                              checked={selectedSeats[1].includes(el.seat)}
                            />
                          }
                          label={`${el.seat}`}
                          sx={{ width: '60px' }}
                          disabled={el.status === 'ORDERED'}
                        />
                      );
                    })}
                  </FormGroup>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box>
                  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    {data.bus[0].second_floor_seats.map(el => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() => handleCheck(el.seat, 2)}
                              checked={selectedSeats[2].includes(el.seat)}
                            />
                          }
                          label={`${el.seat}`}
                          sx={{ width: '60px' }}
                          disabled={el.status === 'ORDERED'}
                        />
                      );
                    })}
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
            >
              {staticData.select_btn.title}
            </Button>
          </Stack>
        </Box>
      </Box>
    </JourneySeatsBookingModal>
  );
};
