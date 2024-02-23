'use client';

import {
  Box,
  CircularProgress,
  Fade,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import cn from 'clsx';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineClose } from 'react-icons/md';

import Manager from '../../../public/icons/manager_call.svg';
import { IRent } from '@/interface/IRent';
import theme from '@/theme';
import { BusService } from '@/components/BusService';
import { CardInfoModal } from '@/components/CardInfoModal';
import Style from './cadrinfo.module.css';

const color_title = grey[800];
const colorHeading = grey[900];
const intupColor = grey[400];
const intupLabelColor = grey[600];

interface ICardInfoProps {
  data: IRent;
  isOpen: boolean;
  onClose: () => void;
}

interface IFormInput {
  phone: string | undefined;
}
//
// const PhoneSchema = yup.object().shape({
// 	file: yup
// 		.mixed()
// 		.test(
// 			"phone",
// 			"Файл не має бути не більшим ніж (5 MB)",
// 			value === /^\+380\d{9}$/
// 		),
//
// 	phone: yup
// 		.string()
// 		.max(60, "Заголовок не має містити більше ніж 60 символів"),
// 	description: yup
// 		.string()
// 		.max(60, "Текст не має містити більше ніж 60 символів"),
// 	alt: yup.string().max(30, "ALT не має містити більше ніж 30 символів")
// })

