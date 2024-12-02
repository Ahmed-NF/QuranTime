import React, { createContext, useContext, useState } from 'react';

interface FocusContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

const FocusContext = createContext<FocusContextType | null>(null);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleFocusMode = () => {
    setIsFocusMode(prev => !prev);
  };

  return (
    <FocusContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};