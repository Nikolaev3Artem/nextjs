'use client';

import { ListItemButton, Typography, useMediaQuery } from '@mui/material';
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

import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SupportSvg from '../../../../public/icons/support.svg';
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

import Logo from '../../../public/logo33.svg';
// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
import theme from '@/theme';
import Style from '@/components/NavBarAdmin/NavbarAdmin.module.css';
import {
  dashBoardStaticData,
  headerStaticDataProp,
} from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { logout } from '@/lib/auth';

const drawerWidth = 240;
const primary = theme.palette.primary.main;

interface IChildren {
  children: React.ReactNode;
}

export const DrawerHeader = styled('div')(({ theme }) => {
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
}: {
  staticData: { dashboard: dashBoardStaticData; header: headerStaticDataProp };
  lang: Locale;
  open: boolean;
  onClose: () => void;
  userEmail: string | undefined | null;
}) {
  //   const is_superuser: boolean = useAppSelector(
  //     state => state.user.user[0]?.user.is_superuser,
  //   );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();
  const is_superuser = false;
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
                paddingX: '32px',
                width: { xs: '250px', md: '100%' },
                marginX: 'auto',
                marginBottom: 2,
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
                    <Typography component={'span'} textAlign="center">
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
        ) : (
          <List>
            {staticData.dashboard.navAdmin.map(text => (
              <Link key={text.id} href={`/${lang}${text.path}`}>
                <ListItemButton
                  selected={pathname === `/${lang}${text.path}`}
                  sx={{
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
                width: { xs: '250px', md: '100%' },
                marginX: 'auto',
                marginBottom: 2,
                minHeight: 'initial',
              }}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
                sx={{
                  ml: 2,
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
                {staticData.dashboard.navAdminMain[0].title}
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
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </Box>
  );
}