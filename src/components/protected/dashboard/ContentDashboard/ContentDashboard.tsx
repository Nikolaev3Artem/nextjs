'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React, { useEffect, useState } from 'react';

import Style from './contentdashboard.module.css';
import Button from '@mui/material/Button';

import { usePathname, useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';
import { useLangContext } from '@/app/context';

interface IContentDashboardProps {
  children: React.ReactNode;
  title: string;
  back: string;
}

export const ContentDashboard = ({
  title,
  children,
  back,
}: IContentDashboardProps) => {
  const [path, setPath] = useState('');
  const { setSelectLang } = useLangContext();
  const pathname = usePathname();
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    setPath(pathname);
  }, []);

  useEffect(() => {
    setSelectLang('uk');
  }, []);
  return (
    <>
      <Box className={Style.content}>
        <Stack
          mb={2}
          direction={'row'}
          spacing={2}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
        >
          {path !== '/dashboard/rent' ? (
            <Box>
              <Button
                sx={{
                  // height: 27,
                  color: '#737373',
                }}
                startIcon={<IoIosArrowBack />}
                onClick={handleBack}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#737373',
                    textTransform: 'none',
                  }}
                >
                  {back}
                </Typography>
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <Typography
            display={'flex'}
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '20px',
              lineHeight: '140%',
              color: '#404040',
            }}
            mb={2}
          >
            {title}
          </Typography>
        </Stack>

        {children}
      </Box>
    </>
  );
};
