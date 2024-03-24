'use client';
import React, { createContext, useContext, useState } from 'react';

type RoutsContextType = {
  selectRoutsTo: string;
  setSelectRoutsTo: (value: string) => void;
  selectRoutsFrom: string;
  setSelectRoutsFrom: (value: string) => void;
};

const RoutsContext = createContext<RoutsContextType | undefined>(undefined);

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

export const useRoutsContext = () => {
  const context = useContext(RoutsContext);
  if (context === undefined) {
    throw new Error('error');
  }
  return context;
};
