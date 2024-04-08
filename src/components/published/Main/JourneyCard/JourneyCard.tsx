'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import theme from '@/theme';
import { Locale } from '@/i18n.config';

import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { IJourney } from '@/interface/IJourney';
import { MainStaticDataProps } from '@/interface/IStaticData';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Style from './JourneyCard.module.css';

import MapIcon from '../../../../../public/icons/map-marker.svg';
import FromSvg from '../../../../../public/icons/journey_from.svg';
import ToSvg from '../../../../../public/icons/journey_to.svg';
import FromCircleSvg from '../../../../../public/icons/journey_from_circle.svg';
import BagPersonalSvg from '../../../../../public/icons/bag-personal.svg';
import BagSuitcaseSvg from '../../../../../public/icons/bag-suitcase.svg';
import { SeatsBooking } from '@/components/published/Main/SeatsBooking';
import dayjs from 'dayjs';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme: any; expand: any }) => ({
  padding: 0,
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',

  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const JourneyCard = ({
  staticData,
  data,
  lang,
  date,
}: {
  staticData: MainStaticDataProps;
  data: IJourney;
  lang: Locale;
  date?: string;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isShowModal, setIsShowModal] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const icons = ['wifi', 'conditioning', 'wc', 'seats', 'socket'];
  console.log(data);
  interface ConveniencesIconProp {
    icon: string;
    name: string;
    aria: string;
  }

  interface ConveniencesIcons {
    [key: string]: ConveniencesIconProp;
  }

  function getIconByName(name: string, icons: ConveniencesIcons) {
    const iconData = icons[name];
    if (iconData) {
      return iconData;
    }
    return null;
  }

  const handleBookingClick = () => {
    setIsShowModal(true);
  };

  const handleBookingClose = () => {
    setIsShowModal(false);
  };
  console.log(data);
  return (
    <>
      <Grid item className={Style.wrapper} sx={{ flexDirection: 'column' }}>
        <Card>
          <CardContent sx={{ p: 3, minHeight: '250px' }}>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              sx={{
                rowGap: { xs: 2, sm: 'initial' },
              }}
              height={'100%'}
            >
              <Grid
                item
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                xs={4}
                sm={2}
                md={1.5}
                xl={1}
                minWidth={7}
              >
                <Box>
                  <Typography
                    color={'primary'}
                    fontWeight={'700'}
                    sx={{ fontSize: { xs: '19px', md: '24px' } }}
                  >
                    {data?.departure_date
                      ? dayjs(data?.departure_date).format('HH:mm')
                      : dayjs().format('HH:mm')}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '10px', md: '12px' } }}>
                    {data?.departure_date
                      ? dayjs(data?.departure_date)
                          .locale(`${lang}`)
                          .format('DD MMMM')
                      : dayjs().locale(`${lang}`).format('DD MMMM')}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color={'primary'}
                    fontWeight={'700'}
                    sx={{ fontSize: { xs: '19px', md: '24px' } }}
                  >
                    {data?.arrival_date
                      ? dayjs(data?.arrival_date).format('HH:mm')
                      : dayjs().format('HH:mm')}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '10px', md: '12px' } }}>
                    {data?.arrival_date
                      ? dayjs(data?.arrival_date)
                          .locale(`${lang}`)
                          .format('DD MMMM')
                      : dayjs().locale(`${lang}`).format('DD MMMM')}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                item
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sm={2}
                md={1.5}
                xl={1}
              >
                <FromSvg width={24} height={59} />
                <Typography
                  sx={{ fontSize: { xs: '10px', md: '12px' }, display: 'flex' }}
                >
                  {dayjs(
                    dayjs(data?.departure_time).diff(dayjs(data?.arrival_time)),
                  )
                    .locale(`${lang}`)
                    .format('HH:mm')}
                  {staticData.routs_card.hour}
                </Typography>
                <ToSvg width={24} height={59} />
              </Grid>
              <Grid
                item
                xs={8}
                sm={3}
                md={4}
                lg={4}
                display={'flex'}
                sx={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  rowGap: { xs: 2 },
                }}
              >
                <Box>
                  <Typography
                    color={'primary'}
                    fontWeight={'700'}
                    sx={{ fontSize: { xs: '19px', md: '24px' } }}
                  >
                    {data?.routes[0]?.from_place}
                  </Typography>
                  <Box display={'flex'} columnGap={1}>
                    <Typography
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                      }}
                    >
                      {/* {data.departure_date} */} Двірцева площа, 1, Львів,
                      Львівська область
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
                    {data.routes[0].to_place}
                  </Typography>
                  <Box display={'flex'} columnGap={1}>
                    <Typography
                      sx={{
                        fontSize: { xs: '10px', md: '12px' },
                      }}
                    >
                      {/* {data.departure_date} */} Lisboa 1100-341, 1100-341
                      Buenos Aires
                    </Typography>
                    <Box width={'20px'} height={'20px'}>
                      <MapIcon width={20} height={20} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  ml: 'auto',
                  mr: { xs: 'auto', sm: 'initial' },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    columnGap: 5,
                    rowGap: 1,
                    flexDirection: { xs: 'column', lg: 'row' },
                  }}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    columnGap={'14px'}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '16px', lg: '20px' },
                      }}
                    >
                      {staticData.routs_card.price}
                    </Typography>
                    <Box display={'flex'} columnGap={1}>
                      <Typography
                        color={'primary'}
                        fontWeight={'700'}
                        sx={{ fontSize: { xs: '19px', sm: '24px' } }}
                      >
                        {data.routes[0].price}
                      </Typography>
                      <Typography
                        color={'primary'}
                        fontWeight={'700'}
                        display={'flex'}
                        sx={{ fontSize: { xs: '19px', sm: '24px' } }}
                      >
                        UAH
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      p: '8px 16px',
                      fontWeight: '400',
                      textTransform: 'none',
                      fontSize: { sm: '16px', lg: '20px' },
                    }}
                    fullWidth
                    variant={'contained'}
                    color={'success'}
                    onClick={handleBookingClick}
                  >
                    {staticData.routs_card.booking_btn.title}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              bgcolor: '#E5E5E5',
              px: 3,
              py: '10px',
              display: 'flex',
              columnGap: { sm: 4, lg: 8 },
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box display={'flex'}>
              <Typography
                sx={{ fontWeight: 700, fontSize: { xs: '13px', md: '16px' } }}
                mr={1}
              >
                {staticData.routs_card.number}
              </Typography>
              <Typography
                component={'span'}
                sx={{ fontSize: { xs: '13px', md: '16px' } }}
              >
                {data.id}
              </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography
                sx={{ fontWeight: 700, fontSize: { xs: '13px', md: '16px' } }}
                mr={1}
              >
                {staticData.routs_card.conveniences}
              </Typography>
              <Box display={'flex'} alignItems={'center'} columnGap={1}>
                {icons.map(el => {
                  const icon = getIconByName(
                    el,
                    staticData.routs_card.conveniences_icon,
                  );
                  return (
                    <Image
                      alt={icon?.aria || ''}
                      src={`/icons/${icon?.icon}` || ''}
                      width={16}
                      height={16}
                      key={icon?.name}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box
              onClick={handleExpandClick}
              display={'flex'}
              alignItems={'center'}
              columnGap={1}
              sx={{
                cursor: 'pointer',
                ml: { sm: 'auto' },
              }}
            >
              <Typography
                color={theme.palette.secondary.main}
                sx={{ fontSize: { xs: '13px', md: '16px' } }}
              >
                {staticData.routs_card.read_more_btn.title}
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ py: 0, color: '#404040' }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={Style.collapse} sx={{ p: 3 }}>
              <Grid container rowSpacing={4}>
                <Grid item sm={5} md={4} lg={3}>
                  <Box display={'flex'} mb={1}>
                    <Typography
                      sx={{
                        mr: 1,
                        fontWeight: 700,
                        fontSize: { xs: '13px', md: '16px' },
                      }}
                    >
                      {staticData.routs_card.routs}
                    </Typography>
                    <Typography
                      component={'span'}
                      sx={{ fontSize: { xs: '13px', md: '16px' }, mr: 1 }}
                    >
                      {data.routes[0].from_place}
                    </Typography>
                    <Typography
                      component={'span'}
                      sx={{ fontSize: { xs: '13px', md: '16px' } }}
                    >
                      {data.routes[0].to_place}
                    </Typography>
                  </Box>
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

                      {data.routes[0].stops &&
                        data.routes[0].stops.map((el, ind) => {
                          return (
                            <Box
                              key={ind}
                              component={'li'}
                              display={'flex'}
                              columnGap={1}
                              alignItems={'center'}
                            >
                              <Box
                                width={'12px'}
                                height={'32px'}
                                display={'flex'}
                              >
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
                      sx={{ rowGap: { xs: '12px', md: '6px' } }}
                    >
                      <Box
                        component={'li'}
                        display={'flex'}
                        columnGap={1}
                        alignItems={'center'}
                      >
                        <Typography
                          sx={{ fontSize: { xs: '13px', md: '16px' } }}
                        >
                          {data.routes[0].from_place}
                        </Typography>
                      </Box>
                      {data.routes[0].stops &&
                        data.routes[0].stops.map(stop => {
                          return (
                            <Box
                              key={stop.id}
                              component={'li'}
                              display={'flex'}
                              columnGap={1}
                              alignItems={'center'}
                            >
                              <Typography
                                sx={{ fontSize: { xs: '13px', md: '16px' } }}
                              >
                                {stop.city}
                              </Typography>
                            </Box>
                          );
                        })}
                      <Box
                        component={'li'}
                        display={'flex'}
                        columnGap={1}
                        alignItems={'center'}
                      >
                        <Typography
                          sx={{ fontSize: { xs: '13px', md: '16px' } }}
                        >
                          {data.routes[0].to_place}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={7} md={8} lg={9}>
                  <Grid
                    columnSpacing={10}
                    container
                    display={'flex'}
                    sx={{
                      flexDirection: { sm: 'column', md: 'row' },
                      rowGap: 1,
                    }}
                  >
                    <Grid item display={'flex'} flexDirection={'column'} md={5}>
                      <Typography
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                          fontSize: { xs: '13px', md: '16px' },
                        }}
                      >
                        {staticData.routs_card.baggage.title}
                      </Typography>
                      <Box display={'flex'} mb={1}>
                        <Box width={24} height={24}>
                          <BagPersonalSvg width={24} height={24} />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: { xs: '13px', md: '16px' },
                            ml: 1,
                          }}
                        >
                          {staticData.routs_card.baggage.light_luggage}
                        </Typography>
                      </Box>
                      <Box display={'flex'}>
                        <Box width={24} height={24}>
                          <BagSuitcaseSvg width={24} height={24} />
                        </Box>

                        <Typography
                          sx={{
                            fontSize: { xs: '13px', md: '16px' },
                            ml: 1,
                          }}
                        >
                          {staticData.routs_card.baggage.heavy_luggage}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item display={'flex'} flexDirection={'column'} md={7}>
                      <Typography
                        sx={{
                          mb: 1,
                          fontWeight: 700,
                          fontSize: { xs: '13px', md: '16px' },
                        }}
                      >
                        {staticData.routs_card.cancellation}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '13px', md: '16px' },
                          mb: 1,
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            staticData.routs_card.cancellation_info.text.replace(
                              /%(\s|$)/g,
                              '%<br/>',
                            ),
                        }}
                      />
                      <Link
                        href={`/${lang}${staticData.routs_card.cancellation_info.href}`}
                      >
                        <Typography
                          color={theme.palette.secondary.main}
                          sx={{
                            fontSize: { xs: '13px', md: '16px' },
                          }}
                        >
                          {staticData.routs_card.cancellation_info.title}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <SeatsBooking
        data={data}
        onClose={handleBookingClose}
        isShowModal={isShowModal}
        staticData={staticData}
        date={date}
        lang={lang}
      />
    </>
  );
};
