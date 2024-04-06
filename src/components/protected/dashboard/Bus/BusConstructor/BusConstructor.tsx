import { Box } from '@mui/material';
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
}

const BusConstructor = () => {
  function BusSeat({
    id,
    enter1,
    enter2,
    empty,
    seatNumber,
    wc,
  }: BusSeatsProps) {
    return (
      <div
        id={id}
        className={`${Style.bus_seat} ${enter1 || enter2 ? Style.enter : empty ? Style.empty : wc ? Style.wc : ''}`}
      >
        {enter1 || enter2 ? '-' : empty ? '' : wc ? 'wc' : seatNumber}
      </div>
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
  const [seatsCount, setSeatsCount] = useState<number>();

  useEffect(() => {
    const busSeats = generateBusSeats(3, true, 2, 4, true, 2, true, 2, 4);
    console.log('u', busSeats.busSeats[0]);
    setBusSeats(busSeats.busSeats);
    setSeatsCount(busSeats.seatNumber);
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
