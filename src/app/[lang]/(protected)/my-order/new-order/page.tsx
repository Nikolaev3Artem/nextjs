import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Style from './newOrder.module.css';
import { Locale } from '@/i18n.config';
import { getOrderDictionaries } from '@/lib/dictionary';
import { getUserInfo } from '@/lib/auth';
import { AddPassengersForm } from '@/components/protected/Orders/AddPassengersForm';

export default async function Order({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getOrderDictionaries(params.lang);
  const userData = await getUserInfo();
  return (
    <Container
      maxWidth={'xl'}
      component={'section'}
      sx={{ paddingLeft: { md: '180px' }, paddingTop: '64px' }}
      className={Style.order}
    >
      <Grid container>
        <Grid item width={'100%'}>
          <Box py={4} sx={{ pl: { md: '24px' } }}>
            <Typography
              mb={2}
              className={Style.title}
              color={'primary'}
              variant={'h2'}
            >
              {staticData.passengers}
            </Typography>

            <AddPassengersForm
              staticData={staticData}
              lang={params.lang}
              userData={userData}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