const CardInfo = ({ data, isOpen, onClose }: ICardInfoProps) => {
  const BASE_URL: string | undefined = process.env.REACT_APP_URL;
  const telegramBotKey = process.env.TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.TELEGRAM_USER_ID;

  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSendDone, setIsSendDone] = useState<boolean>(false);

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

  useEffect(() => {
    setLoaded(false);
    setIsLoading(false);
    setIsSendDone(false);
    setCurrentSlide(0);
    clearErrors('phone');
    reset();
  }, [onClose]);
  useEffect(() => {
    clearErrors('phone');
  }, [isOpen]);

  const rout = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    resetField,

    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({
    defaultValues: { phone: '' },
    mode: 'onChange',
  });

  const normalizePhoneNumber = (value: string) => {
    const phone = parsePhoneNumberFromString(value, 'UA');

    if (!phone) {
      return value;
    }
    return phone.formatInternational();
  };

  const sendTelegram = data;
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    // let lang = localStorage.getItem("lang")
    setIsLoading(true);
    const parse_mode = 'html';
    const photo = 'https://wallpaperaccess.com/full/1628621.jpg';
    const caption =
      `🇺🇦<b>Замовлення</b>‼️\n` +
      `🚍 Модель автобуса :  ${sendTelegram.name}\n` +
      `💺 Місць:  ${sendTelegram.places}\n` +
      `🪜 Поверх:  ${sendTelegram.floor}\n` +
      `☎️ Телефон замовника:  ${data.phone}\n`;

    const response = await axios.post(
      `https://api.telegram.org/bot${telegramBotKey}/sendPhoto`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        photo,
        caption,
        chat_id,
        parse_mode,
      },
    );

    reset();

    if (response.status === 200) {
      setTimeout(() => {
        setIsLoading(false);
        setIsSendDone(true);
        setTimeout(() => {
          onClose();
        }, 5000);
      }, 1000);
    }
  };
  //
  // const namesData: string = [
  // 	{ name: "model" },
  // 	{ name: "busService" },
  // 	{ name: "places" },
  // 	{ name: "floor" }
  // ]

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

  return (
    <CardInfoModal isOpen={isOpen} onClose={onClose}>
      {!isLoading && !isSendDone ? (
        <Box>
          <Box
            px={3}
            pt={2}
            mb={1}
            display={'flex'}
            width={'100%'}
            justifyContent={'flex-start'}
          >
            <Stack
              width={'100%'}
              direction={'row'}
              alignItems={'center'}
              display={'flex'}
              justifyContent={'flex-end'}
            >
              {/*<Typography*/}
              {/*	sx={{*/}
              {/*		fontFamily: "Inter",*/}
              {/*		fontStyle: "normal",*/}
              {/*		fontWeight: 700,*/}
              {/*		fontSize: "16px",*/}
              {/*		lineHeight: "140%",*/}
              {/*		color: color_title*/}
              {/*	}}*/}
              {/*>*/}
              {/*	Фото*/}
              {/*</Typography>*/}
              {/*<IconButton*/}
              {/*	onClick={onClose}*/}
              {/*	sx={{*/}
              {/*		// position: "absolute",*/}
              {/*		// top: "20px",*/}
              {/*		// right: "20px",*/}
              {/*		fontSize: "18px"*/}
              {/*	}}*/}
              {/*>*/}
              {/*	<MdOutlineClose />*/}
              {/*</IconButton>*/}
            </Stack>
          </Box>
          <Box width={'100%'} px={3} pb={3}>
            <Grid>
              <Grid item>
                <Box
                  style={{
                    borderRadius: '4px',
                  }}
                  className={Style.navigation_wrapper}
                >
                  <Box
                    style={{
                      borderRadius: '4px',
                    }}
                    ref={sliderRef}
                    className="keen-slider"
                  >
                    {data.images &&
                      data.images.map((image, index) => (
                        <Box
                          key={index}
                          style={{
                            borderRadius: '4px',
                          }}
                          height={sm ? 200 : 350}
                          className="keen-slider__slide"
                        >
                          <Image
                            style={{
                              borderRadius: '4px',
                              objectFit: 'fill',
                            }}
                            src={image.image || ''}
                            // width={852}
                            // height={400}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            quality={100}
                            alt={'Bus photo'}
                          />
                        </Box>
                      ))}
                  </Box>
                  {/* {loaded && instanceRef.current && (
                    <>
                      <Arrow
                        left
                        onClick={(e: any) =>
                          e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                      />

                      <Arrow
                        onClick={(e: any) =>
                          e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                          currentSlide ===
                          instanceRef.current.track.details.slides.length - 1
                        }
                      />
                    </>
                  )} */}
                </Box>
                {loaded && instanceRef.current && (
                  <div className={Style.dots}>
                    {/* {[
                      ...Array(
                        instanceRef.current.track.details.slides.length,
                      ).keys(),
                    ].map(idx => {
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            instanceRef.current?.moveToIdx(idx);
                          }}
                          className={cn(
                            [Style.dot],
                            currentSlide === idx ? Style.active : '',
                          )}
                        ></button>
                      );
                    })} */}
                  </div>
                )}
              </Grid>
              <Grid item>
                <Stack spacing={2} display={'flex'} direction={'column'}>
                  <Stack spacing={2} direction={'column'}>
                    <Typography
                      sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '140%',
                        color: color_title,
                      }}
                    >
                      Характеристики
                    </Typography>
                    <Grid
                      direction={sm ? 'column' : 'row'}
                      width={'100%'}
                      display={'flex'}
                      p={2}
                      sx={{
                        bgcolor: '#E3EDF9',
                        borderRadius: '4px',
                        // boxShadow: "0 0 2px 1px #00000026"
                        // border: "1px solid #ccc"
                      }}
                    >
                      <Grid item sm={7} display={'flex'} direction={'column'}>
                        <Stack
                          spacing={1}
                          alignItems={'center'}
                          direction={'row'}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                          >
                            Модель:
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                            color={colorHeading}
                          >
                            {data.name}
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={1}
                          alignItems={'center'}
                          direction={'row'}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                          >
                            Зручності:
                          </Typography>
                          {/* <BusService busIdService={data.busIdService} /> */}
                        </Stack>
                      </Grid>
                      <Grid item sm={5} display={'flex'} direction={'column'}>
                        <Stack
                          spacing={1}
                          alignItems={'center'}
                          direction={'row'}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                          >
                            Місць:
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                            color={colorHeading}
                          >
                            {data.places}
                          </Typography>
                        </Stack>
                        <Stack
                          spacing={1}
                          alignItems={'center'}
                          direction={'row'}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 600,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                          >
                            Поверх:
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '150%',
                              color: color_title,
                            }}
                            color={colorHeading}
                          >
                            {data.floor}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack
                    display={'flex'}
                    width={'100%'}
                    spacing={2}
                    direction={'column'}
                  >
                    <Stack spacing={2}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '16px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                      >
                        Введіть номер телефону
                      </Typography>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                          display={'flex'}
                          width={'100%'}
                          spacing={3}
                          direction={'column'}
                        >
                          <TextField
                            {...register('phone', {
                              required: 'Вкажіть номер телефону',
                              pattern: {
                                value: /^\+380\s\d{2}\s\d{3}\s\d{4}$/,
                                message:
                                  'Номер телефону у форматі (+380XXXXXXXXX), де "X" позначає будь-яку цифру',
                              },
                            })}
                            color={'secondary'}
                            helperText={errors?.phone?.message}
                            error={!!errors?.phone}
                            onChange={event => {
                              event.target.value = normalizePhoneNumber(
                                event.target.value,
                              );
                            }}
                            sx={{
                              borderRadius: '4px',

                              '& label': {
                                fontSize: 14,
                                color: intupLabelColor,
                              },
                              '& label.Mui-focused': {
                                color: 'secondary',
                              },

                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: intupColor,
                                },
                                // "&:hover fieldset": {
                                // 	borderColor: color_title
                                // },
                                '&.Mui-focused fieldset': {
                                  border: '1px solid secondary',
                                },
                              },
                            }}
                            InputLabelProps={{
                              color: 'secondary',
                            }}
                            label={'Номер телефону'}
                            placeholder={'+380X XXX XX XX'}
                            variant={'outlined'}
                            size={'small'}
                          />
                          <Button
                            type={'submit'}
                            size={'small'}
                            sx={{
                              fontFamily: 'Inter',
                              fontStyle: 'normal',
                              fontWeight: 300,
                              fontSize: '16px',
                              lineHeight: '150%',
                              textTransform: 'none',
                              padding: '8px 16px',
                            }}
                            fullWidth
                            color={'secondary'}
                            variant={'contained'}
                          >
                            Замовити
                          </Button>
                        </Stack>
                      </form>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box width={'100%'} height={704} display={'flex'}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
          >
            {isSendDone ? (
              <Box>
                <Fade in={isSendDone}>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    width={350}
                  >
                    <Manager width={300} height={300} />
                    <Stack width={'100%'} spacing={2} direction={'column'}>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                        textAlign={'center'}
                      >
                        Замовлення надіслано
                      </Typography>
                      <Typography
                        textAlign={'center'}
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '140%',
                          color: color_title,
                        }}
                      >
                        Наші менеджери зв'яжуться з вами найближчим часом, щоб
                        уточнити деталі
                      </Typography>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Button
                          onClick={onClose}
                          variant={'text'}
                          color={'secondary'}
                          sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 300,
                            fontSize: '16px',
                            lineHeight: '150%',
                            textTransform: 'none',
                          }}
                        >
                          Закрити
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Fade>
              </Box>
            ) : (
              <CircularProgress sx={{ color: intupLabelColor }} />
            )}
          </Box>
        </Box>
      )}
    </CardInfoModal>
  );
};

export default CardInfo;
