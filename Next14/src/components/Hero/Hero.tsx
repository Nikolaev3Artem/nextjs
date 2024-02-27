import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Style from './Hero.module.css';
import Banner from '@/components/Banner/Banner';

import { IBanner, IGetBanner } from '@/interface/IBanner';
import { MainStaticDataProps } from '@/interface/IStaticData';

export const Hero = ({
  banner,
  isMain = false,
  defaultImg,
  staticData,
}: {
  banner: IBanner;
  isMain?: boolean;
  defaultImg: string;
  staticData: { title: string; description?: string };
}) => {
  console.log('hero', banner.img);
  return (
    <Container className={Style.content} maxWidth={false} component={'section'}>
      <Box className={Style.content__box}>
        {banner && banner?.is_active === true ? (
          <Banner
            img={banner.img ? banner.img : defaultImg}
            alt={banner?.alt ? banner?.alt : staticData.title}
            h1={banner?.h1 ? banner?.h1 : staticData.title}
            description={
              banner?.description ? banner?.description : staticData.description
            }
            isMain={isMain}
            defaultImg={defaultImg}
          />
        ) : (
          <Banner
            h1={(banner && banner?.h1) || staticData.title}
            description={
              (banner && banner?.description) || staticData.description
            }
            img={defaultImg}
            alt={staticData.title}
            isMain={isMain}
            defaultImg={defaultImg}
          />
        )}
      </Box>
    </Container>
  );
};
