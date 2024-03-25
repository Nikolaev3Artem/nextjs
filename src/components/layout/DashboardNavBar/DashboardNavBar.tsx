'use client';

import { ListItemButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SupportSvg from '../../../../public/icons/support.svg';
import { MdTune } from 'react-icons/md';
import {
  BsBoxFill,
  BsFillGeoAltFill,
  BsTicketPerforatedFill,
} from 'react-icons/bs';
import { FaBus, FaUser } from 'react-icons/fa';
import { HiTicket } from 'react-icons/hi2';
import {
  MdDashboard,
  MdLocationCity,
  MdOutlineEventNote,
  MdOutlineRoute,
  MdSpeakerNotes,
} from 'react-icons/md';
import { TbBus } from 'react-icons/tb';

import Logo from '../../../../public/logo33.svg';
// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
import theme from '@/theme';
import Style from '@/components/layout/NavBarAdmin/NavbarAdmin.module.css';
import {
  dashBoardStaticData,
  headerStaticDataProp,
} from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { logout } from '@/lib/auth';
import { PhoneType } from '@/interface/IEditorText';

const drawerWidth = 180;
const primary = theme.palette.primary.main;

export const DrawerHeader = styled('div')(({ theme }: { theme: any }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    padding: theme.spacing(0, 1),
  };
});

const color_active = blue[300];

const getIcon = (name: string) => {
  switch (name) {
    case 'home':
      return <AiFillHome />;

    case 'about_us':
      return <MdSpeakerNotes />;

    case 'rules':
      return <MdOutlineEventNote />;

    case 'parcels':
      return <BsBoxFill />;

    case 'bus_rent':
      return <FaBus />;

    case 'contact':
      return <BsFillGeoAltFill />;

    case 'profile':
      return <FaUser />;

    case 'dashboard':
      return <MdDashboard />;

    case 'tickets':
      return <HiTicket />;

    case 'bus':
      return <FaBus />;

    case 'city':
      return <MdLocationCity />;

    case 'rout':
      return <MdOutlineRoute />;

    case 'flights':
      return <TbBus />;

    case 'my_order':
      return <BsTicketPerforatedFill />;

    default:
      return null;
  }
};

