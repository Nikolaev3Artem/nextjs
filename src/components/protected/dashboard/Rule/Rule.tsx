import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import { BsFillBagFill } from 'react-icons/bs';

import RuleSvg from '../../../../../public/icons/rule.svg';
import { IEditorText } from '@/interface/IEditorText';
import Style from './Rule.module.css';

const Rule = ({ text1, text2 }: IEditorText) => {
  return (
    <div>
      <Container className={Style.content} maxWidth={'lg'}>
        <Grid
          container
          direction={'column'}
          justifyContent={'flex-start'}
          alignItems="flex-start"
          width={'100%'}
        >
          <Grid item display={'flex'} width={'100%'}>
            <Grid container direction={'row'} width={'100%'}>
              <Grid item md={12} lg={7} xl={8}>
                <Box
                  className={Style.about_text_content}
                  fontSize={14}
                  color={'darkslategray'}
                  mt={2}
                  dangerouslySetInnerHTML={{
                    __html: text1 || '',
                  }}
                />
              </Grid>
              <Grid item md={12} lg={5} xl={4}>
                <Box display={'flex'} justifyContent={'center'} px={2}>
                  <Fade in={true} timeout={2000}>
                    <Box>
                      <Image
                        src={RuleSvg}
                        alt={'rule'}
                        width={350}
                        height={328}
                        priority={true}
                      />
                    </Box>
                  </Fade>
                </Box>
              </Grid>
              <Box
                className={Style.about_text_content}
                fontSize={14}
                color={'darkslategray'}
                dangerouslySetInnerHTML={{
                  __html: text2 || '',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Rule;
