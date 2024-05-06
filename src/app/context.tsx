'use client';
import React, { createContext, useContext, useState } from 'react';

type RoutsContextType = {
  selectRoutsTo: string;
  setSelectRoutsTo: (value: string) => void;
  selectRoutsFrom: string;
  setSelectRoutsFrom: (value: string) => void;
};

type LangContextType = {
  selectLang: string;
  setSelectLang: (value: string) => void;
};

type CurrencyContextType = {
  selectCurrency: number;
  setSelectCurrency: (value: number) => void;
};

const RoutsContext = createContext<RoutsContextType | undefined>(undefined);
const LangContext = createContext<LangContextType | undefined>(undefined);
const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const RoutsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectRoutsTo, setSelectRoutsTo] = useState('');
  const [selectRoutsFrom, setSelectRoutsFrom] = useState('');

  return (
    <RoutsContext.Provider
      value={{
        selectRoutsTo,
        setSelectRoutsTo,
        selectRoutsFrom,
        setSelectRoutsFrom,
      }}
    >
      {children}
    </RoutsContext.Provider>
  );
};

export const LangContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectLang, setSelectLang] = useState('uk');

  return (
    <LangContext.Provider
      value={{
        selectLang,
        setSelectLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const CurrencyContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectCurrency, setSelectCurrency] = useState(3);

  return (
    <CurrencyContext.Provider
      value={{
        selectCurrency,
        setSelectCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useRoutsContext = () => {
  const context = useContext(RoutsContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
};

export const useLangContext = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
};
