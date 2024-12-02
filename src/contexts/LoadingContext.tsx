import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  hasShownLoadingScreen: boolean;
  setHasShownLoadingScreen: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasShownLoadingScreen, setHasShownLoadingScreen] = useState(false);

  return (
    <LoadingContext.Provider value={{ hasShownLoadingScreen, setHasShownLoadingScreen }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};