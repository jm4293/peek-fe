import { useState } from 'react';

export const useInput = <T,>(initialState: T) => {
  const [inputs, setInputs] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    console.log(name, value, type, checked);

    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return [inputs, handleChange, setInputs] as const;
};
