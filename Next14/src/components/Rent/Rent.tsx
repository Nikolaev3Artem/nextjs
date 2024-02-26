import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RentCard } from '../RentCard';
import { IRent } from '@/interface/IRent';
import { Locale } from '@/i18n.config';
import { BusRentStaticDataPageProp } from '@/interface/IStaticData';

export const Rent = ({
  bus_rent,
  lang,
  staticData,
}: {
  bus_rent: IRent[];
  lang: Locale;
  staticData: BusRentStaticDataPageProp;
}) => {
  console.log('a', bus_rent);
  return (
    <Stack width={'100%'} direction={'column'}>
      <Grid container spacing={{ xs: 3, sm: 2, md: 3, lg: 2 }}>
        {bus_rent.map(item => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Box>
              <RentCard
                id={item.id}
                name={item.name}
                images={item.photo}
                busIdService={item.busIdService}
                floor={item.floor}
                places={item.places}
                poster={item.photo}
                lang={lang}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
