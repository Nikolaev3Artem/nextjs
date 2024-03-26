import { IJourney } from '@/interface/IJourney';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Stack, Grid, Typography } from '@mui/material';
import { IoMdArrowForward } from 'react-icons/io';
import CalendarIcon from '../../../../../public/icons/calendar-month.svg';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { JourneyCard } from '@/components/published/Main/JourneyCard';
import Style from './SearchJourney.module.css';
import { Locale } from '@/i18n.config';

interface State {
  to: string;
  from: string;
  date: string;
}

export const SearchJourney = ({
  staticData,
  searchJourney,
  values,
  lang,
}: {
  staticData: MainStaticDataProps;
  searchJourney: IJourney[];
  values: State;
  lang: Locale;
}) => {
  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }} mt={4}>
      <Grid container direction={'column'} gap={2}>
        <Grid
          item
          display={'flex'}
          columnGap={4}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Typography
            color={'primary'}
            variant={'h2'}
            fontWeight={'700'}
            sx={{ fontSize: { xs: '13px', md: '24px' } }}
          >
            {staticData.search_results}
          </Typography>

          <Box display={'flex'} columnGap={1} alignItems={'center'}>
            <Typography
              color={'primary'}
              sx={{ fontSize: { xs: '13px', md: '20px' } }}
            >
              {values.from}
            </Typography>
            <IoMdArrowForward width={3} height={3} />
            <Typography
              color={'primary'}
              sx={{ fontSize: { xs: '13px', md: '20px' } }}
            >
              {values.to}
            </Typography>
            <CalendarIcon width={'24px'} height={'24px'} />
            <Typography
              color={'primary'}
              sx={{ fontSize: { xs: '13px', md: '20px' } }}
            >
              {values?.date
                ? dayjs(values.date).format('DD.MM.YYYY')
                : dayjs().format('DD.MM.YYYY')}
            </Typography>
          </Box>
        </Grid>
        <Box>
          <Grid
            container
            direction={'column'}
            rowGap={4}
            className={Style.card_list}
          >
            {searchJourney.map(el => {
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
        </Box>
      </Grid>
    </Stack>
  );
};
