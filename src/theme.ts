'use client';
import localFont from 'next/font/local';
import { createTheme } from '@mui/material/styles';

const inter = localFont({
  variable: '--font-inter',
  src: [
    {
      path: '../public/fonts/Inter-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/Inter-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/Inter-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/Inter-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/fonts/Inter-Thin.ttf',
      weight: '200',
    },
  ],
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0E2645',
      contrastText: '#fff',
    },
    secondary: {
      main: '#296FCA',
      contrastText: '#fff',
    },
    error: {
      main: '#DD5407',
      contrastText: '#fff',
    },
    success: {
      main: '#4EBF3C',
      contrastText: '#fff',
    },
    warning: {
      main: '#FABA17',
      contrastText: '#fff',
    },
    info: {
      main: '#B3DAEF',
      contrastText: '#fff',
    },

    text: {
      primary: '#000',
      secondary: '#000',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