export function DashboardNavBar({
  staticData,
  lang,
  open,
  onClose,
  userEmail,
  contacts,
  is_superuser = false,
}: {
  staticData: { dashboard: dashBoardStaticData; header: headerStaticDataProp };
  lang: Locale;
  is_superuser: boolean | null | undefined;
  open: boolean;
  onClose: () => void;
  contacts: PhoneType[];
  userEmail: string | undefined | null;
}) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pathname = usePathname();
  const router = useRouter();
  // const is_superuser = false;
  const handleLogout = () => {
    logout();
    router.push(`/${lang}`);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: { xs: '100vw', md: drawerWidth },
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: primary,
            width: { xs: '100vw', md: drawerWidth },
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'center' }}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={1}
            sx={{ display: { md: 'flex', xs: 'none' } }}
          >
            <Link href={`/${lang}`} className={Style.logo}>
              <Logo width={45} height={48} alt={'logo'} />
            </Link>
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => onClose()}
            sx={{
              display: { md: 'none', xs: 'flex' },
              color: 'white',
              position: 'absolute',
              top: 2,
              right: 2,
              '&:hover': { color: '#c9c9c9' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <Box
          sx={{
            flexGrow: 0,
            display: { xs: 'flex', md: 'none' },
            alignItems: 'space-between',

            width: { xs: '100vw', md: '100%' },
            flexDirection: 'column',
          }}
        >
          <Accordion
            disableGutters
            square
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              color: 'white',

              margin: 0,
              minHeight: 'initial',
            }}
          >
            <AccordionSummary
              expandIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 22,
                    color: 'white',
                  }}
                  className={anchorElUser ? Style.active : Style.arrow}
                />
              }
              sx={{
                paddingX: '32px',
                width: { xs: '180px', md: '100%' },
                marginX: 'auto',

                minHeight: 'initial',
              }}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt={staticData.header.avatar.alt}
              >
                <FaUser />
              </Avatar>
              <Typography
                sx={{
                  ml: 2,
                  mr: 0.5,
                  textTransform: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: 'Inter',
                  fontWeight: 300,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                className={Style.navbar__text}
                component={'a'}
                color={'white'}
              >
                {userEmail}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                paddingX: '32px',
                paddingY: '16px',
                backgroundColor: '#091E39',
                margin: 0,
                minHeight: 'initial',
              }}
            >
              {staticData.header.settings.map(setting => (
                <MenuItem
                  key={setting.id}
                  onClick={handleCloseUserMenu}
                  disableGutters
                  sx={{
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Link
                    href={`/${lang}${setting.path}`}
                    className={Style.List_hover}
                  >
                    <Typography component={'p'} textAlign="center">
                      {setting.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem
                onClick={handleLogout}
                disableGutters
                className={Style.List_hover}
                sx={{
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                <Typography component={'span'} textAlign="center">
                  {staticData.header.sign_out}
                </Typography>
              </MenuItem>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box px={2} my={2} textAlign={'center'}>
          <Link href={`/${lang}`}>
            <Button
              sx={{
                height: '44px',
                width: { xs: '168px', md: '100%' },
                fontWeight: '400',
                textTransform: 'none',
                fontSize: '14px',
                px: '12px',
              }}
              startIcon={<AiOutlineSearch />}
              color={'secondary'}
              variant={'contained'}
            >
              {staticData.dashboard.search_ticket}
            </Button>
          </Link>
        </Box>
        {!is_superuser ? (
          <>
            <List>
              {staticData.dashboard.navUser.map(text => (
                <Link key={text.id} href={`/${lang}${text.path}`}>
                  <ListItemButton
                    selected={pathname === `/${lang}${text.path}`}
                    sx={{
                      marginX: 'auto',
                      width: { xs: '178px', md: '100%' },
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      '&.MuiListItemButton-root': {
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: theme.palette.background.paper,
                        fontSize: '18px',
                      }}
                    >
                      {getIcon(text.name)}
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        color: theme.palette.background.paper,
                        fontWeight: 300,
                      }}
                      primary={text.title}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </List>
            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'space-between',
                marginBottom: '24px',
                width: { xs: '100vw', md: '100%' },
                flexDirection: 'column',
              }}
            >
              <Accordion
                disableGutters
                square
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  color: 'white',

                  margin: 0,
                  minHeight: 'initial',
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 22,
                        color: 'white',
                      }}
                      className={anchorElUser ? Style.active : Style.arrow}
                    />
                  }
                  sx={{
                    width: { xs: '180px', md: '100%' },
                    marginX: 'auto',
                    marginBottom: 2,
                    minHeight: 'initial',
                  }}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography
                    sx={{
                      mr: 0.5,
                      textTransform: 'none',
                      color: '#fff',

                      fontFamily: 'Inter',
                      fontWeight: 300,
                    }}
                    className={Style.navbar__text}
                    component={'a'}
                    color={'white'}
                  >
                    {staticData.dashboard.navigation}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: '#091E39',
                    margin: 0,
                    minHeight: 'initial',
                  }}
                >
                  {staticData.dashboard.navAdminMain.map(text => (
                    <Link key={text.id} href={`/${lang}${text.path}`}>
                      <ListItemButton
                        disableGutters
                        sx={{
                          width: { xs: 'fit-content', md: 'initial' },
                          marginX: { xs: 'auto', md: 'initial' },
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.primary.dark,
                            span: {
                              color: color_active,
                            },
                            svg: {
                              color: color_active,
                            },
                          },
                          '&.MuiListItemButton-root': {
                            '&:hover': {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: '40px',
                            color: theme.palette.background.paper,
                            fontSize: '18px',
                          }}
                        >
                          {getIcon(text.name)}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            color: theme.palette.background.paper,
                            fontWeight: 400,
                          }}
                          primary={text.title}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                  <Grid display={'flex'} flexDirection={'column'}>
                    <Accordion
                      disableGutters
                      square
                      sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        color: 'white',

                        margin: 0,
                        minHeight: 'initial',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <KeyboardArrowDownIcon
                            sx={{
                              fontSize: 22,
                              color: 'white',
                            }}
                            className={
                              anchorElUser ? Style.active : Style.arrow
                            }
                          />
                        }
                        className={Style.List_hover}
                        sx={{
                          paddingX: 0,
                          width: { xs: '180px', md: '100%' },
                          marginX: 'auto',

                          minHeight: 'initial',
                        }}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <SupportSvg width={20} height={20} />

                        <Typography
                          sx={{
                            ml: 2,
                            mr: 0.5,
                            textTransform: 'none',
                            color: '#fff',
                          }}
                          className={Style.navbar__text}
                          component={'a'}
                          color={'white'}
                        >
                          {staticData.header.support}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          paddingX: '32px',
                          paddingY: '16px',
                          backgroundColor: '#091E39',
                          margin: 0,
                          minHeight: 'initial',
                        }}
                      >
                        {contacts.map(tel => (
                          <MenuItem
                            key={tel.id}
                            onClick={handleCloseUserMenu}
                            disableGutters
                            className={Style.List_hover}
                            sx={{
                              justifyContent: {
                                xs: 'center',
                                md: 'flex-start',
                              },
                            }}
                          >
                            <Link href={`tel:${tel.phone_number}`}>
                              <Typography component={'span'} textAlign="center">
                                {tel.phone_number}
                              </Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        ) : (
          <List>
            <ListItemButton
              sx={{
                marginX: { xs: 'auto', md: 'initial' },
                width: { xs: 'fit-content', md: '100%' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: '40px',
                  color: '#BFBFBF',
                  fontSize: '18px',
                }}
              >
                <MdTune />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  color: '#BFBFBF',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
                primary={staticData.dashboard.settings.toUpperCase()}
              />
            </ListItemButton>
            {staticData.dashboard.navAdmin.map(text => (
              <Link key={text.id} href={`/${lang}${text.path}`}>
                <ListItemButton
                  selected={pathname === `/${lang}${text.path}`}
                  sx={{
                    marginX: { xs: 'auto', md: 'initial' },
                    width: { xs: 'fit-content', md: '100%' },
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.primary.dark,
                      span: {
                        color: color_active,
                      },
                      svg: {
                        color: color_active,
                      },
                    },
                    '&.MuiListItemButton-root': {
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: '40px',
                      color: theme.palette.background.paper,
                      fontSize: '18px',
                    }}
                  >
                    {getIcon(text.name)}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      color: theme.palette.background.paper,
                      fontWeight: 400,
                      fontSize: '14px',
                    }}
                    primary={text.title}
                  />
                </ListItemButton>
              </Link>
            ))}
          </List>
        )}
      </Drawer>
    </Box>
  );
}
