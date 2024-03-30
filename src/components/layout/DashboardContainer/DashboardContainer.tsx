'use client';

import { ReactNode } from 'react';

import { Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

export const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth={'xl'}
      component={'section'}
      sx={{ paddingLeft: { md: '224px' }, paddingTop: '80px' }}
    >
      <SnackbarProvider />
      {children}
    </Container>
  );
};
