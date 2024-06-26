import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { MouseEvent, useEffect, useState } from 'react';

import Popular_svg from '../../../../../public/icons/popular_svg.svg';

import Style from './Card.module.css';
import { Locale } from '@/i18n.config';
import { useRoutsContext } from '@/app/context';

interface IProps {
  name1: string;
  name2: string;
}

const CardPopular = (props: IProps) => {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('');

  const { setSelectRoutsTo, setSelectRoutsFrom } = useRoutsContext();
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const pathname = usePathname();

  useEffect(() => {
    setVal1(props.name1);
    setVal2(props.name2);
  }, [props.name1, props.name2]);

  const PopularPush = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (pathname !== `/${params.lang}`) {
      setSelectRoutsTo(val2);
      setSelectRoutsFrom(val1);
      router.push(`/${params.lang}`);
    } else {
      setSelectRoutsTo(val2);
      setSelectRoutsFrom(val1);
    }
  };
  return (
    <Box>
      <Card
        component={'div'}
        onClick={PopularPush}
        className={Style.hover}
        elevation={0}
      >
        <CardContent className={Style.content}>
          <Popular_svg width={16} height={45} />
          <Box className={Style.content_text}>
            <Typography component={'span'} className={Style.text}>
              {val1}
            </Typography>
            <Typography component={'span'} className={Style.text}>
              {val2}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardPopular;
