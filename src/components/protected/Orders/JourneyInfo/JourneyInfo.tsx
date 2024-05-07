import { Locale } from '@/i18n.config';

import { Box, Divider, Grid, Typography } from '@mui/material';

import MapIcon from '../../../../../public/icons/map-marker.svg';

import ToSvg from '../../../../../public/icons/journey_to.svg';
import FromCircleSvg from '../../../../../public/icons/journey_from_circle.svg';
import ClockSvg from '../../../../../public/icons/clock.svg';

import CalendarIcon from '../../../../../public/icons/calendar-month.svg';

import { orderStaticData } from '@/interface/IStaticData';
import { IJourney } from '@/interface/IJourney';
import dayjs from 'dayjs';
import { getTimeDuration } from '@/helpers/getTimeDuration';

export const JourneyInfo = ({
  data,
  staticData,
  lang,
}: {
  data: IJourney;
  staticData: orderStaticData;
  lang: Locale;
}) => {
  return (
    <Grid item width={'100%'}>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{
          rowGap: { xs: 2 },
        }}
        height={'100%'}
      >
        <Grid
          sx={{ display: { xs: 'flex' } }}
          item
          flexDirection={'column'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          xs={2}
          sm={1}
          md={1.5}
          maxWidth={'30px'}
        >
          <Box width={'24px'} height={'24px'} display={'flex'}>
            <FromCircleSvg width={24} height={24} />
          </Box>
          <ToSvg width={24} height={59} />
        </Grid>
        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          rowGap={1}
          xs={10}
          sm={11}
          md={10.5}
          minWidth={7}
        >
          <Box>
            <Typography
              color={'primary'}
              fontWeight={'700'}
              sx={{ fontSize: { xs: '19px', md: '24px' } }}
            >
              {data?.routes[0]?.cities[0].city}
            </Typography>
            <Box display={'flex'} columnGap={1} alignItems={'center'}>
              <Typography
                sx={{
                  fontSize: { xs: '10px', md: '12px' },
                }}
              >
                {data?.routes[0]?.cities[0].address}
              </Typography>
              <Box width={'20px'} height={'20px'}>
                <MapIcon width={20} height={20} />
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              color={'primary'}
              fontWeight={'700'}
              sx={{ fontSize: { xs: '19px', md: '24px' } }}
            >
              {data?.routes[0]?.cities[data?.routes[0]?.cities.length - 1].city}
            </Typography>
            <Box display={'flex'} columnGap={1} alignItems={'center'}>
              <Typography
                sx={{
                  fontSize: { xs: '10px', md: '12px' },
                }}
              >
                {
                  data?.routes[0]?.cities[data?.routes[0]?.cities.length - 1]
                    .address
                }
              </Typography>
              <Box width={'20px'} height={'20px'}>
                <MapIcon width={20} height={20} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} display={'flex'} alignItems={'center'} columnGap={1}>
          <Box width={'24px'} height={'24px'} display={'flex'}>
            <CalendarIcon width={24} height={24} />
          </Box>
          <Typography
            color={'primary'}
            sx={{ fontSize: { xs: '20px', md: '20px' } }}
          >
            {data?.arrival_date
              ? dayjs(data.arrival_date).format('DD.MM.YYYY')
              : ''}
          </Typography>
          <Box width={'24px'} height={'24px'} display={'flex'}>
            <ClockSvg width={24} height={24} />
          </Box>
          <Typography
            color={'primary'}
            sx={{ fontSize: { xs: '20px', md: '20px' } }}
          >
            {data?.departure_date
              ? dayjs(data.departure_date).format('HH:mm')
              : ''}
          </Typography>
        </Grid>
        <Box width={'100%'}>
          <Divider color={'#BFBFBF'} flexItem />
        </Box>

        <Grid item xs={12} display={'flex'}>
          <Typography
            color={'primary'}
            fontWeight={700}
            sx={{ fontSize: { xs: '16px', md: '20px' } }}
          >
            {staticData.orderForm.bus}
            <Typography
              component={'span'}
              color={'primary'}
              sx={{ fontSize: { xs: '16px', md: '20px' } }}
            >
              {data?.bus ? data.bus[0].name : ''}
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs={12} display={'flex'}>
          <Typography
            color={'primary'}
            fontWeight={700}
            sx={{ fontSize: { xs: '16px', md: '20px' } }}
          >
            {staticData.orderForm.duration}
            <Typography
              component={'span'}
              color={'primary'}
              sx={{ fontSize: { xs: '16px', md: '20px' } }}
            >
              {getTimeDuration(data?.arrival_date, data?.departure_date)}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} display={'flex'}>
          <Typography
            color={'primary'}
            fontWeight={700}
            sx={{ fontSize: { xs: '16px', md: '20px' } }}
            display={'inline-flex'}
            columnGap={1}
          >
            {staticData.orderForm.journey}
            <Typography
              component={'span'}
              color={'primary'}
              sx={{ fontSize: { xs: '16px', md: '20px' } }}
            >
              {data?.routes ? data.routes[0].cities[0].city : ''}
            </Typography>
            <Typography
              component={'span'}
              color={'primary'}
              sx={{ fontSize: { xs: '16px', md: '20px' } }}
            >
              {data?.routes
                ? data.routes[0]?.cities[data.routes[0]?.cities.length - 1].city
                : ''}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display={'flex'} columnGap={2}>
            <Box
              component={'ul'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <Box width={'12px'} height={'13px'} display={'flex'}>
                <FromCircleSvg width={12} height={13} />
              </Box>

              {data.routes[0]?.cities?.slice(1, -1)?.length > 0 &&
                data.routes[0]?.cities?.slice(1, -1)?.map((el, ind) => {
                  return (
                    <Box
                      key={ind}
                      component={'li'}
                      display={'flex'}
                      columnGap={1}
                      alignItems={'center'}
                    >
                      <Box width={'12px'} height={'32px'} display={'flex'}>
                        <ToSvg width={12} height={32} />
                      </Box>
                    </Box>
                  );
                })}
              <Box width={'12px'} height={'31px'} display={'flex'}>
                <ToSvg />
              </Box>
            </Box>
            <Box
              component={'ul'}
              display={'flex'}
              rowGap={'12px'}
              flexDirection={'column'}
              sx={{ rowGap: { xs: '8px', md: '6px' } }}
            >
              {data.routes[0].cities &&
                data.routes[0].cities.map(stop => {
                  return (
                    <Box
                      key={stop.id}
                      component={'li'}
                      display={'flex'}
                      columnGap={1}
                      alignItems={'center'}
                    >
                      <Typography sx={{ fontSize: { xs: '16px', md: '16px' } }}>
                        {stop.city}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Grid>
        <Box width={'100%'}>
          <Divider color={'#BFBFBF'} flexItem />
        </Box>
      </Grid>
    </Grid>
  );
};
