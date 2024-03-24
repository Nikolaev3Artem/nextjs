'use client';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import theme from '@/theme';
import CardPopular from '@/components/layout/Popular/CardPopular/CardPopular';
import Style from './Popular.module.css';
import { PopularStaticDataProp } from '@/interface/IStaticData';
import { IPopular } from '@/interface/IPopular';

let card: any = [];

export const Popular = ({
  staticData,

  popularRouts,
}: {
  staticData: PopularStaticDataProp;

  popularRouts: IPopular[];
}) => {
  const xlOnly = useMediaQuery(theme.breakpoints.only('xl'));
  const lgOnly = useMediaQuery(theme.breakpoints.only('lg'));
  const mdOnly = useMediaQuery(theme.breakpoints.only('md'));
  const smOnly = useMediaQuery(theme.breakpoints.only('sm'));
  const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));

  if (xlOnly) {
    card = popularRouts.slice(0, 18);
  } else if (lgOnly) {
    card = popularRouts.slice(0, 18);
  } else if (mdOnly) {
    card = popularRouts.slice(0, 16);
  } else if (smOnly) {
    card = popularRouts.slice(0, 8);
  } else if (xsOnly) {
    card = popularRouts.slice(0, 4);
  } else {
    card = popularRouts.slice(0, 18);
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
                    <CardPopular name1={i.from_place} name2={i.to_place} />
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
