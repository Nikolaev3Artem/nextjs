import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Locale } from '@/i18n.config';
import style from '@/components/common/LocaleChange/locale.module.css';

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
  return (
    <Link href={pathname}>
      <MenuItem
        disabled={option.id === 0}
        selected={option.icon === lang}
        onClick={event => handleMenuItemClick(event, option.id)}
      >
        <div className={style.svg}>
          <Image
            height={14}
            width={24}
            src={`/icons/${option.icon}.svg`}
            alt="flag"
            priority
          />
        </div>
        <Typography sx={{ ml: '8px' }}>{option.title}</Typography>
      </MenuItem>
    </Link>
  );
};
