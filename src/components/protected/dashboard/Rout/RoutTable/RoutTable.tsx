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
} from '@mui/material';

import { grey } from '@mui/material/colors';

import { useRouter } from 'next/navigation';

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Circle from '../../../../../../public/icons/journey_from_circle.svg';
import Bus_marker from '../../../../../../public/icons/bus-marker.svg';
import Checked_icon from '../../../../../../public/icons/checked.svg';

import Style from './busform.module.css';
import axios from 'axios';

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import { dashboardRoutStaticData } from '@/interface/IStaticData';

import { IRout } from '@/interface/IJourney';
import { useState } from 'react';
import TimeClock from '../../../../../../public/icons/clock.svg';
import dayjs from 'dayjs';

const colorIcon = grey[700];
const colorHeader = grey[800];

const RoutTable = ({
  routs,
  staticData,
  lang,
}: {
  routs: IRout[];
  staticData: dashboardRoutStaticData;
  lang: Locale;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const rout = useRouter();
  console.log(routs);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleClick = (id: any): any => {
    rout.push(`/${lang}/dashboard/rout/${id}`);
  };

  const handleClickDelete = async (id: any) => {
    const session = await getSession();
    try {
      const response = await axios.delete(
        `${BASE_URL}/${lang}/api/admin/routes/delete/${id}/`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 204) {
        enqueueSnackbar(`${staticData.routTable.snackBar.remove_success}`, {
          variant: 'success',
        });
        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.routTable.snackBar.remove_error}`, {
        variant: 'error',
      });
    }
  };

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
                {staticData.routTable.number}
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
                {staticData.routTable.from}
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
                {staticData.routTable.stops}
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
                {staticData.routTable.to}
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
                {staticData.routTable.duration}
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
                {staticData.routTable.is_popular}
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
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routs &&
              routs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={item.id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <Circle width={16} height={16} />
                        {item?.cities[0]?.city}
                      </Box>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Stack direction={'column'} rowGap={0.5}>
                        {item?.cities?.slice(-1, 1).length > 0 &&
                          item?.cities?.slice(-1, 1)?.map((el, ind) => {
                            return (
                              <Box
                                key={el.id || ind}
                                sx={{
                                  display: 'flex',
                                  columnGap: 1,
                                  alignItems: 'center',
                                }}
                              >
                                <Bus_marker width={16} height={16} />
                                <Typography>{el.city}</Typography>
                                <Typography> {el.price} UAH</Typography>
                              </Box>
                            );
                          })}
                      </Stack>
                    </TableCell>

                    <TableCell align="left">
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <Bus_marker width={16} height={16} />
                        {item?.cities[item?.cities?.length - 1]?.city}
                        {item?.price} UAH
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <TimeClock width={16} height={16} /> {item?.to_place}
                        {dayjs()
                          .startOf('day')
                          .add(parseInt(item?.travel_time), 'minute')
                          .format('HH:mm')}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {item?.isPopular ? (
                        <Box
                          sx={{
                            display: 'block',

                            alignItems: 'center',
                            width: '14px',
                            height: '14px',
                          }}
                        >
                          <Checked_icon width={14} height={14} />
                        </Box>
                      ) : null}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        justifyContent={'flex-end'}
                        direction={'row'}
                        spacing={2}
                        width={'100%'}
                      >
                        <IconButton
                          onClick={() => {
                            handleClick(item.id);
                          }}
                          sx={{ color: colorIcon, fontSize: 16 }}
                          size={'small'}
                        >
                          <FiEdit />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleClickDelete(item.id);
                          }}
                          sx={{ color: colorIcon, fontSize: 16 }}
                          size={'small'}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TableFooter component={'div'} sx={{ width: '100%', display: 'flex' }}>
          <Stack
            sx={{ width: '100%' }}
            display={'flex'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-end'}
            >
              <Typography
                mr={1}
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                {staticData.routTable.reduce}
              </Typography>
              <Switch onChange={handleChangeDense} />
            </Box>
            <TablePagination
              rowsPerPageOptions={[
                15,
                25,
                50,
                { label: `${staticData.routTable.all}`, value: -1 },
              ]}
              component="div"
              count={routs.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={`${staticData.routTable.rows}`}
              SelectProps={{
                inputProps: {
                  'aria-label': `${staticData.routTable.rows}`,
                },
                native: false,
              }}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </TableFooter>
      </TableContainer>
    </Paper>
  );
};

export default RoutTable;
