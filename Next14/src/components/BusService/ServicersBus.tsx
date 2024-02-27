import Typography from '@mui/material/Typography';
import { TbAirConditioning } from 'react-icons/tb';
import { BsDisplay } from 'react-icons/bs';
import { HiMusicalNote } from 'react-icons/hi2';
import { TbPlug } from 'react-icons/tb';
import { AiOutlineUsb } from 'react-icons/ai';
import { AiOutlineWifi } from 'react-icons/ai';

const Wc = () => {
  return (
    <Typography
      component={'span'}
      sx={{
        fontFamily: 'Inter',
        fontStyle: 'normal',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '150%',
      }}
    >
      WC
    </Typography>
  );
};

const Ac = () => {
  return <TbAirConditioning />;
};

const Display = () => {
  return <BsDisplay />;
};

const Music = () => {
  return <HiMusicalNote />;
};

const Plug = () => {
  return <TbPlug />;
};

const Usb = () => {
  return <AiOutlineUsb />;
};

const Wifi = () => {
  return <AiOutlineWifi />;
};

export const ServicersBus = {
  Wc: Wc,
  Ac: Ac,
  Display: Display,
  Music: Music,
  Plug: Plug,
  Usb: Usb,
  Wifi: Wifi,
};
