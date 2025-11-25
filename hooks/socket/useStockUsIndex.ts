import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';

export const useStockUsIndex = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

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

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return {
      loading: true,
      isConnected: true,
    };
  }

  if (!isConnected) {
    return {
      loading: false,
      isConnected: false,
    };
  }

  return {
    loading: false,
    isConnected: true,
  };
};
