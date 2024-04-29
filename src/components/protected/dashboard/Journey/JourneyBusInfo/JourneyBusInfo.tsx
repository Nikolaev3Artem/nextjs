import { IJourney } from '@/interface/IJourney';
import { dashboardJourneyStaticData } from '@/interface/IStaticData';
import {
  Box,
  FormGroup,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { CalendarIcon, ClockIcon } from '@mui/x-date-pickers';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import dayjs from 'dayjs';
import Image from 'next/image';
import theme from '@/theme';
import BusSeats from '@/components/common/BusSeats/BusSeats';

const handleCheck = (seatNumber: number, floor: number) => {
  //   setSelectedSeats(prevSelectedSeats => ({
  //     ...prevSelectedSeats,
  //     [floor]: prevSelectedSeats[floor].includes(seatNumber)
  //       ? prevSelectedSeats[floor].filter(seatId => seatId !== seatNumber)
  //       : [...prevSelectedSeats[floor], seatNumber],
  //   }));
  //   if (floor === 1) {
  //     setFirstFloorSeats(prevState => {
  //       const updatedSeats = prevState?.map(seat => {
  //         if (seat.seat === seatNumber) {
  //           if (seat.status === 'Selected') {
  //             return { ...seat, status: 'Empty' };
  //           }
  //           return { ...seat, status: 'Selected' };
  //         }
  //         return seat;
  //       });
  //       return updatedSeats;
  //     });
  //   }
  //   if (floor === 2) {
  //     setSecondFloorSeats(prevState => {
  //       const updatedSeats = prevState?.map(seat => {
  //         if (seat.seat === seatNumber) {
  //           if (seat.status === 'Selected') {
  //             return { ...seat, status: 'Empty' };
  //           }
  //           return { ...seat, status: 'Selected' };
  //         }
  //         return seat;
  //       });
  //       return updatedSeats;
  //     });
  //   }
};

const handleSeatBlock = () => {
  // оновити статус квитка на reserved
  //   return console.log('click', selectedSeats);
};

export const JourneyBusInfo = ({
  journey,
  staticData,
  setFloat,
  float,
}: {
  journey: IJourney;
  staticData: dashboardJourneyStaticData;
  setFloat: any;
  float: number;
}) => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const getSeatsCount = (status: string) => {
    return float == 1
      ? journey.bus[0]?.first_floor_seats?.filter(el => el.status === status)
          .length || 0
      : journey.bus[0]?.second_floor_seats?.filter(el => el.status === status)
          .length || 0;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFloat(newValue + 1);
  };

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
        {value === index && (
          <Box sx={{ width: '100%', display: 'flex', flexWrap: 'nowrap' }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <Stack direction={'column'} spacing={1}>
      <Stack>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '140%',
          }}
        >
          {journey?.routes[0]?.cities[0]?.city}-
          {
            journey?.routes[0]?.cities[journey?.routes[0]?.cities.length - 1]
              ?.city
          }
        </Typography>
      </Stack>

      <Stack direction={'row'} columnGap={1}>
        <Stack alignItems={'start'} direction={'row'} columnGap={1}>
          <Box height={16} width={16} mr={1}>
            <CalendarMonthOutlinedIcon
              height={16}
              width={16}
              sx={{ fill: '#404040' }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '140%',
            }}
          >
            {dayjs(journey.departure_date).format('DD.MM.YYYY')}
          </Typography>
        </Stack>
        <Stack alignItems={'start'} direction={'row'} columnGap={1}>
          <Box height={16} width={16} mr={1}>
            <ClockIcon height={16} width={16} sx={{ color: '#404040' }} />
          </Box>

          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '140%',
            }}
          >
            {dayjs(journey.departure_date).format('HH:mm')}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography
          sx={{
            fontSize: '12px',
            lineHeight: '140%',
          }}
        >
          {journey.bus[0].name}
        </Typography>
      </Stack>
      <Stack height={'170px'} position={'relative'} width={'250px'}>
        {journey.bus[0].photo ? (
          <Image
            style={{
              borderRadius: '4px',
              objectFit: 'cover',
            }}
            src={
              journey.bus[0].photo
                ? `http://api.lehendatrans.com${journey.bus[0].photo}`
                : ''
            }
            // width={852}
            // height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            quality={100}
            alt={`${staticData.journeyTable.bus}`}
          />
        ) : (
          <Skeleton height={200} />
        )}
      </Stack>
      <Stack width={'100%'}>
        <Box>
          <Tabs
            value={float - 1}
            onChange={handleChange}
            aria-label={staticData.journeyTable.float}
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
              label={`${staticData.journeyTable.float} 1`}
              {...a11yProps(0)}
            />

            <Tab
              label={`${staticData.journeyTable.float} 2`}
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={float - 1} index={0}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid #BFBFBF',
                borderRadius: '4px',
                width: 'fit-content',
                padding: '8px',
              }}
            >
              <BusSeats
                rows_1={journey?.bus[0]?.rows_1}
                rows_2={journey?.bus[0]?.rows_2}
                rows_3={journey?.bus[0]?.rows_3}
                is_wc={journey?.bus[0]?.wc ? 'yes' : 'no'}
                enter_2={journey?.bus[0]?.enter_2}
                enter_1={journey?.bus[0]?.enter_1}
                seats={journey?.bus[0]?.first_floor_seats}
                seats_start={1}
                floor={1}
                small
                handleCheck={handleCheck}
                vertical
              />
            </FormGroup>
            <Box
              ml={'12px'}
              sx={{
                display: 'flex',
                rowGap: 0.5,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                display={'flex '}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Typography fontSize={'10px'}>
                  {staticData.journeyTable.seats_status.available}
                </Typography>
                <Box
                  width={'24px'}
                  height={'24px'}
                  bgcolor={'#808080'}
                  borderRadius={1}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Typography fontSize={'10px'} color={'white'}>
                    {getSeatsCount('EMPTY')}
                  </Typography>
                </Box>
              </Box>

              <Box
                display={'flex '}
                columnGap={0.5}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Typography fontSize={'10px'}>
                  {staticData.journeyTable.seats_status.reserved}
                </Typography>
                <Box
                  width={'24px'}
                  height={'24px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  bgcolor={theme.palette.error.main}
                  borderRadius={1}
                >
                  <Typography fontSize={'10px'} color={'white'}>
                    {getSeatsCount('RESERVED')}
                  </Typography>
                </Box>
              </Box>

              <Box
                display={'flex '}
                columnGap={0.5}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Typography fontSize={'10px'}>
                  {staticData.journeyTable.seats_status.payed}
                </Typography>
                <Box
                  width={'24px'}
                  height={'24px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  bgcolor={theme.palette.success.main}
                  borderRadius={1}
                >
                  <Typography fontSize={'10px'} color={'white'}>
                    {getSeatsCount('PAYED')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={float - 1} index={1}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid #BFBFBF',
                borderRadius: '4px',
                width: 'fit-content',
                padding: '8px',
              }}
            >
              <BusSeats
                rows_1={journey?.bus[0]?.rows_4}
                rows_2={journey?.bus[0]?.rows_5}
                enter_1={journey?.bus[0]?.enter_3}
                // seats={selectedBus?.second_floor_seats}
                seats_start={journey?.bus[0]?.first_floor_seats_count + 1 || 0}
                floor={2}
                small
                handleCheck={handleCheck}
                seats={journey?.bus[0]?.second_floor_seats}
                vertical
              />
            </FormGroup>
          </CustomTabPanel>
        </Box>
      </Stack>
    </Stack>
  );
};
