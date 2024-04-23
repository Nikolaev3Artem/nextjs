import { Box, Button, Typography } from '@mui/material';
import Style from './Constructor.module.css';
import { useEffect, useState } from 'react';
import { generateKeyPair } from 'crypto';
import { generateBusSeats } from '@/helpers/generateBusSeat';
import { ISeat } from '@/interface/IRent';

export interface BusSeatsProps {
  id: string;
  enter1?: boolean;
  enter2?: boolean;
  seatNumber?: number;
  wc?: boolean;
  empty?: boolean;
  status?: string;
  rows_1?: number | undefined;
  rows_2?: number;
  rows_3?: number;
  is_wc?: string;
  enter_2?: boolean;
  enter_1?: boolean;
  small?: boolean;
}

export interface BusConstructorProps {
  rows_1?: number | undefined;
  rows_2?: number;
  rows_3?: number;
  is_wc?: string;
  enter_2?: boolean;
  enter_1?: boolean;
  setSeatsCount?: any;
  status?: string;
  seats?: ISeat[];
  seats_start: number;
  handleCheck: (arg: number, ar: number) => void;
  floor: number;
  small?: boolean;
}

const BusSeats = (props: BusConstructorProps) => {
  const row = 2;
  const [seats, setSeats] = useState<ISeat[]>();

  useEffect(() => {
    setSeats(props.seats);
  }, [props]);

  const handleClick = (seatNumber: number, floor: number) => {
    console.log(seats);

    setSeats(prevState => {
      console.log('prevState', prevState); // Log previous state
      const updatedSeats = prevState?.map(seat => {
        console.log('seat', seat); // Log each seat
        console.log('seatNumber', seatNumber); // Log seatNumber
        if (seat.seat === seatNumber) {
          return { ...seat, status: 'Selected' };
        }
        return seat;
      });
      console.log('updatedSeats', updatedSeats); // Log updated seats
      return updatedSeats; // Return the updated array of seats
    });
    if (seatNumber) {
      props.handleCheck(seatNumber, floor);
    }
  };

  const checkStatus = (id: number | null | undefined): string | undefined => {
    const seat = seats?.find(seat => seat.seat === id);

    return seat ? seat.status : '';
  };

  function BusSeat({
    id,
    enter1,
    enter2,
    empty,
    seatNumber,
    wc,
    status,
    small,
  }: BusSeatsProps) {
    return (
      <button
        id={id}
        onClick={() =>
          seatNumber ? handleClick(seatNumber, props?.floor) : null
        }
        disabled={empty || enter1 || enter2}
        className={`${Style.bus_seat} ${status?.toLocaleLowerCase() === 'empty' ? Style.new : status?.toLocaleLowerCase() === 'ordered' ? Style.ordered : status?.toLocaleLowerCase() === 'selected' ? Style.selected : ''} ${enter1 || enter2 ? Style.enter : empty ? Style.empty : wc ? Style.wc : ''} ${small ? Style.small : ''}`}
      >
        <Typography
          sx={{
            fontSize: 'inherit',
            color: 'inherit',
            transform: { md: 'rotate(-90deg)' },
          }}
        >
          {enter1 || enter2 || empty || wc ? '' : seatNumber}
        </Typography>
      </button>
    );
  }

  function BusRow({
    seats,
    small,
  }: {
    seats: BusSeatsProps[];
    small?: boolean;
  }) {
    return (
      <div className={`${Style.bus_row}  ${small ? Style.small : ''}`}>
        {seats.map(seat => (
          <BusSeat
            key={seat.id}
            id={seat.id}
            enter1={seat.enter1}
            enter2={seat.enter2}
            empty={seat.empty}
            seatNumber={seat.seatNumber}
            wc={seat.wc}
            status={checkStatus(seat?.seatNumber)}
            small={small}
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
      row,
      props?.enter_2,
      row,
      props?.rows_3,
      props.seats_start,
    );

    setBusSeats(busSeats.busSeats);
  }, []);

  return (
    <Box className={`${Style.bus_layout}  ${props.small ? Style.small : ''}`}>
      {busSeats.map((row, index) => (
        <BusRow key={index} seats={row} small={props.small} />
      ))}
    </Box>
  );
};

export default BusSeats;
