'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import EuroIcon from '@mui/icons-material/Euro';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItemButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React from 'react';

import Style from './CurrencySelect.module.css';

const currency = [
  {
    id: 1,
    title: 'UAH',
    icon: 'CurrencyBitcoinIcon',
    rate: 40,
  },
  { id: 2, title: 'USD', icon: 'AttachMoneyIcon', rate: 0.98 },
  { id: 3, title: 'EUR', icon: 'EuroIcon', rate: 1 },
];

export const CurrencySelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
  ) => {
    setSelectedIndex(id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCurrency = () => {
    const data = currency.filter(item => item.id === selectedIndex);
    const curr = data[0].title;
    return curr;
  };
  const cache = createCache({
    key: 'css',
  });
  // const getCurrencyid = () => {
  //     const data = currency.filter((item) => item.id === selectedIndex)
  //     const id = data[0].id
  //
  //     return id
  // }
  return (
    <CacheProvider value={cache}>
      <Box sx={{ display: 'flex' }}>
        <ListItem disablePadding>
          <ListItemButton
            className={Style.currency_select_list}
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <Stack
              alignItems={'center'}
              direction={'row'}
              spacing={0.5}
              className={Style.List_hover}
            >
              <ListItemText
                className={Style.List_hover}
                secondaryTypographyProps={{
                  color: 'white',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  fontFamily: 'Inter',
                  fontWeight: 300,
                }}
                secondary={getCurrency()}
              />
              <KeyboardArrowDownIcon
                sx={{ fontSize: 22, color: 'white' }}
                className={open ? Style.active : Style.arrow}
              />
            </Stack>
          </ListItemButton>
        </ListItem>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {currency?.map(item => (
            <MenuItem
              key={item.id}
              disabled={item.id === 0}
              selected={item.id === selectedIndex}
              onClick={event => handleMenuItemClick(event, item.id)}
            >
              {item.icon === 'CurrencyBitcoinIcon' ? (
                <CurrencyBitcoinIcon fontSize={'small'} />
              ) : null}
              {item.icon === 'AttachMoneyIcon' ? (
                <AttachMoneyIcon fontSize={'small'} />
              ) : null}
              {item.icon === 'EuroIcon' ? (
                <EuroIcon fontSize={'small'} />
              ) : null}
              <Typography sx={{ mx: '8px' }}>{item.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </CacheProvider>
  );
};
