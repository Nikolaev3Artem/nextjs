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
import Style from './profile.module.css';
import { Locale } from '@/i18n.config';
import { getProfileDictionaries } from '@/lib/dictionary';
import FormControl from '@mui/material/FormControl';
import { BiSave } from 'react-icons/bi';
import { ProfileForm } from '@/components/protected/ProfileForm';
import { getUserInfo } from '@/lib/auth';

export default async function Profile({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  const staticData = await getProfileDictionaries(params.lang);
  const userData = await getUserInfo();
  return (
    <Container
      maxWidth={'xl'}
      component={'section'}
      sx={{ paddingLeft: { md: '180px' }, paddingTop: '64px' }}
      className={Style.profile}
    >
      <Grid container>
        <Grid item>
          <Box py={4} sx={{ pl: { md: '24px' } }}>
            <Box>
              <Typography
                mb={2}
                className={Style.title}
                color={'primary'}
                variant={'h2'}
              >
                {staticData.title}
              </Typography>
            </Box>
            <ProfileForm
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
