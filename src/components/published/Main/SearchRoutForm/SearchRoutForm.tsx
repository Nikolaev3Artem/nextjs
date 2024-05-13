'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import * as React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { Input } from '@/components/published/Main/Input';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { DataPicker } from '@/components/common/DataPicker';

import { SearchJourney } from '@/components/published/Main/SearchRout';
import { IJourney } from '@/interface/IJourney';
import dayjs, { Dayjs } from 'dayjs';
import { useRoutsContext } from '@/app/context';
import { JourneyCard } from '../JourneyCard';

interface State {
  to: string;
  from: string;
  date: string;
}

export const SearchRoutForm = ({
  staticData,
  lang,
  popularRoutsFrom,
  popularRoutsTo,
  routsFrom,
  routsTo,
  journey,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
  popularRoutsFrom: any;
  popularRoutsTo: any;
  routsFrom: any;
  routsTo: any;
  journey?: IJourney[];
}) => {
  const {
    selectRoutsTo,
    setSelectRoutsTo,
    selectRoutsFrom,
    setSelectRoutsFrom,
  } = useRoutsContext();

  const isoDate = new Date(Date.now()).toISOString();
  const [values, setValues] = React.useState<State>({
    to: selectRoutsTo || '',
    from: selectRoutsFrom || '',
    date: isoDate,
  });

  React.useEffect(() => {
    setValues(prev => ({
      ...prev,
      to: selectRoutsTo,
    }));
  }, [selectRoutsTo]);

  React.useEffect(() => {
    setValues(prev => ({
      ...prev,
      from: selectRoutsFrom,
    }));
  }, [selectRoutsFrom]);

  const [searchJourney, setSearchJourney] = React.useState<IJourney[]>();

  const Search = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSearchJourney([]);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/api/journey?from_city=${values.from}&to_city=${values.to}&from_date=${values.date}`,
      );

      if (response.status === 200) {
        setSearchJourney(response.data.results);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Grid
          display={'flex'}
          container
          spacing={2}
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Grid item md={7} lg={7} xl={7}>
            <Input
              staticData={staticData}
              lang={lang}
              popularRoutsFrom={popularRoutsFrom}
              popularRoutsTo={popularRoutsTo}
              routsFrom={routsFrom}
              routsTo={routsTo}
              setValues={setValues}
              values={values}
            />
          </Grid>

          <Grid item md={3} lg={3} xl={3}>
            <DataPicker
              staticData={staticData.date_input}
              lang={lang}
              setValues={setValues}
              values={values}
            />
          </Grid>
          <Grid item md={2} lg={2} xl={2}>
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
              onClick={Search}
              disabled={values.to === '' || values.from === ''}
            >
              {staticData.search_btn}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {searchJourney && searchJourney.length > 0 && (
        <SearchJourney
          staticData={staticData}
          searchJourney={searchJourney}
          values={values}
          lang={lang}
        />
      )}
      {searchJourney && searchJourney.length === 0 && (
        <Box mt={2}>
          <Typography>{staticData.no_results}</Typography>
        </Box>
      )}
      {journey && (
        <Grid container direction={'column'} rowGap={4} mt={4}>
          {journey.map(el => {
            return (
              <JourneyCard
                key={el.id}
                staticData={staticData}
                data={el}
                lang={lang}
                date={values.date}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};
