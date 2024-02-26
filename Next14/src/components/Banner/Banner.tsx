import { Fade, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import * as React from 'react';
import cn from 'clsx';

import { IBanner } from '../../interface/IBanner';
import Style from './Banner.module.css';

const Banner = (props: IBanner) => {
  return (
    <Container className={Style.banner} maxWidth={false}>
      <Fade timeout={1000} in={true}>
        <Box className={Style.wrapper_img}>
          <Image
            src={props.img as string}
            alt={props.alt as string}
            style={{
              objectFit: 'cover',
            }}
            fill
            priority={true}
            quality={100}
          />
        </Box>
      </Fade>
      <Box className={Style.content}>
        <Container maxWidth={'xl'}>
          <Box
            className={
              (Style.content__title,
              cn(
                props.isMain ? Style.content__title : Style.content__title_page,
              ))
            }
          >
            <Grid container className={Style.container}>
              <Grid item sm={12} md={10} lg={10} xl={10}>
                <Box className={Style.transition__banner}>
                  <Slide timeout={1500} direction="up" in={true}>
                    <Box>
                      <Fade in={true} timeout={3000}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            component={'h1'}
                            className={cn(
                              props.isMain ? Style.fz40 : Style.fz32,
                              Style.title,
                            )}
                            variant="h1"
                          >
                            {props.h1}
                          </Typography>
                          {props.description && (
                            <Typography
                              fontSize={14}
                              variant={'subtitle2'}
                              className={cn(
                                props.isMain
                                  ? Style.subtitle
                                  : Style.subtitle_page,
                                Style.subtitle,
                              )}
                              component={'p'}
                            >
                              {props.description}
                            </Typography>
                          )}
                        </Box>
                      </Fade>
                    </Box>
                  </Slide>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default Banner;
