'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Fade, Stack } from '@mui/material';
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
// import Cookies from 'js-cookie';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { headerStaticDataProp } from '@/interface/IStaticData';

import Logo from '../../../public/logo.svg';
// import { IProfile } from '../../interface/IUser';
// import { setDrawer } from '../../store/admin/drawerSlice';
// import { useAppDispatch, useAppSelector } from '../../store/auth/redux';
// import { useGetUserQuery, userApi } from '../../store/auth/user.api';
// import { removeUser, setUser } from '../../store/auth/userSlice';

// import { LocaleChange } from '../Locale/LocaleChange';
import Style from './navbar.module.css';
import { Locale } from '@/i18n.config';
import { CurrencySelect } from '@/components/CurrencySelect';
import { LocaleChange } from '@/components/LocaleChange';
import { IProfile } from '@/interface/IUser';

export const NavBar = ({
  staticData,
  lang,
}: {
  staticData: headerStaticDataProp;
  lang: Locale;
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    handleCloseUserMenu();
    // Cookies.remove('access');
    // dispatch(removeUser(''));
    // dispatch(userApi.util.resetApiState());
    router.push(`/${lang}/auth`);
  };
  // const token = useAppSelector((state) => state.token.access)
  // const user: IProfile[] = useAppSelector(state => state.user.user);

  // const { data, isLoading, isSuccess } = useGetUserQuery('');
  const isLoading = false;
  const isSuccess = false;

  const user = [
    { id: 1, user: { last_name: 'user1', email: 'email.com' }, logo: null },
  ];

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUser(data));
  //   }
  // }, [data]);

  return (
    <AppBar color={'primary'} className={Style.navbar} position="fixed">
      <Toolbar disableGutters>
        <Container maxWidth={'xl'}>
          <Grid container direction="row" alignItems="center">
            <Grid
              display="flex"
              justifyContent="flex-start"
              alignItems={'center'}
              item
              md={1}
              lg={1}
              xl={1}
            >
              <Link href={`/${lang}`}>
                <Logo width={40} height={40} alt={'logo'} />
              </Link>
            </Grid>
            <Grid
              display="flex"
              justifyContent="flex-start"
              item
              lg={6}
              xl={7}
              component={'nav'}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                }}
                component={'ul'}
              >
                {staticData.pages.map(page => (
                  <li key={page.id}>
                    <Link href={`/${lang}${page.path}`}>
                      <Button
                        component={'span'}
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: 'white',
                          fontSize: 13,
                          textTransform: 'uppercase',
                          fontFamily: 'Inter',
                          fontWeight: 300,
                        }}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  </li>
                ))}
              </Box>
            </Grid>
            <Grid display="flex" justifyContent="flex-end" item lg={2} xl={2}>
              <Stack direction={'row'}>
                <CurrencySelect />
                <LocaleChange lang={lang} />
              </Stack>
            </Grid>
            <Grid display="flex" justifyContent="flex-end" item lg={3} xl={2}>
              {isLoading ? (
                <></>
              ) : user && isSuccess ? (
                <Fade in={user.length > 0} appear={false}>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      onClick={handleOpenUserMenu}
                      variant={'text'}
                      color={'inherit'}
                    >
                      <Avatar
                        src={user[0]?.logo || '/public/images/default_user.png'}
                        alt="Remy Sharp"
                      />
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
                        {user && user[0]?.user.email}
                      </Typography>
                      <KeyboardArrowDownIcon
                        sx={{ fontSize: 22 }}
                        className={anchorElUser ? Style.active : Style.arrow}
                      />
                    </Button>

                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
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
                      {staticData.settings.map(setting => (
                        <MenuItem
                          key={setting.id}
                          onClick={handleCloseUserMenu}
                        >
                          <Link href={setting.path}>
                            <Typography component={'span'} textAlign="center">
                              {setting.title}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                      <MenuItem onClick={handleLogout}>
                        <Typography component={'span'} textAlign="center">
                          <ListItemIcon>
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          {staticData.sign_out}
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Fade>
              ) : (
                <Fade in appear={false}>
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <Link href={`/${lang}/auth`}>
                        <Button
                          component={'span'}
                          // href={"/auth"}
                          sx={{
                            fontWeight: '400',
                            minWidth: '104px',
                            color: '#ffffff',
                            textTransform: 'none',
                          }}
                          variant={'text'}
                        >
                          {staticData.sign_in}
                        </Button>
                      </Link>
                      <Link href={'/auth/registration'}>
                        <Button
                          component={'span'}
                          color={'secondary'}
                          sx={{
                            fontWeight: '400',
                            minWidth: '131px',
                            textTransform: 'none',
                          }}
                          variant={'contained'}
                        >
                          {staticData.registration}
                        </Button>
                      </Link>
                    </Stack>
                  </Box>
                </Fade>
              )}
            </Grid>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {staticData.pages.map(page => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Link href={page.path} passHref>
                      <Typography sx={{}} textAlign="center">
                        {page.title}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    {staticData.sign_out}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
