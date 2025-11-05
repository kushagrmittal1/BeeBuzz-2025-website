import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  isPreloaderActive: boolean;
  setPreloaderComplete: (complete: boolean) => void;
  setPreloaderActive: (active: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
};

interface PreloaderProviderProps {
  children: ReactNode;
}

export const PreloaderProvider: React.FC<PreloaderProviderProps> = ({ children }) => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  const setPreloaderComplete = (complete: boolean) => {
    setIsPreloaderComplete(complete);
  };

  const setPreloaderActive = (active: boolean) => {
    setIsPreloaderActive(active);
  };

  return (
    <PreloaderContext.Provider value={{ 
      isPreloaderComplete, 
      isPreloaderActive, 
      setPreloaderComplete, 
      setPreloaderActive 
    }}>
      {children}
    </PreloaderContext.Provider>
  );
};
