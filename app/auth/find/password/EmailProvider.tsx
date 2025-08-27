'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface ContextType {
  email: string;
  randomCode: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setRandomCode: Dispatch<SetStateAction<string>>;
}

const EmailContext = createContext<ContextType | undefined>(undefined);

export const useResetPasswordProvider = () => {
  const ctx = useContext(EmailContext);

  if (!ctx) {
    throw new Error('useResetPasswordProvider는 EmailProvider 내부에서 사용해야 합니다.');
  }

  return ctx;
};

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState('');
  const [randomCode, setRandomCode] = useState('');

  return (
    <EmailContext.Provider value={{ email, randomCode, setEmail, setRandomCode }}>{children}</EmailContext.Provider>
  );
}
