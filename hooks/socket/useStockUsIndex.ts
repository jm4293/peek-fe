import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';
import { DOWJONES_TR_KEY, INDEXNASDAQ_TR_KEY, NASDAQ_TR_KEY, SP500_TR_KEY } from '@/shared/constant/stock-code';
import { UsStockIndex } from '@/shared/types/stock';

export const useStockUsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const [dowJones, setDowJones] = useState<UsStockIndex | null>(null);
  const [sp500, setSp500] = useState<UsStockIndex | null>(null);
  const [nasdaq, setNasdaq] = useState<UsStockIndex | null>(null);
  const [indexNasdaq, setIndexNasdaq] = useState<UsStockIndex | null>(null);

  useEffect(() => {
    const socket = io(`${API_URL}/ls/us/index`, {
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

    socket.on(DOWJONES_TR_KEY, (data: UsStockIndex, createdAt: Date) => {
      setDowJones(data ? { ...data, createdAt } : null);
    });

    socket.on(SP500_TR_KEY, (data: UsStockIndex, createdAt: Date) => {
      setSp500(data ? { ...data, createdAt } : null);
    });

    socket.on(NASDAQ_TR_KEY, (data: UsStockIndex, createdAt: Date) => {
      setNasdaq(data ? { ...data, createdAt } : null);
    });

    socket.on(INDEXNASDAQ_TR_KEY, (data: UsStockIndex, createdAt: Date) => {
      setIndexNasdaq(data ? { ...data, createdAt } : null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return {
      dowJones: null,
      sp500: null,
      nasdaq: null,
      indexNasdaq: null,
      loading: true,
      isConnected: true,
    };
  }

  if (!isConnected) {
    return {
      dowJones: null,
      sp500: null,
      nasdaq: null,
      indexNasdaq: null,
      loading: false,
      isConnected: false,
    };
  }

  return {
    dowJones,
    sp500,
    nasdaq,
    indexNasdaq,
    loading: false,
    isConnected: true,
  };
};
