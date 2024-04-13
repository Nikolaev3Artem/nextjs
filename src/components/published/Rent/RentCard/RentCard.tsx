'use client';

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import axios from 'axios';

import React, { useState } from 'react';

import { IRent } from '@/interface/IRent';

import CardInfo from '@/components/published/Rent/CardInfo/CardInfo';

import Style from './rentcard.module.css';
import { BusRentStaticDataPageProp } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';

const color = grey[700];
const colorHeading = grey[900];

interface Rent {
  id: number | undefined;
  name?: string;
  photo?: any;
  images_list?: {
    id?: number;

    photo?: string;
  }[];

  first_floor_seats_count?: number;
  second_floor_seats_count?: number;
  plates_number: string;
  lang: Locale;
  staticData: BusRentStaticDataPageProp;
}

export const RentCard = ({
  id,
  name,
  images_list,
  photo,
  first_floor_seats_count,
  second_floor_seats_count,
  plates_number,
  lang,
  staticData,
}: Rent) => {
  const [data, setData] = useState<IRent | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    const response = await axios.get<IRent>(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/rent/${id}`,
    );
    const data = response.data;
    setData(data);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Card elevation={0} sx={{ minWidth: 220 }} className={Style.rent_card}>
        <CardActionArea sx={{ padding: 0 }} onClick={handleClick}>
          {photo ? (
            <CardMedia
              sx={{ padding: 2, borderRadius: 5 }}
              component="img"
              height="195"
              image={photo}
              alt={staticData?.name || ''}
            />
          ) : (
            <Skeleton variant={'rectangular'} />
          )}
        </CardActionArea>
        <CardContent sx={{ px: 2, py: 0 }}>
          <Stack spacing={1} direction={'column'}>
            <Stack alignItems={'center'} spacing={1} direction={'row'}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '150%',
                }}
                color={colorHeading}
              >
                {staticData?.name}
                {name}
              </Typography>
            </Stack>
            <Stack alignItems={'center'} spacing={1} direction={'row'}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  textTransform: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
                variant="h6"
                color={color}
              >
                {staticData?.service}
              </Typography>
              {/* <BusService busIdService={busIdService} /> */}
            </Stack>
            <Stack alignItems={'center'} spacing={1} direction={'row'}>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  textTransform: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
                variant="h6"
                color={color}
              >
                {staticData?.first_floor}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  textTransform: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
                color={color}
              >
                {first_floor_seats_count ? first_floor_seats_count : null}
              </Typography>
            </Stack>

            {second_floor_seats_count && (
              <Stack alignItems={'center'} spacing={1} direction={'row'}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '150%',
                  }}
                  variant="h6"
                  color={color}
                >
                  {staticData?.second_floor}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '150%',
                  }}
                  color={color}
                >
                  {second_floor_seats_count}
                </Typography>
              </Stack>
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ padding: 2 }} disableSpacing>
          <Button
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: '16px',
              lineHeight: '150%',
              textTransform: 'none',
              padding: '8px 16px',
            }}
            onClick={handleClick}
            fullWidth
            color={'secondary'}
            variant={'contained'}
          >
            {staticData?.see_more_btn}
          </Button>
        </CardActions>
      </Card>
      {data ? (
        <CardInfo
          data={data}
          isOpen={isOpen}
          onClose={handleClose}
          staticData={staticData}
        />
      ) : (
        <></>
      )}
    </>
  );
};
