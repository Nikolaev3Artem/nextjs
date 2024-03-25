import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import Style from './Wrapper.module.css';

interface IContentProps {
  children: React.ReactNode;
}

export const Wrapper = (props: IContentProps) => {
  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth={'xl'} component={'section'}>
        <Grid container>
          <Grid item className={Style.wrapper}>
            <Box>
              <Fade in={true} timeout={1000}>
                <Box px={4} py={4} className={Style.content}>
                  {props.children}
                </Box>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
