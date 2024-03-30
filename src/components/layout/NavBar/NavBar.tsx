'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Fade, Stack } from '@mui/material';
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
import { FaUser } from 'react-icons/fa';

import Link from 'next/link';

import * as React from 'react';
import { useEffect } from 'react';
import { headerStaticDataProp } from '@/interface/IStaticData';

import Logo from '../../../../public/logo.svg';

import Style from './Navbar.module.css';
import { Locale } from '@/i18n.config';
import { CurrencySelect } from '@/components/common/CurrencySelect';
import { LocaleChange } from '@/components/common/LocaleChange';

import { MobileNavMenu } from './MobileNavMenu';

import { PhoneType } from '@/interface/IEditorText';
import { logout } from '@/lib/auth';

import theme from '@/theme';
const drawerWidth = 180;
const primary = theme.palette.primary.main;

export const NavBar = ({
  staticData,
  lang,
  contacts,
  user_email,
  is_staff,
  is_superuser,
}: {
  staticData: headerStaticDataProp;
  lang: Locale;
  contacts: PhoneType[];
  user_email: string | undefined | null;
  is_staff?: boolean;
  is_superuser?: boolean;
}) => {
  const [userMail, setUserMail] = React.useState('');
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  useEffect(() => {
    user_email ? setUserMail(user_email) : setUserMail('');
  }, [user_email]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    toggleDrawer(false);
    logout();
  };

  return (
    <AppBar color={'primary'} className={Style.navbar} position="fixed">
      <Toolbar disableGutters>
        <Container maxWidth={'xl'}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Grid
              display="flex"
              justifyContent="flex-start"
              alignItems={'center'}
              item
              md={1}
              lg={0.6}
              xl={0.6}
            >
              <Link href={`/${lang}`} style={{ display: 'flex' }}>
                <Logo
                  width={40}
                  height={40}
                  aria-label={staticData.logo.label}
                />
              </Link>
            </Grid>
            <Grid
              display="flex"
              justifyContent="flex-start"
              item
              component={'nav'}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', lg: 'flex' },
                }}
                component={'ul'}
              >
                {staticData.pages.map(page => (
                  <li key={page.id}>
                    <Link
                      href={`/${lang}${page.path}`}
                      className={Style.List_hover}
                    >
                      <Button
                        component={'span'}
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
            <Grid
              display="flex"
              justifyContent="flex-end"
              item
              sx={{
                flexGrow: { sm: 3, lg: 0 },
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <Stack direction={'row'}>
                <CurrencySelect />
                <LocaleChange lang={lang} />
              </Stack>
            </Grid>
            <Grid
              display="flex"
              justifyContent="flex-end"
              item
              lg={2}
              xl={1}
              sx={{
                flexGrow: 0.3,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {userMail ? (
                <Fade in={userMail.length > 0} appear={false}>
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
                      className={Style.List_hover}
                    >
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        alt={staticData.avatar.alt}
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
                      {staticData.settings.map(setting => (
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
                      {(is_superuser || is_staff) && (
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link href={`/${lang}/dashboard/content`}>
                            <Typography component={'span'} textAlign="center">
                              {staticData.dashboard}
                            </Typography>
                          </Link>
                        </MenuItem>
                      )}

                      <MenuItem onClick={handleLogout}>
                        <Typography
                          component={'span'}
                          textAlign="center"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
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
                flexGrow: { xs: 1, sm: 0.3 },
                justifyContent: { xs: 'flex-end' },
                display: { xs: 'flex ', lg: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(!open)}
                color="inherit"
                sx={{ color: 'white', '&:hover': { color: '#c9c9c9' } }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                id="menu-appbar"
                disableScrollLock={true}
                className={Style.drawer}
                sx={{
                  width: { xs: '100vw', sm: drawerWidth },
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    backgroundColor: primary,
                    width: { xs: '100vw', md: drawerWidth },
                    boxSizing: 'border-box',
                  },
                }}
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
              >
                <MobileNavMenu
                  staticData={staticData}
                  toggleDrawer={toggleDrawer}
                  handleLogout={handleLogout}
                  user={userMail}
                  lang={lang}
                  handleOpenUserMenu={handleOpenUserMenu}
                  anchorElUser={anchorElUser}
                  handleCloseUserMenu={handleCloseUserMenu}
                  contacts={contacts}
                  is_staff={is_staff}
                  is_superuser={is_superuser}
                />
              </Drawer>
            </Box>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
