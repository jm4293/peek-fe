import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';
import { KoreanStockTop10 } from '@/shared/types/stock';

export const useStockKoreanTop10 = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const [data, setData] = useState<{ list: KoreanStockTop10[]; createdAt: Date } | null>(null);

  useEffect(() => {
    const socket = io(`${API_URL}/ls/korean/top10`, {
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

    socket.on('korean-top-10', (data: KoreanStockTop10[], createdAt: Date) => {
      setData(data ? { list: data, createdAt } : null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return {
      loading: true,
      isConnected: true,
      data: null,
    };
  }

  if (!isConnected) {
    return {
      loading: false,
      isConnected: false,
      data: null,
    };
  }

  return {
    loading: false,
    isConnected: true,
    data,
  };
};
