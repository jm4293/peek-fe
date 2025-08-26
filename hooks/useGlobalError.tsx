import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext({
  error: null as null | Error,
  setError: (err: Error | null) => {},
});

export const useGlobalError = () => useContext(ErrorContext);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}
