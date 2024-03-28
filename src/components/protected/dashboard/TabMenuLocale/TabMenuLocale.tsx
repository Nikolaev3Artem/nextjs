'use client';

import TabPanel from '@mui/lab/TabPanel';
import { Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import React from 'react';

// import { useAppDispatch } from '../../../../store/auth/redux';
// import { setLocales } from '../../../../store/localeSlice';
import theme from '../../../../theme';
import EN from '../../../../../public/icons/en.svg';
import LT from '../../../../../public/icons/lt.svg';
import PT from '../../../../../public/icons/pt.svg';
import UK from '../../../../../public/icons/uk.svg';
import Style from '../TabMenuLocale/tabmenu.module.css';
import { dashboardAboutStaticData, TabProps } from '@/interface/IStaticData';
import { useLangContext } from '@/app/context';

interface ITabMenuLocaleProps {
  children: React.ReactNode;
  staticData: dashboardAboutStaticData;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'UK':
      return <UK width={24} height={24} />;
    case 'EN':
      return <EN width={24} height={24} />;
    case 'PT':
      return <PT width={24} height={24} />;
    case 'LT':
      return <LT width={24} height={24} />;
    default:
      return <UK width={24} height={24} />;
  }
};

export const TabMenuLocale = ({
  children,
  staticData,
}: ITabMenuLocaleProps) => {
  const [value, setValue] = React.useState<number>(0);
  const { setSelectLang } = useLangContext();
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(id: number) {
    return {
      id: `simple-tab-${id}`,
      'aria-controls': `simple-tabpanel-${id}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const lang = staticData.tab.find(item => item.id === newValue)?.lang;
    lang ? setSelectLang(lang) : setSelectLang('uk');
  };

  return (
    <>
      <Box
        pt={4}
        px={4}
        sx={{ backgroundColor: theme.palette.background.default }}
        className={Style.content_dashboard}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            {staticData.tab &&
              staticData.tab.map((item: TabProps) => (
                <Tab
                  key={item.id}
                  {...a11yProps(item.id)}
                  sx={{
                    minHeight: 48,
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                  iconPosition={'start'}
                  icon={getIcon(item.icon)}
                  label={item.name}
                />
              ))}
          </Tabs>
        </Box>
        {staticData.tab &&
          staticData.tab.map((item: TabProps) => (
            <TabPanel key={item.id} value={value} index={item.id}>
              {children}
            </TabPanel>
          ))}
      </Box>
    </>
  );
};
