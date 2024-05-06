'use client';
import { revalidatePath } from 'next/cache';

import {
  Paper,
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
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

import { IRent } from '@/interface/IRent';
import { BusService } from '@/components/common/BusService';
import Style from './busform.module.css';
import axios from 'axios';

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import { dashboardBusStaticData } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';

const colorIcon = grey[700];
const colorHeader = grey[800];

const BusTable = ({
  buses,
  staticData,
  lang,
}: {
  buses: IRent[];
  staticData: dashboardBusStaticData;
  lang: Locale;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const { selectLang } = useLangContext();

  const rout = useRouter();

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
    rout.push(`/${lang}/dashboard/bus/${id}`);
  };

  const handleClickDelete = async (id: any) => {
    const session = await getSession();
    if (!session) {
      redirect(`/${lang}/auth`);
    }

    try {
      const response = await fetch(
        `${BASE_URL}/${selectLang}/api/admin/service/bus/${id}/delete`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );

      if (response.status === 200) {
        enqueueSnackbar(`${staticData.busTable.snackBar.remove_success}`, {
          variant: 'success',
        });
        // revalidatePath(`/${lang}/dashboard/`);
        // rout.refresh();
        redirect(`/${lang}/dashboard/bus`);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.busTable.snackBar.remove_error}`, {
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
                {staticData.busTable.number}
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
                {staticData.busTable.name}
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
                {staticData.busTable.services}
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
                {staticData.busTable.plate}
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
                {staticData.busTable.seats_first_floor}
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
                {staticData.busTable.wc}
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
                {staticData.busTable.seats_second_floor}
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
            {buses &&
              buses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, ind) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${item.id}${item.name} || ${ind}`}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="left">
                      {/* <BusService busIdService={item.busIdService} /> */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.plates_number}
                    </TableCell>

                    <TableCell align="left">
                      {item?.first_floor_seats_count}
                    </TableCell>
                    <TableCell align="left">
                      {item.is_wc_working ? (
                        <AiOutlineCheckCircle size={16} color={'green'} />
                      ) : (
                        <MdOutlineCancel size={16} color={'red'} />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {item?.second_floor_seats_count}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        justifyContent={'flex-end'}
                        direction={'row'}
                        spacing={2}
                        width={'100%'}
                        sx={{ color: colorIcon }}
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
                          sx={{
                            color: 'inherit',
                            fontSize: 16,
                            '&:hover': { color: 'red' },
                          }}
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
                {staticData.busTable.reduce}
              </Typography>
              <Switch onChange={handleChangeDense} />
            </Box>
            <TablePagination
              rowsPerPageOptions={[
                15,
                25,
                50,
                { label: `${staticData.busTable.all}`, value: -1 },
              ]}
              component="div"
              count={buses.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={`${staticData.busTable.rows}`}
              SelectProps={{
                inputProps: {
                  'aria-label': `${staticData.busTable.rows}`,
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

export default BusTable;
