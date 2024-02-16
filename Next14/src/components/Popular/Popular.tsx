'use client';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import React, { useEffect } from 'react';

import theme from '../../theme';
import CardPopular from './CardPopular';
import Style from './Popular.module.css';
import { Locale } from '@/i18n.config';
import { PopularStaticDataProp } from '@/interface/IStaticData';

let card: any = [];

const getCard = (lang: Locale) => {
  const cards = {
    uk: [
      { name1: 'Львів', name2: 'Албуфейра' },
      { name1: 'Львів', name2: 'Евора' },
      { name1: 'Львів', name2: 'Сантарен' },
      { name1: 'Львів', name2: 'Фаро' },
      { name1: 'Львів', name2: 'Авейру' },
      { name1: 'Львів', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Албуфейра' },
      { name1: 'Київ', name2: 'Евора' },
      { name1: 'Київ', name2: 'Сантарен' },
      { name1: 'Київ', name2: 'Фаро' },
      { name1: 'Київ', name2: 'Авейру' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
      { name1: 'Київ', name2: 'Лісабон' },
    ],
    en: [
      { name1: 'Lviv', name2: 'Albufeira' },
      { name1: 'Lviv', name2: 'Evora' },
      { name1: 'Lviv', name2: 'Santarem' },
      { name1: 'Lviv', name2: 'Faro' },
      { name1: 'Lviv', name2: 'Aveiro' },
      { name1: 'Lviv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Albufeira' },
      { name1: 'Kyiv', name2: 'Evora' },
      { name1: 'Kyiv', name2: 'Santarem' },
      { name1: 'Kyiv', name2: 'Faro' },
      { name1: 'Kyiv', name2: 'Aveiro' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
      { name1: 'Kyiv', name2: 'Lisbon' },
    ],
    lt: [
      { name1: 'Львів', name2: 'Albufeira' },
      { name1: 'Львів', name2: 'Evora' },
      { name1: 'Львів', name2: 'Santarem' },
      { name1: 'Львів', name2: 'Faro' },
      { name1: 'Львів', name2: 'Aveiro' },
      { name1: 'Львів', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Albufeira' },
      { name1: 'Київ', name2: 'Evora' },
      { name1: 'Київ', name2: 'Santarem' },
      { name1: 'Київ', name2: 'Faro' },
      { name1: 'Київ', name2: 'Aveiro' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
      { name1: 'Київ', name2: 'Lisabona' },
    ],
    pt: [
      { name1: 'Lviv', name2: 'Albufeira' },
      { name1: 'Lviv', name2: 'Evora' },
      { name1: 'Lviv', name2: 'Santarem' },
      { name1: 'Lviv', name2: 'Faro' },
      { name1: 'Lviv', name2: 'Aveiro' },
      { name1: 'Lviv', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Albufeira' },
      { name1: 'Kiev', name2: 'Evora' },
      { name1: 'Kiev', name2: 'Santarem' },
      { name1: 'Kiev', name2: 'Faro' },
      { name1: 'Kiev', name2: 'Aveiro' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
      { name1: 'Kiev', name2: 'Lisboa' },
    ],
  };
  return cards[lang];
};

export const Popular = ({
  staticData,
  lang,
}: {
  staticData: PopularStaticDataProp;
  lang: Locale;
}) => {
  const xlOnly = useMediaQuery(theme.breakpoints.only('xl'));
  const lgOnly = useMediaQuery(theme.breakpoints.only('lg'));
  const mdOnly = useMediaQuery(theme.breakpoints.only('md'));
  const smOnly = useMediaQuery(theme.breakpoints.only('sm'));
  const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));
  const cards = getCard(lang);
  if (xlOnly) {
    card = cards.slice(0, 18);
  } else if (lgOnly) {
    card = cards.slice(0, 18);
  } else if (mdOnly) {
    card = cards.slice(0, 16);
  } else if (smOnly) {
    card = cards.slice(0, 8);
  } else if (xsOnly) {
    card = cards.slice(0, 4);
  } else {
    card = cards.slice(0, 18);
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      className={Style.popular}
      component={'section'}
    >
      <Container maxWidth={'xl'}>
        <Grid mt={6} container>
          <Grid item>
            <Typography className={Style.text} variant={'h2'}>
              {staticData.title}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box mt={6} className={Style.content}>
        <Container className={Style.card_content} maxWidth={'xl'}>
          <Grid container>
            <Grid item>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 12, md: 8, lg: 12, xl: 12 }}
              >
                {card.map((i: any, index: number) => (
                  <Grid item xs={12} sm={6} md={2} lg={2} xl={2} key={index}>
                    <CardPopular name1={i.name1} name2={i.name2} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};
