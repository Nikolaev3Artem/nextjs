import { Locale } from '@/i18n.config';
import { headerStaticDataProp } from '@/interface/IStaticData';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline, Drawer, Fade, Stack } from '@mui/material';
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
import Style from '../Navbar.module.css';
import { FaUser } from 'react-icons/fa';

export const MobileNavMenu = ({
  staticData,
  toggleDrawer,
  handleLogout,
  isLoading,
  isSuccess,
  user,
  lang,
  handleOpenUserMenu,
  anchorElUser,
  handleCloseUserMenu,
}: {
  staticData: headerStaticDataProp;
  toggleDrawer: any;
  handleLogout: any;
  isLoading: boolean;
  isSuccess: boolean;
  user: any;
  lang: Locale;
  handleOpenUserMenu: any;
  anchorElUser: any;
  handleCloseUserMenu: any;
}) => {
  console.log(anchorElUser);
  return (
    <Box
      sx={{ height: '100vh' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className={Style.nav_menu}
      justifyContent={'center'}
      py={7}
      px={4}
    >
      <Grid
        display="flex"
        justifyContent="flex-end"
        item
        lg={2}
        xl={1}
        sx={{
          flexGrow: 0.3,
          display: 'flex',
        }}
      >
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
                sx={{ padding: 0 }}
              >
                <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp">
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
                  <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
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
            <Box mb={7} width={'100%'}>
              <Stack direction="row" justifyContent={'space-between'}>
                <Link href={`/${lang}/auth`}>
                  <Button
                    component={'span'}
                    sx={{
                      fontWeight: '400',
                      minWidth: '45px',
                      color: '#ffffff',
                      textTransform: 'none',
                      paddingRight: 0,
                      paddingLeft: 0,
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
                      minWidth: '106px',
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

      {staticData.pages.map(page => (
        <MenuItem key={page.id} onClick={toggleDrawer(!open)}>
          <Link href={page.path} passHref>
            <Typography sx={{}} textAlign="center">
              {page.title}
            </Typography>
          </Link>
        </MenuItem>
      ))}
      <MenuItem onClick={handleLogout}>
        <Typography textAlign="center">{staticData.sign_out}</Typography>
      </MenuItem>
    </Box>
  );
};
