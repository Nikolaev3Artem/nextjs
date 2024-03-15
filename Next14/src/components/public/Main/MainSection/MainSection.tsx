import * as React from 'react';
import axios from 'axios';
import { Locale } from '@/i18n.config';

import { SearchRoutForm } from '@/components/public/Main/SearchRoutForm';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Style from './page.module.css';

import { MainStaticDataProps } from '@/interface/IStaticData';
import { IPopular } from '@/interface/IPopular';

const getPopularRouts = async (lang: Locale): Promise<IPopular[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/routes/popular_routes`,
    );

    if (response.status === 200) {
      return response.data;
    } else return [];
  } catch (error) {
    return [];
  }
};

const getRoute = async (lang: Locale): Promise<IPopular[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${lang}/api/routes/`,
    );

    if (response.status === 200) {
      return response.data.results;
    } else return [];
  } catch (error) {
    return [];
  }
};

export const MainSection = async ({
  staticData,
  lang,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
}) => {
  const routs = await getRoute(lang);
  const popularRouts = await getPopularRouts(lang);
  const routsFrom = [...new Set(routs.map(item => item.from_place))];
  const routsTo = [...new Set(routs.map(item => item.to_place))];
  const popularRoutsFrom = [
    ...new Set(popularRouts.map(item => item.from_place)),
  ].slice(0, 4);
  const popularRoutsTo = [
    ...new Set(popularRouts.map(item => item.to_place)),
  ].slice(0, 4);

  return (
    <Container maxWidth={false} className={Style.main} disableGutters>
      <Box mb={2}>
        <Typography
          color={'primary'}
          variant={'h2'}
          fontWeight={'700'}
          sx={{ fontSize: { xs: '19px', md: '24px', xl: '32px' } }}
        >
          {staticData.search_title}
        </Typography>
      </Box>
      <SearchRoutForm
        staticData={staticData}
        lang={lang}
        popularRoutsFrom={popularRoutsFrom}
        popularRoutsTo={popularRoutsTo}
        routsFrom={routsFrom}
        routsTo={routsTo}
      />
    </Container>
  );
};
