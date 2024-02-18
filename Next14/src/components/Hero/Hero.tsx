import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Style from './hero.module.css';
import Banner from '@/components/Banner/Banner';

import { IBanner } from '@/interface/IBanner';

export const Hero = ({
  banner,
  isMain = false,
  defaultImg,
}: {
  banner: IBanner[] | undefined;
  isMain?: boolean;
  defaultImg: string;
}) => {
  return (
    <Container className={Style.content} maxWidth={false} component={'section'}>
      <Box className={Style.content__box}>
        {banner && banner[0]?.is_active === true ? (
          <Banner
            img={`${process.env.NEXT_PUBLIC_BASE_URL}${banner[0]?.img}`}
            alt={banner[0]?.alt}
            h1={banner[0]?.h1}
            description={banner[0]?.description}
            isMain={isMain}
          />
        ) : (
          <Banner
            h1={(banner && banner[0]?.h1) || ''}
            description={(banner && banner[0]?.description) || ''}
            img={defaultImg}
            alt={'img'}
            isMain={isMain}
          />
        )}
      </Box>
    </Container>
  );
};
