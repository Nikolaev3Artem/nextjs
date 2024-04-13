'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
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
