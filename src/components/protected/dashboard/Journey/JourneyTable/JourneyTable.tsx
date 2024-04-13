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

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import { dashboardJourneyStaticData } from '@/interface/IStaticData';

import { IJourney } from '@/interface/IJourney';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const colorIcon = grey[700];
const colorHeader = grey[800];

const JourneyTable = ({
  journey,
  staticData,
  lang,
}: {
  journey: IJourney[];
  staticData: dashboardJourneyStaticData;
  lang: Locale;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const { selectLang } = useLangContext();

  const rout = useRouter();

  const getSeatsCount = (status: string, journeyId: number) => {
    const firstFloorCount =
      journey
        .filter(el => el.id === journeyId)[0]
        .bus[0]?.first_floor_seats?.filter(el => el.status === status).length ||
      0;

    const secondFloorCount =
      journey
        .filter(el => el.id === journeyId)[0]
        .bus[0]?.second_floor_seats?.filter(el => el.status === status)
        .length || 0;

    return firstFloorCount + secondFloorCount;
  };

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
        `${BASE_URL}/${selectLang}/api/admin/service/rout/${id}/delete/`,
        {
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 204) {
        enqueueSnackbar(`${staticData.journeyTable.snackBar.remove_success}`, {
          variant: 'success',
        });
        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.journeyTable.snackBar.remove_error}`, {
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
                {staticData.journeyTable.seats}
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
                {staticData.journeyTable.rout}
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
                {staticData.journeyTable.bus}
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
                {staticData.journeyTable.departure}
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
                {staticData.journeyTable.create}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journey &&
              journey?.length > 0 &&
              journey
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={item.id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <MaterialLink
                        component={Link}
                        href={`/${lang}/dashboard/flights/${item.id}`}
                        color={'secondary'}
                        sx={{
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {item.id}
                      </MaterialLink>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          px={1}
                          py={0.5}
                          bgcolor={'#808080'}
                          borderRadius={1}
                        >
                          <Typography variant="caption" color={'white'}>
                            {getSeatsCount('EMPTY', item.id)}
                          </Typography>
                        </Box>
                        <Box
                          px={1}
                          py={0.5}
                          bgcolor={theme.palette.error.main}
                          borderRadius={1}
                        >
                          <Typography variant="caption" color={'white'}>
                            {getSeatsCount('RESERVED', item.id)}
                          </Typography>
                        </Box>
                        <Box
                          px={1}
                          py={0.5}
                          bgcolor={theme.palette.success.main}
                          borderRadius={1}
                        >
                          <Typography variant="caption" color={'white'}>
                            {getSeatsCount('PAYED', item.id)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        <Typography>{item.routes[0]?.from_place} -</Typography>
                        <Typography> {item.routes[0]?.to_place}</Typography>
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
                        <MaterialLink
                          component={Link}
                          href={`/${lang}/dashboard/bus/${item.bus[0]?.id}`}
                          color={'secondary'}
                          sx={{
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {item?.bus[0]?.name}
                        </MaterialLink>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: 'block',
                        }}
                      >
                        <Box
                          display={'flex'}
                          columnGap={1}
                          alignItems={'center'}
                        >
                          <Box width={14} height={14}>
                            <CalendarIcon width={14} height={14} />
                          </Box>
                          <Typography
                            sx={{ fontSize: { xs: '10px', md: '12px' } }}
                          >
                            {item?.arrival_date
                              ? dayjs(item?.arrival_date)
                                  .locale(`${lang}`)
                                  .format('DD.MM.YYYY')
                              : dayjs().locale(`${lang}`).format('DD.MM.YYYY')}
                          </Typography>
                        </Box>
                        <Box
                          display={'flex'}
                          columnGap={1}
                          alignItems={'center'}
                        >
                          <Box width={14} height={14}>
                            <ClockIcon width={14} height={14} />
                          </Box>
                          <Typography
                            color={'primary'}
                            sx={{ fontSize: { xs: '10px', md: '12px' } }}
                          >
                            {item?.arrival_date
                              ? dayjs(item?.arrival_date).format('HH:mm')
                              : dayjs().format('HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          columnGap: 1,
                          alignItems: 'center',
                        }}
                      >
                        {/* {item?.routes[0]} */}
                      </Box>
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
                {staticData.journeyTable.reduce}
              </Typography>
              <Switch onChange={handleChangeDense} />
            </Box>
            <TablePagination
              rowsPerPageOptions={[
                15,
                25,
                50,
                { label: `${staticData.journeyTable.all}`, value: -1 },
              ]}
              component="div"
              count={journey.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={`${staticData.journeyTable.rows}`}
              SelectProps={{
                inputProps: {
                  'aria-label': `${staticData.journeyTable.rows}`,
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

export default JourneyTable;
