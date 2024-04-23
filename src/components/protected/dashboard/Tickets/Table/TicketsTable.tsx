'use client';

import {
  Collapse,
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
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { IRent } from '@/interface/IRent';
import { BusService } from '@/components/common/BusService';
import Style from './ticketsform.module.css';
import axios from 'axios';

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import {
  dashboardBusStaticData,
  dashboardTicketsStaticData,
  MainStaticDataProps,
} from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { ITickets } from '@/interface/IJourney';
import { TicketCard } from '@/components/protected/dashboard/Tickets/TicketCard';
import dayjs from 'dayjs';

const colorIcon = grey[700];
const colorHeader = grey[800];

const TicketsTable = ({
  tickets,
  staticData,
  lang,
  journeyStaticData,
}: {
  tickets: ITickets[];
  staticData: dashboardTicketsStaticData;
  lang: Locale;
  journeyStaticData: MainStaticDataProps;
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
    try {
      const response = await fetch(
        `${BASE_URL}/${selectLang}/api/admin/service/bus/${id}/delete/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + session.access,
            'Content-Type':
              'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 204) {
        enqueueSnackbar(`${staticData.ticketsTable.snackBar.remove_success}`, {
          variant: 'success',
        });
        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.ticketsTable.snackBar.remove_error}`, {
        variant: 'error',
      });
    }
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const printDocument = () => {
    if (!componentRef.current) {
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }

    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(componentRef.current.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    return true;
  };

  function Row(props: { item: any }) {
    const { item } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            {item.id}
          </TableCell>

          <TableCell component="th" scope="row">
            {item.name}
          </TableCell>

          <TableCell component="th" scope="row">
            {item.journey[0].routes[0].from_place} -
            {item.journey[0].routes[0].to_place}
          </TableCell>

          <TableCell align="left">
            {dayjs(item?.journey[0].arrival_date)
              .locale(`${lang}`)
              .format('DD.MM.YYYY')}
            {dayjs(item?.journey[0].arrival_date)
              .locale(`${lang}`)
              .format('HH:mm')}
          </TableCell>
          <TableCell align="left">
            {item.journey[0].routes[0].price} грн
          </TableCell>
          <TableCell align="left">{item.status}</TableCell>
          <TableCell align="left">
            {dayjs(item.created_at).locale(`${lang}`).format('DD.MM.YYYY')}{' '}
            {dayjs(item?.created_at).locale(`${lang}`).format('HH:mm')}
          </TableCell>
          <TableCell align="right">
            <Stack
              justifyContent={'flex-end'}
              direction={'row'}
              spacing={2}
              width={'100%'}
            >
              <IconButton
                onClick={printDocument}
                sx={{ color: colorIcon, fontSize: 16 }}
                size={'small'}
                aria-label={staticData.ticketsTable.print_label}
              >
                <PrintOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <TicketCard
                  data={item}
                  staticData={journeyStaticData}
                  lang={lang}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        className={Style.table_container}
        elevation={0}
        component={Paper}
        ref={componentRef}
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
                {staticData.ticketsTable.number}
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
                {staticData.ticketsTable.name}
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
                {staticData.ticketsTable.rout}
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
                {staticData.ticketsTable.start}
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
                {staticData.ticketsTable.price}
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
                {staticData.ticketsTable.status}
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
                {staticData.ticketsTable.create}
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
            {tickets &&
              tickets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => <Row key={item.name} item={item} />)}
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
                {staticData.ticketsTable.reduce}
              </Typography>
              <Switch onChange={handleChangeDense} />
            </Box>
            <TablePagination
              rowsPerPageOptions={[
                15,
                25,
                50,
                { label: `${staticData.ticketsTable.all}`, value: -1 },
              ]}
              component="div"
              count={tickets.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={`${staticData.ticketsTable.rows}`}
              SelectProps={{
                inputProps: {
                  'aria-label': `${staticData.ticketsTable.rows}`,
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

export default TicketsTable;
