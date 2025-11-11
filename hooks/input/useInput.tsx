import DOMPurify from 'dompurify';
import { useState } from 'react';

export const useInput = <T,>(initialState: T) => {
  const [inputs, setInputs] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement;

    const sanitizedValue = DOMPurify.sanitize(value);
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setInputs((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : sanitizedValue,
    }));
  };

  return [inputs, handleChange, setInputs] as const;
};
