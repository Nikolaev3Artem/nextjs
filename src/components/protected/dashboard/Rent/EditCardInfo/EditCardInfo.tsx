import {
  Box,
  Checkbox,
  Paper,
  Skeleton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import cn from 'clsx';
import { getCookie } from 'cookies-next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IRent } from '@/interface/IRent';
import { IServiceBus } from '@/app/[lang]/(protected)/dashboard/rent/add/page';
import theme from '@/theme';
import { BusService } from '@/components/common/BusService';
import Style from '@/components/published/Rent/CardInfo/cardinfo.module.css';

const color_title = grey[800];
const colorHeading = grey[900];

interface IInfoCardProps {
  rent: IRent;
  serviceBus?: readonly IServiceBus[];
}

const EditCardInfo = ({ rent, serviceBus }: IInfoCardProps) => {
  const BASE_URL: string | undefined = process.env.REACT_APP_URL;
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props: {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
  }) {
    const disabled = props.disabled ? Style.arrow__disabled : '';
    return (
      <svg
        onClick={props.onClick}
        className={`${Style.arrow} ${
          props.left ? Style.arrow__left : Style.arrow__right
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     clearErrors,
  //     resetField,
  //     watch,
  //     setValue,

  //     formState: { errors, isDirty, isValid },
  //   } = useForm<IRent>({
  //     defaultValues: {
  //       name: '',
  //       places: '',
  //       floor: '',
  //       busIdService: [],
  //       poster: '',
  //       is_active: '',
  //       uploaded_images: {},
  //     },
  //     mode: 'onChange',
  //   });

  //   const files = watch('uploaded_images');

  //   async function onSubmitForm(data: IRent) {
  //     try {
  //       const formData = new FormData();
  //       if (data.uploaded_images) {
  //         Object.values(data.uploaded_images).forEach((file: any) => {
  //           formData.append('images', file);
  //         });
  //       }
  //       if (data.busIdService) {
  //         Object.values(data.busIdService).forEach((item: any) => {
  //           formData.append('busIdService', item.id || null);
  //         });
  //       }
  //       formData.append('name', data.name || '');
  //       formData.append('places', data.places || '');
  //       formData.append('floor', data.floor || '');
  //       formData.append('is_active', data.is_active);
  //       data.poster?.length && formData.append('poster', data.poster[0] || null);
  //       const response = await axios.put(
  //         `${BASE_URL}${rout.locale}/api/rent/admin/update/${rent.id}/`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: 'Bearer ' + getCookie('access'),
  //             'Content-Type':
  //               'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //           },
  //         },
  //       );
  //       if (response.status === 200) {
  //         enqueueSnackbar('Ваші зміни збережені', { variant: 'success' });
  //         rout.push('/dashboard/rent/');
  //       }
  //       if (response.status === 201) {
  //         enqueueSnackbar('Ваша карточка добавлена', { variant: 'success' });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       enqueueSnackbar('Помилка збереження змін', { variant: 'error' });
  //     }
  //   }

  const rout = useRouter();

  const handleBack = () => {
    rout.back();
  };

  return <div>rent</div>;
  //   return (
  //     <Box height={'100%'} width={'100%'}>
  //       <form onSubmit={handleSubmit(onSubmitForm)}>
  //         <Grid container direction={'row'} spacing={2}>
  //           <Grid item lg={7} height={'100%'}>
  //             <Paper>
  //               <Box p={4} display={'flex'} width={'100%'}>
  //                 <Container disableGutters>
  //                   <Typography
  //                     sx={{
  //                       fontFamily: 'Inter',
  //                       fontStyle: 'normal',
  //                       fontWeight: 700,
  //                       fontSize: '20px',
  //                       lineHeight: '140%',
  //                       color: color_title,
  //                     }}
  //                     mb={4}
  //                   >
  //                     Заповніть форму
  //                   </Typography>
  //                   <Stack spacing={2}>
  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Модель
  //                       </Typography>
  //                       <TextField {...register('name')} size={'small'} />
  //                     </Stack>

  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Зручності
  //                       </Typography>
  //                       <Autocomplete
  //                         {...register('busIdService')}
  //                         // disablePortal
  //                         size={'small'}
  //                         id="bus-service"
  //                         multiple
  //                         options={serviceBus || []}
  //                         getOptionLabel={(option: IServiceBus) =>
  //                           option.name || ''
  //                         }
  //                         // onInputChange={event => }
  //                         fullWidth
  //                         onChange={(e, value) => setValue('busIdService', value)}
  //                         renderInput={params => <TextField {...params} />}
  //                       />
  //                     </Stack>

  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Місць
  //                       </Typography>
  //                       <TextField {...register('places')} size={'small'} />
  //                     </Stack>

  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Поверх
  //                       </Typography>
  //                       <TextField {...register('floor')} size={'small'} />
  //                     </Stack>

  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Постер
  //                       </Typography>
  //                       <TextField
  //                         {...register('poster')}
  //                         size={'small'}
  //                         type={'file'}
  //                       />
  //                     </Stack>

  //                     <Stack spacing={2} direction={'column'}>
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Фотографії
  //                       </Typography>
  //                       <TextField
  //                         {...register('uploaded_images')}
  //                         size={'small'}
  //                         type={'file'}
  //                         inputProps={{
  //                           multiple: true,
  //                         }}
  //                       />
  //                       {/*{files && <p>{files[0].name}</p>}*/}
  //                       {files &&
  //                         Object.values(files).map((item: any) => (
  //                           <Typography
  //                             key={item.id}
  //                             sx={{
  //                               fontFamily: 'Inter',
  //                               fontStyle: 'normal',
  //                               fontWeight: 300,
  //                               fontSize: '12px',
  //                               lineHeight: '140%',
  //                               color: color_title,
  //                             }}
  //                           >
  //                             {item.name}
  //                           </Typography>
  //                         ))}
  //                     </Stack>

  //                     <Stack
  //                       direction={'row'}
  //                       spacing={2}
  //                       justifyItems={'center'}
  //                       alignItems={'center'}
  //                       display={'flex'}
  //                     >
  //                       <Typography
  //                         sx={{
  //                           fontFamily: 'Inter',
  //                           fontStyle: 'normal',
  //                           fontWeight: 700,
  //                           fontSize: '16px',
  //                           lineHeight: '140%',
  //                           color: color_title,
  //                         }}
  //                       >
  //                         Активний
  //                       </Typography>
  //                       <Checkbox {...register('is_active')} />
  //                     </Stack>
  //                   </Stack>
  //                 </Container>
  //               </Box>
  //             </Paper>
  //           </Grid>
  //           <Grid item lg={5} height={'100%'}>
  //             <Container disableGutters maxWidth={'md'}>
  //               <Paper>
  //                 <Box width={'100%'} height={732} px={3} py={3}>
  //                   <Grid height={'100%'} display={'flex'} direction={'column'}>
  //                     <Grid sm={6} display={'flex'} direction={'column'} item>
  //                       <Box
  //                         style={{
  //                           borderRadius: '4px',
  //                         }}
  //                         className={Style.navigation_wrapper}
  //                       >
  //                         <Box
  //                           style={{
  //                             borderRadius: '4px',
  //                           }}
  //                           ref={sliderRef}
  //                           className="keen-slider"
  //                         >
  //                           {!rent.images ? (
  //                             <Skeleton />
  //                           ) : (
  //                             rent.images.map((image, index) => (
  //                               <Box
  //                                 key={index}
  //                                 style={{
  //                                   borderRadius: '4px',
  //                                 }}
  //                                 height={sm ? 200 : 350}
  //                                 className="keen-slider__slide"
  //                               >
  //                                 <Image
  //                                   style={{
  //                                     borderRadius: '4px',
  //                                     objectFit: 'fill',
  //                                   }}
  //                                   src={image.image || ''}
  //                                   // width={852}
  //                                   // height={400}
  //                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //                                   fill
  //                                   quality={100}
  //                                   alt={'Bus photo'}
  //                                 />
  //                               </Box>
  //                             ))
  //                           )}
  //                         </Box>
  //                         {loaded && instanceRef.current && (
  //                           <>
  //                             <Arrow
  //                               left
  //                               onClick={(e: any) =>
  //                                 e.stopPropagation() ||
  //                                 instanceRef.current?.prev()
  //                               }
  //                               disabled={currentSlide === 0}
  //                             />

  //                             <Arrow
  //                               onClick={(e: any) =>
  //                                 e.stopPropagation() ||
  //                                 instanceRef.current?.next()
  //                               }
  //                               disabled={
  //                                 currentSlide ===
  //                                 instanceRef.current.track.details?.slides
  //                                   .length -
  //                                   1
  //                               }
  //                             />
  //                           </>
  //                         )}
  //                       </Box>
  //                       {loaded && instanceRef.current && (
  //                         <div className={Style.dots}>
  //                           {[
  //                             ...Array(
  //                               instanceRef.current.track.details?.slides.length,
  //                             ).keys(),
  //                           ].map(idx => {
  //                             return (
  //                               <button
  //                                 key={idx}
  //                                 onClick={() => {
  //                                   instanceRef.current?.moveToIdx(idx);
  //                                 }}
  //                                 className={cn(
  //                                   [Style.dot],
  //                                   currentSlide === idx ? Style.active : '',
  //                                 )}
  //                               ></button>
  //                             );
  //                           })}
  //                         </div>
  //                       )}
  //                     </Grid>
  //                     <Grid item sm={6} display={'flex'} direction={'column'}>
  //                       <Stack
  //                         spacing={2}
  //                         display={'flex'}
  //                         direction={'column'}
  //                         height={'100%'}
  //                       >
  //                         <Stack
  //                           spacing={2}
  //                           display={'flex'}
  //                           height={'100%'}
  //                           direction={'column'}
  //                         >
  //                           <Typography
  //                             sx={{
  //                               fontFamily: 'Inter',
  //                               fontStyle: 'normal',
  //                               fontWeight: 700,
  //                               fontSize: '16px',
  //                               lineHeight: '140%',
  //                               color: color_title,
  //                             }}
  //                           >
  //                             Характеристики
  //                           </Typography>
  //                           <Stack
  //                             spacing={1}
  //                             direction={'column'}
  //                             p={2}
  //                             sx={{
  //                               bgcolor: '#E3EDF9',
  //                               borderRadius: '4px',
  //                               // boxShadow: "0 0 2px 1px #00000026"
  //                               // border: "1px solid #ccc"
  //                             }}
  //                           >
  //                             <Stack
  //                               spacing={1}
  //                               alignItems={'center'}
  //                               direction={'row'}
  //                             >
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                               >
  //                                 Модель:
  //                               </Typography>
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                                 color={colorHeading}
  //                               >
  //                                 {rent.name}
  //                               </Typography>
  //                             </Stack>
  //                             <Stack
  //                               spacing={1}
  //                               alignItems={'center'}
  //                               direction={'row'}
  //                             >
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                               >
  //                                 Зручності:
  //                               </Typography>
  //                               <BusService busIdService={rent.busIdService} />
  //                             </Stack>
  //                             <Stack
  //                               spacing={1}
  //                               alignItems={'center'}
  //                               direction={'row'}
  //                             >
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                               >
  //                                 Місць:
  //                               </Typography>
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                                 color={colorHeading}
  //                               >
  //                                 {rent.places}
  //                               </Typography>
  //                             </Stack>
  //                             <Stack
  //                               spacing={1}
  //                               alignItems={'center'}
  //                               direction={'row'}
  //                             >
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                               >
  //                                 Поверх:
  //                               </Typography>
  //                               <Typography
  //                                 sx={{
  //                                   fontFamily: 'Inter',
  //                                   fontStyle: 'normal',
  //                                   fontWeight: 400,
  //                                   fontSize: '16px',
  //                                   lineHeight: '150%',
  //                                   color: color_title,
  //                                 }}
  //                                 color={colorHeading}
  //                               >
  //                                 {rent.floor}
  //                               </Typography>
  //                             </Stack>
  //                           </Stack>
  //                         </Stack>
  //                         <Box display={'flex'}>
  //                           <Button
  //                             sx={{ height: 50 }}
  //                             color={'success'}
  //                             size={'large'}
  //                             variant={'contained'}
  //                             fullWidth
  //                             type={'submit'}
  //                           >
  //                             Зберегти
  //                           </Button>
  //                         </Box>
  //                       </Stack>
  //                     </Grid>
  //                   </Grid>
  //                 </Box>
  //               </Paper>
  //             </Container>
  //           </Grid>
  //         </Grid>
  //       </form>
  //     </Box>
  //   );
};

export default EditCardInfo;
