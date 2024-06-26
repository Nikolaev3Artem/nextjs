import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

import AboutSvg from '../../../../public/icons/about.svg';
import { IEditorText } from '@/interface/IEditorText';

import Style from './About.module.css';
import cn from 'clsx';

export const About = ({ about }: { about: IEditorText }) => {
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
            width={'100%'}
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
                      className={Style.about__title}
                      variant={'h4'}
                    >
                      {about.title1 ? about?.title1 : ''}
                    </Typography>
                  </Box>
                </Grid>

                <Box
                  className={Style.about_text_content}
                  fontSize={16}
                  color={'darkslategray'}
                  dangerouslySetInnerHTML={{
                    __html: about.text1 || '',
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
                    <AboutSvg
                      width={350}
                      height={328}
                      className={Style.about__image}
                    />
                  </Box>
                </Fade>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {(about?.title2 || about?.text2) && (
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
                  className={Style.about__subtitle}
                  fontSize={16}
                >
                  {about.title2}
                </Typography>
              </Box>
              <Box
                className={Style.about_text_content}
                fontSize={16}
                color={'darkslategray'}
                dangerouslySetInnerHTML={{
                  __html: about.text2 || '',
                }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
