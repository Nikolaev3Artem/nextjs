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
import Style from './order.module.css';
import { Locale } from '@/i18n.config';
import { getMainDictionaries, getOrderDictionaries } from '@/lib/dictionary';
import { getUserInfo } from '@/lib/auth';
import { TicketsCard } from '@/components/protected/Orders/TicketsCard';
import { SnackbarProvider } from 'notistack';

export default async function Order({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getOrderDictionaries(params.lang);
  const journeyStaticData = await getMainDictionaries(params.lang);
  const userData = await getUserInfo();
  return (
    <>
      <Container
        maxWidth={'xl'}
        component={'section'}
        sx={{ paddingLeft: { md: '200px' }, paddingTop: '64px' }}
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
                {staticData.title}
              </Typography>
              <Box>
                <Grid
                  container
                  direction={'column'}
                  rowGap={4}
                  className={Style.card_list}
                >
                  {userData &&
                    userData.tickets &&
                    userData.tickets?.length > 0 &&
                    userData.tickets.map(el => {
                      return (
                        <TicketsCard
                          key={el.id}
                          staticData={journeyStaticData}
                          data={el}
                          lang={params.lang}
                        />
                      );
                    })}

                  {userData &&
                    userData.tickets &&
                    userData.tickets?.length < 0 && (
                      <Box>
                        <Typography>{staticData.no_tickets}</Typography>
                      </Box>
                    )}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
