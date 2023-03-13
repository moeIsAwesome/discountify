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
  const [loading, setLoading] = useState(false);
  const [showTableShimmer, setShowTableShimmer] = useState(true);

  return (
    <AppContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        dataFromDB,
        setDataFromDB,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
