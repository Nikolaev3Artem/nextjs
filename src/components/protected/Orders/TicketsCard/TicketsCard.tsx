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

import { IJourney, IRout, ITickets, StopsProps } from '@/interface/IJourney';
import { MainStaticDataProps } from '@/interface/IStaticData';
import dayjs from 'dayjs';
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
import Style from './TicketsCard.module.css';

import MapIcon from '../../../../../public/icons/map-marker.svg';
import FromSvg from '../../../../../public/icons/journey_from.svg';
import ToSvg from '../../../../../public/icons/journey_to.svg';
import FromCircleSvg from '../../../../../public/icons/journey_from_circle.svg';
import BagPersonalSvg from '../../../../../public/icons/bag-personal.svg';
import BagSuitcaseSvg from '../../../../../public/icons/bag-suitcase.svg';
import BagPersonalSvgDisable from '../../../../../public/icons/bag-personal-disable.svg';
import BagSuitcaseSvgDisable from '../../../../../public/icons/bag-suitcase-disable.svg';
import { getTimeDuration } from '@/helpers/getTimeDuration';
import { getCurrency } from '@/helpers/getCurrency';
import { useCurrencyContext } from '@/app/context';
import axios from 'axios';
import { getSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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

const discount = 30;

export const TicketsCard = ({
  staticData,
  data,
  lang,
}: {
  staticData: MainStaticDataProps;
  data: ITickets;
  lang: Locale;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const { selectCurrency } = useCurrencyContext();
  const [rout, setRout] = React.useState<IRout>();
  const router = useRouter();

  const getRout = React.useCallback(async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push(`/${lang}/auth`);
      }
      const id = data?.journey[0]?.routes[0]?.id;

      if (id) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/routes/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + session.access,
            },
          },
        );

        if (response.status === 200) {
          setRout(response.data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }, []);
  React.useEffect(() => {
    getRout().catch(console.error);
  }, [getRout]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const icons = ['wifi', 'conditioning', 'wc', 'seats', 'socket'];

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

  return (
    <Grid item className={Style.wrapper} sx={{ flexDirection: 'column' }}>
      <Card>
        <CardContent sx={{ p: 3, minHeight: '200px' }}>
          <Grid
            container
            columnSpacing={{ sm: 2, md: 3 }}
            sx={{
              rowGap: { xs: 2, sm: 'initial' },
            }}
            height={'100%'}
          >
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Box textAlign={'center'}>
                <Typography
                  color={'primary'}
                  fontWeight={'700'}
                  sx={{ fontSize: { xs: '19px', md: '24px' } }}
                >
                  {staticData.routs_card.seat}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '38px', lg: '40px' },
                    lineHeight: { xs: '53.2px', lg: '56px' },
                  }}
                >
                  {data.reserved_seat}
                </Typography>
                <Box
                  display={'flex'}
                  columnGap={1}
                  sx={{ justifyContent: { xs: 'center' } }}
                >
                  <Typography>{staticData.routs_card.baggage.title}</Typography>
                  <Box width={'24px'} height={'24px'}>
                    {data.additional_baggage === 'BASE' ? (
                      <BagPersonalSvg width={24} height={24} />
                    ) : (
                      <BagPersonalSvgDisable width={24} height={24} />
                    )}
                  </Box>
                  <Box width={'24px'} height={'24px'}>
                    {data.additional_baggage === 'ADDITIONAL_BAGGAGE' ? (
                      <BagSuitcaseSvg width={24} height={24} />
                    ) : (
                      <BagSuitcaseSvgDisable width={24} height={24} />
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              xs={4}
              sm={3}
              md={2}
              lg={1.5}
              minWidth={7}
            >
              <Box>
                <Typography
                  color={'primary'}
                  fontWeight={'700'}
                  sx={{ fontSize: { xs: '19px', md: '24px' } }}
                >
                  {dayjs(data?.journey[0]?.departure_date)
                    .locale(`${lang}`)
                    .format('HH:mm')}
                </Typography>
                <Typography sx={{ fontSize: { xs: '10px', md: '12px' } }}>
                  {dayjs(data?.journey[0]?.departure_date)
                    .locale(`${lang}`)
                    .format('DD.MM.YYYY')}
                </Typography>
              </Box>
              <Box>
                <Typography
                  color={'primary'}
                  fontWeight={'700'}
                  sx={{ fontSize: { xs: '19px', md: '24px' } }}
                >
                  {dayjs(data?.journey[0]?.arrival_date)
                    .locale(`${lang}`)
                    .format('HH:mm')}
                </Typography>
                <Typography sx={{ fontSize: { xs: '10px', md: '12px' } }}>
                  {dayjs(data?.journey[0]?.arrival_date)
                    .locale(`${lang}`)
                    .format('DD.MM.YYYY')}
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{ display: { xs: 'none', md: 'flex' } }}
              item
              flexDirection={'column'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sm={2}
              md={1.5}
            >
              <FromSvg width={24} height={59} />
              <Typography
                sx={{ fontSize: { xs: '10px', md: '12px' }, display: 'flex' }}
              >
                {data?.journey[0]?.routes[0]?.travel_time
                  ? `${String(Math.floor(parseInt(data?.journey[0]?.routes[0]?.travel_time) / 60)).padStart(2, '0')}:${String(parseInt(data?.journey[0]?.routes[0]?.travel_time) % 60).padStart(2, '0')}  ${staticData.routs_card.hour}`
                  : ''}
              </Typography>
              <ToSvg width={24} height={59} />
            </Grid>
            <Grid
              item
              xs={8}
              sm={5}
              md={5.5}
              lg={5}
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
                  {rout ? rout?.cities[0]?.city : ''}
                </Typography>
                <Box display={'flex'} columnGap={1} alignItems={'flex-end'}>
                  <Typography
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                    }}
                  >
                    {rout ? rout?.cities[0]?.address : ''}
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
                  {rout ? rout?.cities[rout?.cities?.length - 1]?.city : ''}
                </Typography>
                <Box display={'flex'} columnGap={1} alignItems={'flex-end'}>
                  <Typography
                    sx={{
                      fontSize: { xs: '10px', md: '12px' },
                    }}
                  >
                    {rout
                      ? rout?.cities[rout?.cities?.length - 1]?.address
                      : ''}
                  </Typography>
                  <Box width={'20px'} height={'20px'}>
                    <MapIcon width={20} height={20} />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              lg={2}
              sx={{
                display: { xs: 'flex', sm: 'none', lg: 'flex' },
                alignItems: { xs: 'center', lg: 'flex-start' },
                mx: { xs: 'auto', lg: 'initial' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  columnGap: 5,
                  rowGap: 1,
                  flexDirection: { xs: 'row', lg: 'column' },
                }}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  rowGap={1}
                  sx={{
                    flexDirection: { xs: 'row', lg: 'column' },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '13px', md: '16px' },
                    }}
                    mr={1}
                  >
                    {staticData.routs_card.conveniences}
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} columnGap={1}>
                    {icons.map((el, ind) => {
                      const icon = getIconByName(
                        el,
                        staticData.routs_card.conveniences_icon,
                      );
                      return (
                        <Image
                          key={ind}
                          alt={icon?.aria || ''}
                          src={`/icons/${icon?.icon}` || ''}
                          width={16}
                          height={16}
                        />
                      );
                    })}
                  </Box>
                </Box>
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
            flexDirection: { xs: 'row', sm: 'row' },
            justifyContent: { xs: 'space-between' },
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

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex', md: 'none' },
              columnGap: 5,
              rowGap: 1,
              flexDirection: { xs: 'row', lg: 'row' },
            }}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              rowGap={1}
              sx={{
                flexDirection: { xs: 'row', lg: 'row' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '13px', md: '16px' },
                }}
                mr={1}
              >
                {staticData.routs_card.duration}
              </Typography>

              <Typography
                component={'span'}
                sx={{
                  fontSize: { xs: '13px', md: '16px' },
                }}
              >
                {getTimeDuration(data?.arrival_date, data?.departure_date)}
              </Typography>
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
            <Grid container rowSpacing={4} columnSpacing={2}>
              <Grid item sm={5} md={3} lg={3}>
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
                    {rout?.cities[0].city} -
                  </Typography>
                  <Typography
                    component={'span'}
                    sx={{ fontSize: { xs: '13px', md: '16px' } }}
                  >
                    {rout?.cities[rout?.cities?.length - 1].city}
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

                    {rout?.cities &&
                      rout?.cities?.slice(1, -1)?.length > 0 &&
                      rout?.cities?.slice(1, -1)?.map((el, ind) => {
                        return (
                          <Box
                            component={'li'}
                            display={'flex'}
                            columnGap={1}
                            alignItems={'center'}
                            key={ind}
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
                    {rout?.cities &&
                      rout?.cities?.map((stop: StopsProps, ind) => {
                        return (
                          <Box
                            component={'li'}
                            display={'flex'}
                            columnGap={1}
                            alignItems={'center'}
                            key={ind}
                          >
                            <Typography
                              sx={{ fontSize: { xs: '13px', md: '16px' } }}
                            >
                              {stop.city}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={7} md={9} lg={9}>
                <Grid
                  columnSpacing={3}
                  container
                  display={'flex'}
                  sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    rowGap: 1,
                  }}
                >
                  <Grid item display={'flex'} flexDirection={'column'} md={6}>
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
                    <Box
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                        columnGap: 5,
                        rowGap: 1,
                        flexDirection: { xs: 'row', lg: 'row' },
                      }}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        rowGap={1}
                        sx={{
                          flexDirection: { xs: 'row', lg: 'row' },
                          mt: { md: 'auto' },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '13px', md: '16px' },
                          }}
                          mr={1}
                        >
                          {staticData.routs_card.conveniences}
                        </Typography>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          columnGap={1}
                        >
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
                    </Box>
                  </Grid>

                  <Grid item display={'flex'} flexDirection={'column'} md={6}>
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

                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      columnGap={2}
                      sx={{ mt: { xs: 2, sm: 0, md: 'auto' } }}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        columnGap={'14px'}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '13px', md: '16px' },
                          }}
                        >
                          {staticData.routs_card.price}
                        </Typography>
                        <Box display={'flex'} columnGap={0.5}>
                          <Typography
                            color={'primary'}
                            sx={{ fontSize: { xs: '13px', md: '16px' } }}
                          >
                            {data && data.passanger_type === 'child'
                              ? `${typeof data?.journey[0]?.routes[0]?.price === 'number' ? data?.journey[0]?.routes[0]?.price - discount : data?.journey[0]?.routes[0]?.price}`
                              : `${data?.journey[0]?.routes[0]?.price ?? 0}`}
                          </Typography>
                          <Typography
                            color={'primary'}
                            sx={{ fontSize: { xs: '13px', md: '16px' } }}
                          >
                            {`${getCurrency(selectCurrency)}`}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        sx={{
                          p: '4px 8px',
                          fontWeight: '400',
                          textTransform: 'none',
                          fontSize: '12px',
                          backgroundColor: '#B22234',
                          ml: { xs: 'auto' },
                          '&:hover': {
                            backgroundColor: '#DD5407',
                          },
                        }}
                        variant={'contained'}
                        LinkComponent={Link}
                        href={`/${lang}${staticData.routs_card.cancellation_btn.href}`}
                      >
                        {staticData.routs_card.cancellation_btn.title}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
