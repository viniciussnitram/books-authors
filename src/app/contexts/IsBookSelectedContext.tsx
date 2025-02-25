import { createContext, ReactNode, useState } from "react";

interface IIsBookSelectedContext {
  isBookSelected: boolean;
  setIsBookSelected: (value: boolean) => void;
}

export const IsBookSelectedContext = createContext<IIsBookSelectedContext | undefined>(undefined);

interface IIsBookSelectedProviderProps {
  children: ReactNode;
}

export const IsBookSelectedProvider = ({ children }: IIsBookSelectedProviderProps) => {
  const [isBookSelected, setIsBookSelected] = useState(true);

  return (
    <IsBookSelectedContext.Provider value={{ isBookSelected, setIsBookSelected }}>
      {children}
    </IsBookSelectedContext.Provider>
  );
}