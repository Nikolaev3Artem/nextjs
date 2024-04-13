'use client';

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
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import MarkerIcon from '../../../../../../public/icons/map-marker.svg';

import { IRent } from '@/interface/IRent';
import { BusService } from '@/components/common/BusService';
import Style from './cityform.module.css';
import axios from 'axios';

import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/lib/auth';
import { useLangContext } from '@/app/context';
import { dashboardCityStaticData } from '@/interface/IStaticData';
import { Locale } from '@/i18n.config';
import { StopsProps } from '@/interface/IJourney';
import { EditCity } from '../EditCity';
import { AddCity } from '../AddCity';

const colorIcon = grey[700];
const colorHeader = grey[800];

const CityTable = ({
  cities,
  staticData,
  lang,
}: {
  cities: StopsProps[];
  staticData: dashboardCityStaticData;
  lang: Locale;
}) => {
  const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const { selectLang } = useLangContext();
  const [isShowModal, setIsShowModal] = useState(false);

  const [cityList, setCityList] = useState<StopsProps[]>([{ city: '', id: 0 }]);

  const [selectedCity, setSelectedCity] = useState<StopsProps>({
    city: '',
    id: 0,
  });

  useEffect(() => {
    if (cities) {
      setCityList(cities);
    }
  }, [cities]);

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
    const foundCity = cityList.find(city => city.id === id);
    foundCity ? setSelectedCity(foundCity) : console.log('City not found');

    setIsShowModal(true);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleClickDelete = async (id: any) => {
    const session = await getSession();
    try {
      const response = await fetch(
        `${BASE_URL}/${selectLang}/api/admin/city/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + session.access,
            // 'Content-Type':
            //   'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          },
        },
      );
      if (response.status === 204) {
        enqueueSnackbar(`${staticData.cityTable.snackBar.remove_success}`, {
          variant: 'success',
        });
        setCityList((prevImagesList: StopsProps[]) => {
          const updatedImagesList = prevImagesList.filter(
            (el: StopsProps) => el.id !== id,
          );
          return updatedImagesList;
        });

        rout.refresh();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${staticData.cityTable.snackBar.remove_error}`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
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
                  {staticData.cityTable.number}
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
                  {staticData.cityTable.name}
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
                  {staticData.cityTable.address}
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
                  {staticData.cityTable.location}
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
              {cityList.length > 0 &&
                cityList
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
                        {item.city}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {item.address}
                      </TableCell>

                      <TableCell align="left">
                        <Stack
                          direction={'row'}
                          display={'flex'}
                          columnGap={0.5}
                          alignItems={'center'}
                        >
                          <MarkerIcon width={14} height={14} />
                          <Typography fontSize={'14px'}>
                            {item?.coords_x}
                          </Typography>
                        </Stack>
                        <Stack
                          direction={'row'}
                          display={'flex'}
                          columnGap={0.5}
                          alignItems={'center'}
                        >
                          <MarkerIcon width={14} height={14} />
                          <Typography fontSize={'14px'}>
                            {item?.cooords_y}
                          </Typography>
                        </Stack>
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
          <TableFooter
            component={'div'}
            sx={{ width: '100%', display: 'flex' }}
          >
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
                  {staticData.cityTable.reduce}
                </Typography>
                <Switch onChange={handleChangeDense} />
              </Box>
              <TablePagination
                rowsPerPageOptions={[
                  15,
                  25,
                  50,
                  { label: `${staticData.cityTable.all}`, value: -1 },
                ]}
                component="div"
                count={cities.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={`${staticData.cityTable.rows}`}
                SelectProps={{
                  inputProps: {
                    'aria-label': `${staticData.cityTable.rows}`,
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
      <EditCity
        data={selectedCity}
        onClose={handleModalClose}
        isShowModal={isShowModal}
        staticData={staticData}
        lang={lang}
      />
    </>
  );
};

export default CityTable;
