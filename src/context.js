import React from 'react';
import { useContext, useState } from 'react';

const AppContext = React.createContext();
export const AppProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState({
    message: '',
    color: '',
    type: '',
  });
  const [dataFromDB, setDataFromDB] = useState(null);

  return (
    <AppContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        dataFromDB,
        setDataFromDB,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
