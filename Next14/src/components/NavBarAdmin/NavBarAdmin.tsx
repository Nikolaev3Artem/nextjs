'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Fade, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import cn from 'clsx';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { IProfile } from '@/interface/IUser';
import { FaUser } from 'react-icons/fa';
import Logo from '../../../public/logo33.svg';
// import { setDrawer } from '../../../store/admin/drawerSlice';
// import { useAppDispatch, useAppSelector } from '../../../store/auth/redux';
// import { useGetUserQuery, userApi } from '../../../store/auth/user.api';
// import { removeUser, setUser } from '../../../store/auth/userSlice';
import { CurrencySelect } from '@/components/CurrencySelect';
import { LocaleChange } from '@/components/LocaleChange';
import Style from '@/components/NavBarAdmin/NavbarAdmin.module.css';
import { Locale } from '@/i18n.config';
import { getUser, logout } from '@/lib/auth';
import {
  dashBoardStaticData,
  headerStaticDataProp,
} from '@/interface/IStaticData';
import { DashboardNavBar } from '@/components/DashboardNavBar';

import theme from '@/theme';
import { PhoneType } from '@/interface/IEditorText';

const primary = theme.palette.primary.main;

export const NavBarAdmin = ({
  lang,
  user,
  staticData,
  contacts,
}: {
  lang: Locale;
  user: string | null | undefined;
  staticData: { dashboard: dashBoardStaticData; header: headerStaticDataProp };
  contacts: PhoneType[];
}) => {
  const [userMail, setUserMail] = React.useState('');

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [open, setOpen] = React.useState(false);

  const md = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    user ? setUserMail(user) : setUserMail('');
  }, [user]);

  useEffect(() => {
    md ? setOpen(false) : setOpen(true);
  }, [md]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //   const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    toggleDrawer(false);
    logout();
    router.push(`${lang}/auth`);
  };

  // const token = useAppSelector((state) => state.token.access)
  //   const user: IProfile[] = useAppSelector(state => state.user.user);

  //   const { data, isLoading, isSuccess } = useGetUserQuery('');

  //   useEffect(() => {
  //     if (data) {
  //       dispatch(setUser(data));
  //     }
  //   }, [data]);

  //   const open: boolean = useAppSelector(state => state.drawer.open);

  const drawerOpen = cn({
    [Style.navbar_open]: open,
  });
  const handleDrawerOpen = () => {
    setOpen(true);
    // dispatch(setDrawer());
  };

  return (
    <>
      <AppBar
        color={'primary'}
        className={cn(drawerOpen, Style.navbar)}
        position="fixed"
        elevation={0}
      >
        <Toolbar disableGutters>
          <Container maxWidth={false}>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ justifyContent: { xs: 'space-between', md: 'flex-end' } }}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                sx={{ display: { md: 'none', xs: 'flex' } }}
              >
                <Link href={`/${lang}`} className={Style.logo}>
                  <Logo width={45} height={48} alt={'logo'} />
                </Link>
              </Box>
              <Grid
                display="flex"
                justifyContent="flex-end"
                item
                lg={11}
                xl={11}
              >
                <Box mr={2} sx={{ display: { md: 'flex', xs: 'none' } }}>
                  <CurrencySelect />
                  <LocaleChange lang={lang} />
                </Box>
                {userMail && (
                  <Fade in={userMail.length > 0} appear={false}>
                    <Box
                      sx={{
                        flexGrow: 0,
                        display: { md: 'flex', xs: 'none' },
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        onClick={handleOpenUserMenu}
                        variant={'text'}
                        color={'inherit'}
                        className={Style.List_hover}
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
                          }}
                          className={Style.navbar__text}
                          component={'a'}
                          color={'white'}
                        >
                          {userMail}
                        </Typography>
                        <KeyboardArrowDownIcon
                          sx={{ fontSize: 22 }}
                          className={anchorElUser ? Style.active : Style.arrow}
                        />
                      </Button>

                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        disableScrollLock={true}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {staticData.header.settings.map(setting => (
                          <MenuItem
                            key={setting.id}
                            onClick={handleCloseUserMenu}
                          >
                            <Link href={`/${lang}${setting.path}`}>
                              <Typography component={'span'} textAlign="center">
                                {setting.title}
                              </Typography>
                            </Link>
                          </MenuItem>
                        ))}
                        <MenuItem onClick={handleLogout}>
                          <Typography
                            component={'span'}
                            textAlign="center"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            {staticData.header.sign_out}
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Fade>
                )}
              </Grid>
              <Grid
                justifyContent="flex-start"
                item
                sx={{ display: { md: 'none', xs: 'flex' }, padding: 0 }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(!open)}
                  edge="start"
                  sx={{
                    margin: 0,
                    padding: 0,
                    color: 'white',
                    '&:hover': { color: '#c9c9c9' },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <DashboardNavBar
        staticData={staticData}
        lang={lang}
        open={open}
        userEmail={user}
        onClose={handleCloseNavMenu}
        contacts={contacts}
      />
    </>
  );
};
