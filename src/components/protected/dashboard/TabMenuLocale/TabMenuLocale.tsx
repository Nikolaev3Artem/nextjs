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

const tab = [
  { id: 0, lang: 'uk', name: 'Українська', icon: <UK /> },
  { id: 1, lang: 'en', name: 'Англійська', icon: <EN /> },
  { id: 2, lang: 'pt', name: 'Португальська', icon: <PT /> },
  { id: 3, lang: 'lt', name: 'Литовська', icon: <LT /> },
];

interface ITab {
  id: number;
  lang: string;
  name?: string;
  icon?: JSX.Element;
}
// interface IBannerProps {
// 	res?: IBanner[]
// }
interface ITabMenuLocaleProps {
  children: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabMenuLocale = ({ children }: ITabMenuLocaleProps) => {
  const [value, setValue] = React.useState<number>(0);

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
    const lang = tab.find(item => item.id === newValue);
    // if (lang) {
    //   dispatch(setLocales(lang.lang));
    // }
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
            {tab &&
              tab.map((item: ITab) => (
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
                  icon={item.icon}
                  label={item.name}
                />
              ))}
          </Tabs>
        </Box>
        {tab &&
          tab.map((item: ITab) => (
            <TabPanel key={item.id} value={value} index={item.id}>
              {children}
            </TabPanel>
          ))}
      </Box>
    </>
  );
};
