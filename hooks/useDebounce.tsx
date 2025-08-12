import { useEffect, useState } from 'react';

interface IProps {
  text: string;
  delay: number;
}

export function useDebounce(props: IProps) {
  const { text, delay } = props;

  const [debouncedText, setDebouncedText] = useState(text);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedText(text);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsPending(false);
    };
  }, [text, delay]);

  return { debouncedText, isPending };
}
