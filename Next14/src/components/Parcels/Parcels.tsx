import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

import ParcelsSvg from '../../../public/icons/parcel.svg';
import { IEditorText } from '../../interface/IEditorText';

import Style from './Parsels.module.css';
import cn from 'clsx';

export const Parcels = ({ parcels }: { parcels: IEditorText }) => {
  return (
    <Container
      className={cn(Style.content, Style.content__wrapper)}
      disableGutters
    >
      <Grid
        container
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems="flex-start"
        component={'div'}
        p={0}
      >
        <Grid item container>
          <Grid
            container
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems="flex-start"
            component={'div'}
            className={Style.wrapper}
          >
            <Grid item xl={8}>
              <Grid
                direction={'column'}
                justifyContent={'flex-start'}
                alignItems="flex-start"
                container
                component={'div'}
                className={Style.content__wrapper}
              >
                <Grid>
                  <Box className={Style.content__title} component={'div'}>
                    <Typography
                      component={'h3'}
                      className={Style.parcels__title}
                      variant={'h4'}
                    >
                      {parcels.title1}
                    </Typography>
                  </Box>
                </Grid>

                <Box
                  className={Style.parcels_text_content}
                  fontSize={16}
                  color={'darkslategray'}
                  dangerouslySetInnerHTML={{
                    __html: parcels.text1 || '',
                  }}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Box
                display={'flex'}
                justifyContent={'center'}
                width="100%"
                px={2}
              >
                <Fade in={true} timeout={2000}>
                  <Box>
                    <ParcelsSvg
                      width={350}
                      height={328}
                      className={Style.parcels__image}
                    />
                  </Box>
                </Fade>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {(parcels.title2 || parcels.text2) && (
          <Grid item>
            <Grid
              container
              direction={'column'}
              justifyContent={'flex-start'}
              alignItems="flex-start"
              width={'100%'}
              component={'div'}
              p={0}
            >
              <Box className={Style.content__title} component={'div'}>
                <Typography
                  component={'h3'}
                  className={Style.parcels__subtitle}
                  fontSize={16}
                >
                  {parcels.title2}
                </Typography>
              </Box>
              <Box
                className={Style.parcels_text_content}
                fontSize={16}
                color={'darkslategray'}
                dangerouslySetInnerHTML={{
                  __html: parcels.text2 || '',
                }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
