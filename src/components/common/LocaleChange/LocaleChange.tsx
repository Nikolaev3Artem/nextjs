'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';

import Image from 'next/image';

import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { i18n } from '@/i18n.config';

import Style from './locale.module.css';
import { Locale } from '@/i18n.config';

import { LocalCard } from '@/components/common/LocalCard';

interface IColor {
  color?: string;
  weight?: string;
  lang: Locale;
}

const langData = [
  {
    id: 1,
    title: 'Українська',
    min_title: 'Укр',
    icon: 'uk',
    lang: 'uk',
  },
  { id: 2, title: 'English', min_title: 'EN', icon: 'en', lang: 'en' },
  { id: 3, title: 'Português', min_title: 'PT', icon: 'pt', lang: 'pt' },
  { id: 4, title: 'Lietuvių', min_title: 'LT', icon: 'lt', lang: 'lt' },
];

const cache = createCache({
  key: 'css',
});

export function LocaleChange({ color, weight, lang }: IColor) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const pathname = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';

    const pathnameIsMissingLocale = i18n.locales.every(
      locale =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathname;
      return `/${locale}${pathname}`;
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathname.split('/');
        const isHome = segments.length === 2;
        if (isHome) return '/';

        segments.splice(1, 1);
        return segments.join('/');
      }

      const segments = pathname.split('/');
      segments[1] = locale;
      return segments.join('/');
    }
  };

  const searchParams = useSearchParams();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    lang?: string,
  ) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getLocalTitle = () => {
    const data = langData.filter(item => item.lang === lang);
    const locale = data[0]?.min_title;
    return locale;
  };

  return (
    <>
      <CacheProvider value={cache}>
        <Box sx={{ display: 'flex' }}>
          <ListItem disableGutters disablePadding>
            <Button
              sx={{
                textTransform: 'none',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'Inter',
                fontWeight: 300,
              }}
              variant={'text'}
              size={'small'}
              id="lock-button_locale"
              aria-haspopup="listbox"
              aria-controls="lock-menu2"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
              className={Style.List_hover}
            >
              <ListItemText
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: '4px',
                }}
                secondaryTypographyProps={{
                  fontWeight: weight,
                  color: color,
                  ml: '8px',
                }}
                primaryTypographyProps={{
                  alignItems: 'center',
                  display: 'flex',
                }}
                primary={
                  <Image
                    height={20}
                    width={24}
                    src={`/icons/${lang}.svg`}
                    alt="flag"
                    priority
                  />
                }
                secondary={getLocalTitle()}
              />
              <KeyboardArrowDownIcon
                sx={{ color: color, fontSize: 22 }}
                className={open ? Style.active : Style.arrow}
              />
            </Button>
          </ListItem>
          <Menu
            id="lock-menu2"
            anchorEl={anchorEl}
            disableScrollLock={true}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button_locale',
              role: 'listbox',
            }}
          >
            {langData?.map(option => {
              return (
                <LocalCard
                  key={option.id}
                  option={option}
                  pathname={redirectedPathName(option.lang)}
                  handleMenuItemClick={handleMenuItemClick}
                  lang={lang}
                />
              );
            })}
          </Menu>
        </Box>
      </CacheProvider>
    </>
  );
}
