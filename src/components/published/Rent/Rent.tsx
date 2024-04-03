import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RentCard } from './RentCard';
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
  return (
    <Stack width={'100%'} direction={'column'}>
      <Grid container spacing={{ xs: 3, sm: 2, md: 3, lg: 2 }}>
        {bus_rent.length > 0 &&
          bus_rent.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Box>
                <RentCard
                  id={item.id}
                  name={item.name}
                  images_list={item.images_list}
                  photo={item.photo}
                  first_floor_seats_count={item.first_floor_seats_count}
                  second_floor_seats_count={item.second_floor_seats_count}
                  lang={lang}
                  plates_number={item.plates_number}
                  staticData={staticData}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};
