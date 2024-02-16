import dynamic from 'next/dynamic';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Locale } from '@/i18n.config';
import style from '@/components/LocaleChange/locale.module.css';
import I from '../../../public/icons/eur.svg';
import Image from 'next/image';

export const LocalCard = ({
  option,
  pathname,
  handleMenuItemClick,
  lang,
}: {
  option: any;
  pathname: string;
  handleMenuItemClick: any;
  lang: Locale;
}) => {
  const Icon = dynamic(
    () => import(`../../../public/icons/${option.icon}.svg`),
    {
      ssr: true,
    },
  );

  return (
    <Link href={pathname}>
      <MenuItem
        disabled={option.id === 0}
        selected={option.icon === lang}
        onClick={event => handleMenuItemClick(event, option.id)}
      >
        <div className={style.svg}>
          <Icon width={24} height={14} className={style.svg} />
        </div>
        <Typography sx={{ ml: '8px' }}>{option.title}</Typography>
      </MenuItem>
    </Link>
  );
};
