'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { IStockCompanyModel } from '@/services/stock';

interface ContextType {
  stock: IStockCompanyModel | null;
  setStock: Dispatch<SetStateAction<IStockCompanyModel | null>>;
}

const StockContext = createContext<ContextType | undefined>(undefined);

export const useStockProvider = () => {
  const ctx = useContext(StockContext);

  if (!ctx) {
    throw new Error('useStockCodeProvider는 StockCodeProvider 내부에서 사용해야 합니다.');
  }

  return ctx;
};

export function StockCodeProvider({ children }: { children: React.ReactNode }) {
  const [stock, setStock] = useState<IStockCompanyModel | null>(null);

  return <StockContext.Provider value={{ stock, setStock }}>{children}</StockContext.Provider>;
}
