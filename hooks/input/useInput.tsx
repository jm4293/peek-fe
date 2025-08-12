import { useState } from 'react';

export const useInput = <T,>(initialState: T) => {
  const [inputs, setInputs] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return [inputs, handleChange, setInputs] as const;
};
