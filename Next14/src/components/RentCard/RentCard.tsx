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
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { IRent } from '@/interface/IRent';
// import { setOpen } from '../../../store/admin/home/homeModalSlice';
// import { useAppDispatch } from '../../../store/auth/redux';
import { BusService } from '@/components/BusService';
import CardInfo from '@/components/CardInfo/CardInfo';
// import CardInfoModal from '../Modal/CardInfoModal';
import Style from './rentcard.module.css';

const color = grey[700];
const colorHeading = grey[900];

export const RentCard = ({
  id,
  name,
  busIdService,
  poster,
  places,
  floor,
  lang,
}: IRent) => {
  const BASE_URL: string | undefined = process.env.REACT_APP_URL;
  const [data, setData] = useState<IRent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const rout = useRouter();
  console.log(poster);

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
          {poster ? (
            <CardMedia
              sx={{ padding: 2, borderRadius: 5 }}
              component="img"
              height="195"
              image={poster}
              alt="Paella dish"
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
                Зручності:
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
                Поверхів:
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
                {floor}
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
                Місьць:
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
                {places}
              </Typography>
            </Stack>
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
            Переглянути
          </Button>
        </CardActions>
      </Card>
      {data ? (
        <CardInfo data={data} isOpen={isOpen} onClose={handleClose} />
      ) : (
        <></>
      )}
    </>
  );
};
