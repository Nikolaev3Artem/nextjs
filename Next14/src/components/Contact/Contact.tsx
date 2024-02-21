import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import React from 'react';

import ContactSvg from '../../../public/icons/contact.svg';
import { IContactText } from '@/interface/IEditorText';

import Style from './Contact.module.css';
import cn from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { FaViber } from 'react-icons/fa';
import { TbBrandTelegram } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';
import { contactStaticDataProp } from '@/interface/IStaticData';

interface FlagSVGProps {
  width: number;
  height: number;
  className?: string;
}

type FlagSVGComponent =
  | React.FC<FlagSVGProps>
  | React.ComponentClass<FlagSVGProps>;

export const Contact = ({
  contact,
  staticData,
}: {
  contact: IContactText;
  staticData: contactStaticDataProp;
}) => {
  const FlagSVG: FlagSVGComponent = dynamic(
    () => import(`../../../public/icons/${contact.icon}.svg`),
    {
      ssr: true,
    },
  );

  return (
    <Container
      className={cn(Style.content, Style.content__wrapper)}
      disableGutters
    >
      <Grid
        container
        direction={'row'}
        justifyContent={'flex-start'}
        alignItems="flex-start"
        width={'100%'}
        component={'div'}
        className={Style.wrapper}
      >
        <Grid item>
          <Grid
            direction={'column'}
            justifyContent={'flex-start'}
            alignItems="flex-center"
            container
            component={'div'}
            className={Style.content__wrapper}
          >
            <Box
              className={Style.content__title}
              component={'div'}
              alignItems={'center'}
            >
              <Typography component={'h3'} variant={'h4'}>
                {contact.title ? contact.title : staticData.title}
              </Typography>

              <FlagSVG width={32} height={20} />
            </Box>

            <Grid
              item
              container
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems="flex-start"
              wrap="nowrap"
              component={'div'}
              gap={4}
              className={Style.content__wrapper}
            >
              <Grid
                item
                container
                direction={'column'}
                md={33}
                xl={80}
                minWidth={'300px'}
              >
                <Box fontSize={16} component={'div'} className="">
                  <Link
                    href={''}
                    className={cn(Style.contact_text, Style.contact__address)}
                  >
                    {contact.address}
                  </Link>
                  <Link
                    href={`mailto:${contact.email}`}
                    className={cn(Style.contact_text, Style.contact__email)}
                  >
                    {contact.email}
                  </Link>

                  {contact?.phone &&
                    contact.phone.map(el => (
                      <Box
                        className={cn(Style.content__title)}
                        fontSize={16}
                        component={'div'}
                        key={el.id}
                      >
                        <Link
                          href={`tel: ${el.number}`}
                          className={cn(Style.contact__phone)}
                        >
                          {el.number}
                        </Link>
                        {el.support.isTelegram && (
                          <Link
                            href={`https://t.me/+38${el.number}`}
                            target="blank"
                            rel="noreferrer nofollow"
                          >
                            <IconButton className={Style.List_hover}>
                              <TbBrandTelegram color={'404040'} />
                            </IconButton>
                          </Link>
                        )}
                        {el.support.isViber && (
                          <Link
                            href={`viber://chat?number=+38${el.number}`}
                            target="blank"
                            rel="noreferrer nofollow"
                          >
                            <IconButton className={Style.List_hover}>
                              <FaViber color={'404040'} />
                            </IconButton>
                          </Link>
                        )}
                        {el.support.isWhatsUp && (
                          <Link
                            href={`https://wa.me/38${el.number}`}
                            target="blank"
                            rel="noreferrer nofollow"
                          >
                            <IconButton className={Style.List_hover}>
                              <FaWhatsapp color={'404040'} />
                            </IconButton>
                          </Link>
                        )}
                      </Box>
                    ))}
                </Box>
              </Grid>
              <Grid
                item
                container
                direction={'column'}
                md={24}
                minWidth={'max-content'}
              >
                <Box fontSize={16} component={'div'}>
                  <Typography
                    mb={2}
                    component={'p'}
                    className={cn(
                      Style.contact__subtitle,
                      Style.contact__schedule,
                    )}
                  >
                    {staticData.schedule}:
                  </Typography>
                  <Box mb={0.5}>
                    <Typography
                      component={'p'}
                      className={Style.contact__subtitle}
                    >
                      {contact.schedule.weekdays.days}
                    </Typography>
                    <Typography component={'p'} className={Style.contact_text}>
                      <time> {contact.schedule.weekdays.time}</time>
                    </Typography>
                  </Box>
                  {contact.schedule.lunchtime.time && (
                    <Box mb={0.5}>
                      <Typography
                        component={'p'}
                        className={Style.contact__subtitle}
                      >
                        {staticData.lunchtime}
                      </Typography>
                      {contact.schedule.lunchtime.days && (
                        <Typography
                          component={'p'}
                          className={Style.contact__subtitle}
                        >
                          {contact.schedule.lunchtime.days}
                        </Typography>
                      )}

                      <Typography
                        component={'p'}
                        className={Style.contact_text}
                      >
                        <time>{contact.schedule.lunchtime.time}</time>
                      </Typography>
                    </Box>
                  )}

                  {contact.schedule.weekend.days && (
                    <Box>
                      <Typography
                        component={'p'}
                        className={Style.contact__subtitle}
                      >
                        {contact.schedule.weekend.days}
                      </Typography>

                      <Typography
                        component={'p'}
                        className={Style.contact_text}
                      >
                        {staticData.weekend}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container>
          <Box display={'flex'} justifyContent={'center'} width="100%" px={2}>
            <Fade in={true} timeout={2000}>
              <Box>
                <ContactSvg
                  width={350}
                  height={328}
                  className={Style.contact__image}
                />
              </Box>
            </Fade>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
