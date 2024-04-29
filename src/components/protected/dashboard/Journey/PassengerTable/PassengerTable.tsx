'use client';

import { Locale } from '@/i18n.config';
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Link as MaterialLink,
} from '@mui/material';

import { grey } from '@mui/material/colors';
import theme from '@/theme';

import { useRouter } from 'next/navigation';

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Circle from '../../../../../../public/icons/journey_from_circle.svg';
import Bus_marker from '../../../../../../public/icons/bus-marker.svg';
import Checked_icon from '../../../../../../public/icons/checked.svg';
import CalendarIcon from '../../../../../../public/icons/calendar-month.svg';
import ClockIcon from '../../../../../../public/icons/clock.svg';
import Style from './busform.module.css';
import axios from 'axios';
import BagPersonalSvg from '../../../../../../public/icons/bag-personal.svg';
import BagSuitcaseSvg from '../../../../../../public/icons/bag-suitcase.svg';
import BagPersonalSvgDisable from '../../../../../../public/icons/bag-personal-disable.svg';
import BagSuitcaseSvgDisable from '../../../../../../public/icons/bag-suitcase-disable.svg';

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import { dashboardJourneyStaticData } from '@/interface/IStaticData';

import { IJourney, ITickets } from '@/interface/IJourney';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const colorIcon = grey[700];
const colorHeader = grey[800];

const PassengerTable = ({
  tickets,
  staticData,
  lang,
}: {
  tickets: ITickets[];
  staticData: dashboardJourneyStaticData;
  lang: Locale;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const { selectLang } = useLangContext();

  const rout = useRouter();
  console.log('t', tickets);
  // const handleClick = (id: any): any => {
  //   rout.push(`/${lang}/dashboard/rout/${id}`);
  // };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        className={Style.table_container}
        elevation={0}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650 }}
          size={dense ? 'small' : 'medium'}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.number}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.name}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.journey}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.seat}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.comment}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: colorHeader,
                }}
                align="left"
              >
                {staticData.journeyTable.luggage}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets &&
              tickets.map(item => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={item.id}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="caption">{item.id}</Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant="caption">
                      {item.name} {item.surname}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="caption">
                        {item?.journey[0]?.routes[0]?.cities[0]?.city}-
                        {
                          item?.journey[0]?.routes[0]?.cities[
                            item?.journey[0]?.routes[0]?.cities?.length - 1
                          ]?.city
                        }
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="left">
                    <Typography variant="caption">
                      {item.reserved_seat}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="caption">{item.comment}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Box display={'flex'} columnGap={0.5}>
                      <Box width={'18px'} height={'18px'}>
                        {item.additional_baggage === 'BASE' ? (
                          <BagPersonalSvg width={18} height={18} />
                        ) : item.additional_baggage === 'ADDITIONAL_BAGGAGE' ? (
                          <BagSuitcaseSvg width={18} height={18} />
                        ) : null}
                      </Box>

                      <Typography variant="caption">
                        {item.additional_baggage.toLowerCase() === 'base'
                          ? staticData.journeyTable.base_bag
                          : item.additional_baggage.toLowerCase() ===
                              'ADDITIONAL_BAGGAGE'
                            ? staticData.journeyTable.extra_luggage
                            : staticData.journeyTable.extra_bag}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PassengerTable;
