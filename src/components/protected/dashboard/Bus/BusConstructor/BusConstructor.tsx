import { Box, Typography } from '@mui/material';
import Style from './Сonstructor.module.css';
import { useEffect, useState } from 'react';
import { generateKeyPair } from 'crypto';
import { generateBusSeats } from '@/helpers/generateBusSeat';

export interface BusSeatsProps {
  id: string;
  enter1?: boolean;
  enter2?: boolean;
  seatNumber?: number;
  wc?: boolean;
  empty?: boolean;
  wc_large?: boolean;
}

export interface BusConstructorProps {
  rows_1?: number | undefined;
  rows_2?: number;
  rows_3?: number;
  is_wc?: string;
  is_wc_2?: string;
  enter_2?: boolean;
  enter_1?: boolean;
  setSeatsCount?: any;
  seats_start: number;
  wc_row_1?: string;
  wc_row_2?: string;
}

const BusConstructor = (props: BusConstructorProps) => {
  const row = 2;

  function BusSeat({
    id,
    enter1,
    enter2,
    empty,
    seatNumber,
    wc,
    wc_large,
  }: BusSeatsProps) {
    return (
      <Box
        id={id}
        className={`${Style.bus_seat} ${enter1 || enter2 ? Style.enter : empty ? Style.empty : wc ? Style.wc : wc_large ? Style.wc_large : ''}`}
      >
        <Typography
          sx={{
            fontSize: '10px',
            color: '#bfbfbf',
            transform: 'rotate(-90deg)',
          }}
        >
          {enter1 || enter2 || empty || wc ? '' : seatNumber}
        </Typography>
      </Box>
    );
  }

  function BusRow({ seats }: { seats: BusSeatsProps[] }) {
    return (
      <div className={Style.bus_row}>
        {seats.map(seat => (
          <BusSeat
            key={seat.id}
            id={seat.id}
            enter1={seat.enter1}
            enter2={seat.enter2}
            empty={seat.empty}
            seatNumber={seat.seatNumber}
            wc={seat.wc}
            wc_large={seat.wc_large}
          />
        ))}
      </div>
    );
  }

  type BusSeatsState = BusSeatsProps[][];

  const [busSeats, setBusSeats] = useState<BusSeatsState>([
    [
      {
        id: '0',
        seatNumber: 0,
        enter1: false,
        enter2: false,
        wc: false,
        empty: false,
      },
    ],
  ]);
  // const [seatsCount, setSeatsCount] = useState<number>();

  useEffect(() => {
    const busSeats = generateBusSeats(
      props?.rows_1,
      props?.enter_1,
      row,
      props?.rows_2,
      props?.is_wc,
      props?.wc_row_1,
      props?.enter_2,
      row,
      props?.rows_3,
      props?.seats_start,
      props?.is_wc_2,
      props?.wc_row_2,
    );

    setBusSeats(busSeats.busSeats);
    props?.setSeatsCount(busSeats.seatNumber - props?.seats_start);
  }, []);

  return (
    <Box className={Style.bus_layout}>
      {busSeats.map((row, index) => (
        <BusRow key={index} seats={row} />
      ))}
    </Box>
  );
};

export default BusConstructor;
