'use client';

import { createContext, useContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const EmailContext = createContext<{
  email: string | null;
  randomCode: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setRandomCode: React.Dispatch<React.SetStateAction<string>>;
}>({
  email: null,
  randomCode: null,
  setEmail: () => {},
  setRandomCode: () => {},
});

export const useResetPasswordProvider = () => useContext(EmailContext);

export function EmailProvider(props: IProps) {
  const { children } = props;

  const [email, setEmail] = useState('');
  const [randomCode, setRandomCode] = useState('');

  return (
    <EmailContext.Provider value={{ email, randomCode, setEmail, setRandomCode }}>{children}</EmailContext.Provider>
  );
}
