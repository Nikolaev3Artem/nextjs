import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import * as React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

// import DatePicker from '../component/Order/Datapicker/Datapicker';

import Style from './page.module.css';
import { Input } from '../Order/Input';
import { MainStaticDataProps } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { DataPicker } from '../Order/DataPicker';

export const MainSection = ({
  staticData,
  lang,
}: {
  staticData: MainStaticDataProps;
  lang: Locale;
}) => {
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
          <Input staticData={staticData} lang={lang} />
        </Grid>

        <Grid item lg={3} xl={3}>
          <DataPicker staticData={staticData} lang={lang} />
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
