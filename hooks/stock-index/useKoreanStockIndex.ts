import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';
import { KOSDAQ_CODE, KOSPI_CODE } from '@/shared/constant/stock-code';
import { IKoreanStockIndex } from '@/shared/types/stock-index';

interface IProps {
  isKospi: boolean;
  isKosdaq: boolean;
}

export const useKoreanStockIndex = (props: IProps) => {
  const { isKospi, isKosdaq } = props;

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const [kospi, setKospi] = useState<IKoreanStockIndex | null>(null);
  const [kosdaq, setKosdaq] = useState<IKoreanStockIndex | null>(null);

  useEffect(() => {
    const socket = io(`${API_URL}/kis/korean/index`, {
      transports: ['websocket'],
    });

    if (!socket) {
      setIsConnected(false);
      return;
    }

    if (!socket.connected) {
      setIsConnected(false);
      return;
    }

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

  if (!isConnected) {
    return {
      kospi: null,
      kosdaq: null,
      loading: false,
      isConnected: false,
    };
  }

  if (loading) {
    return {
      kospi: null,
      kosdaq: null,
      loading: true,
      isConnected: true,
    };
  }

  return {
    kospi,
    kosdaq,
    loading,
    isConnected,
  };
};
