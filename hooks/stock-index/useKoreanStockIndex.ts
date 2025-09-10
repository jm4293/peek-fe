import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { KOSDAQ_CODE, KOSPI_CODE } from '@/shared/constant/stock-code';
import { IKoreanStockIndex } from '@/shared/types/stock-index';

interface IProps {
  isKospi: boolean;
  isKosdaq: boolean;
}

export const useKoreanStockIndex = (props: IProps) => {
  const { isKospi, isKosdaq } = props;

  const [kospi, setKospi] = useState<IKoreanStockIndex | null>(null);
  const [kosdaq, setKosdaq] = useState<IKoreanStockIndex | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_API_URL;

    const socket = io(`${serverUrl}/kis/korean/index`, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      setLoading(false);
    });

    if (isKospi) {
      socket.on(KOSPI_CODE, (data: IKoreanStockIndex) => {
        setKospi(data || null);
      });
    }

    if (isKosdaq) {
      socket.on(KOSDAQ_CODE, (data: IKoreanStockIndex) => {
        setKosdaq(data || null);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return {
      kospi: null,
      kosdaq: null,
      loading: true,
    };
  }

  return {
    kospi,
    kosdaq,
    loading,
  };
};
