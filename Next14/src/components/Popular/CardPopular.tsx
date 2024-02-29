import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

import Popular_svg from '../../../public/icons/popular_svg.svg';
// import { useAppDispatch } from '../../store/auth/redux';
// import { removePopular, setPopular } from '../../store/popular/popularSlice';
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
  const [active, setActive] = useState<boolean>(true);
  const {
    selectRoutsTo,
    setSelectRoutsTo,
    selectRoutsFrom,
    setSelectRoutsFrom,
  } = useRoutsContext();
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const pathname = usePathname();

  useEffect(() => {
    setVal1(props.name1);
    setVal2(props.name2);
  });

  //   const dispatch = useAppDispatch();
  const PopularPush = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (pathname !== `/${params.lang}`) {
      router.push(`/${params.lang}`);
      setSelectRoutsTo(val1);
      setSelectRoutsFrom(val2);
    } else {
      setSelectRoutsTo(val1);
      setSelectRoutsFrom(val2);
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
