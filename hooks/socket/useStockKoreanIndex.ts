import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';
import { KOSDAQ_CODE, KOSPI_CODE } from '@/shared/constant/stock-code';
import { KoreanStockIndex } from '@/shared/types/stock';

interface Props {
  isKospi: boolean;
  isKosdaq: boolean;
}

export const useStockKoreanIndex = (props: Props) => {
  const { isKospi, isKosdaq } = props;

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const [kospi, setKospi] = useState<KoreanStockIndex | null>(null);
  const [kosdaq, setKosdaq] = useState<KoreanStockIndex | null>(null);

  useEffect(() => {
    const socket = io(`${API_URL}/ls/korean/index`, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      setIsConnected(false);
    });

    socket.on('connected', () => {
      setIsConnected(true);
    });

    socket.onAny((eventName, ...args) => {
      setLoading(false);
    });

    if (isKospi) {
      socket.on(KOSPI_CODE, (data: KoreanStockIndex, createdAt: Date) => {
        setKospi(data ? { ...data, createdAt } : null);
      });
    }

    if (isKosdaq) {
      socket.on(KOSDAQ_CODE, (data: KoreanStockIndex, createdAt: Date) => {
        setKosdaq(data ? { ...data, createdAt } : null);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [isKospi, isKosdaq]);

  if (loading) {
    return {
      kospi: null,
      kosdaq: null,
      loading: true,
      isConnected: true,
    };
  }

  if (!isConnected) {
    return {
      kospi: null,
      kosdaq: null,
      loading: false,
      isConnected: false,
    };
  }

  return {
    kospi,
    kosdaq,
    loading: false,
    isConnected: true,
  };
};
