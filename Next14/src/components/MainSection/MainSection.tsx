import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import * as React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

// import DatePicker from '../component/Order/Datapicker/Datapicker';

import Style from './page.module.css';
import { Input } from '../Order/Input';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { DataPicker } from '../Order/DataPicker';
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
    <Container maxWidth={false} className={Style.main}>
      <Box>
        <Typography
          mb={2}
          className={Style.title}
          color={'primary'}
          variant={'h2'}
        >
          {staticData.search_title}
        </Typography>
      </Box>
      <Grid flexDirection={'row'} display={'flex'} container>
        <Grid item lg={7} xl={7}>
          <Input
            staticData={staticData}
            lang={lang}
            popularRoutsFrom={popularRoutsFrom}
            popularRoutsTo={popularRoutsTo}
            routsFrom={routsFrom}
            routsTo={routsTo}
          />
        </Grid>

        <Grid item lg={3} xl={3}>
          <DataPicker staticData={staticData.date_input} lang={lang} />
        </Grid>
        <Grid item lg={2} xl={2}>
          <Button
            sx={{
              height: '54px',
              fontWeight: '400',
              textTransform: 'none',
              fontSize: '16px',
            }}
            startIcon={<AiOutlineSearch />}
            fullWidth
            variant={'contained'}
            color={'secondary'}
          >
            {staticData.search_btn}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
