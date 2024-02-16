import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Style from './hero.module.css';
import Banner from '@/components/Banner/Banner';
import axios from 'axios';
import { IBanner } from '@/interface/IBanner';

export const Hero = ({
  banner,
  isMain = false,
}: {
  banner: IBanner[] | undefined;
  isMain?: boolean;
}) => {
  return (
    <Container className={Style.content} maxWidth={false} component={'section'}>
      <Box className={Style.content__box}>
        {banner && banner[0]?.is_active === true ? (
          <Banner
            img={banner[0]?.img}
            alt={banner[0]?.alt}
            h1={banner[0]?.h1}
            description={banner[0]?.description}
            isMain={isMain}
          />
        ) : (
          <Banner
            h1={(banner && banner[0]?.h1) || ''}
            description={(banner && banner[0]?.description) || ''}
            img={'/images/hero_bg_default.jpg'}
            alt={'img'}
            isMain={isMain}
          />
        )}
      </Box>
    </Container>
  );
};
