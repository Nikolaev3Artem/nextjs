import { Divider, ListItem, ListItemButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';
import { FaViber } from 'react-icons/fa';
import { TbBrandTelegram } from 'react-icons/tb';

import Logo from '../../../public/logo33.svg';
import Style from './footer.module.css';
import { footerStaticDataProp } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';

const getContacts = async (lang: Locale) => {
  const phones = {
    uk: [
      { id: 1, name: '+380 87 777 77 77', path: '' },
      { id: 2, name: '+380 87 777 77 77', path: '' },
      { id: 3, name: '+380 87 777 77 77', path: '' },
      { id: 4, name: '+380 87 777 77 77', path: '' },
    ],
    en: [
      { id: 1, name: '+380 87 777 77 77', path: '' },
      { id: 2, name: '+380 87 777 77 77', path: '' },
      { id: 3, name: '+380 87 777 77 77', path: '' },
      { id: 4, name: '+380 87 777 77 77', path: '' },
    ],
    lt: [
      { id: 1, name: '+380 87 777 77 77', path: '' },
      { id: 2, name: '+380 87 777 77 77', path: '' },
      { id: 3, name: '+380 87 777 77 77', path: '' },
      { id: 4, name: '+380 87 777 77 77', path: '' },
    ],
    pt: [
      { id: 1, name: '+380 87 777 77 77', path: '' },
      { id: 2, name: '+380 87 777 77 77', path: '' },
      { id: 3, name: '+380 87 777 77 77', path: '' },
      { id: 4, name: '+380 87 777 77 77', path: '' },
    ],
  };
  const socials = {
    uk: {
      telegram: '#',
      facebook: '#',
      viber: '#',
    },
    en: {
      telegram: '#',
      facebook: '#',
      viber: '#',
    },
    lt: {
      telegram: '#',
      facebook: '#',
      viber: '#',
    },
    pt: {
      telegram: '#',
      facebook: '#',
      viber: '#',
    },
  };
  return { phones: phones[lang], socials: socials[lang] };
};

export const Footer = async ({
  staticData,
  lang,
}: {
  staticData: footerStaticDataProp;
  lang: Locale;
}) => {
  const contacts = await getContacts(lang);

  return (
    <Box className={Style.content} component={'footer'}>
      <Container maxWidth={'xl'}>
        <Box className={Style.wrapper}>
          <Box mt={4}>
            <Grid
              container
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Grid lg={2} xl={2} item>
                <Link href={`/${lang}/`}>
                  <Logo width={90} height={90} aria-label={'logo'} />
                </Link>
              </Grid>
              <Grid lg={2} xl={2} item>
                <Typography
                  color={'white'}
                  className={Style.title}
                  variant={'h2'}
                >
                  {staticData.nav}
                </Typography>
                <Box component={'nav'}>
                  <List>
                    {staticData.navigate.map(list => (
                      <ListItem
                        sx={{ marginTop: '8px' }}
                        key={list.id}
                        disablePadding
                      >
                        <Link href={`/${lang}${list.path}`}>
                          <ListItemText
                            className={Style.List_hover}
                            primaryTypographyProps={{
                              color: '#fff',
                              fontSize: '14px',
                              lineHeight: '15px',
                              textTransform: 'uppercase',
                              fontWeight: '400',
                            }}
                            primary={list.title}
                          />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid lg={2} xl={2} item>
                <Typography
                  color={'white'}
                  className={Style.title}
                  variant={'h2'}
                >
                  {staticData.cooperation}
                </Typography>
                <List>
                  {staticData.collaboration.map(list => (
                    <ListItem
                      sx={{ marginTop: '8px' }}
                      key={list.id}
                      disablePadding
                    >
                      <Link href={`/${lang}${list.path}`}>
                        <ListItemText
                          className={Style.List_hover}
                          primaryTypographyProps={{
                            color: '#fff',
                            fontSize: '14px',
                            lineHeight: '15px',
                            textTransform: 'uppercase',
                            fontWeight: '400',
                          }}
                          primary={list.title}
                        />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid lg={2} xl={2} item>
                <Typography
                  color={'white'}
                  className={Style.title}
                  variant={'h2'}
                >
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <BiSupport size={28} color={'#FABA17'} />
                    <span>{staticData.support}</span>
                  </Stack>
                </Typography>
                <Box>
                  <List>
                    {contacts.phones.map(list => (
                      <ListItem
                        sx={{ marginTop: '8px' }}
                        key={list.id}
                        disablePadding
                      >
                        <Link href={`${lang}${list.path}`}>
                          <ListItemText
                            className={Style.List_hover}
                            primaryTypographyProps={{
                              color: '#fff',
                              fontSize: '14px',
                              lineHeight: '15px',
                              textTransform: 'uppercase',
                              fontWeight: '400',
                            }}
                            primary={list.name}
                          />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <Stack spacing={1} direction={'row'}>
                    <Link href={contacts.socials.telegram}>
                      <IconButton className={Style.List_hover}>
                        <TbBrandTelegram color={'white'} />
                      </IconButton>
                    </Link>
                    <Link href={contacts.socials.facebook}>
                      <IconButton className={Style.List_hover}>
                        <BsFacebook color={'white'} />
                      </IconButton>
                    </Link>
                    <Link href={contacts.socials.viber}>
                      <IconButton className={Style.List_hover}>
                        <FaViber color={'white'} />
                      </IconButton>
                    </Link>
                  </Stack>
                </Box>
              </Grid>
              <Grid lg={2} xl={2} item>
                <Typography
                  color={'white'}
                  className={Style.title}
                  variant={'h2'}
                >
                  {staticData.mobile_app}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box>
              <Divider color={'#0B356A'} />
              <Box className={Style.copyright_content}>
                <Typography color={'white'} className={Style.copyright_text}>
                  {staticData.copyright}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
