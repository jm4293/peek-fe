import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

import { API_URL } from '@/shared/constant/api-url';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changeRate: number;
  volume: number;
  timestamp: Date;
}

export const useKoreanStockSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(`${API_URL}/kiwoom/korean/stock`, {
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    socket.on('connect', () => {});

    // 연결 성공 시
    socket.on('connected', () => {});

    // 연결 해제 시
    socket.on('disconnect', (reason) => {});

    // 연결 에러 처리
    socket.on('connect_error', (error) => {});

    // 에러 처리
    socket.on('error', (error) => {});

    // 구독 성공 응답
    socket.on('subscribed', (data) => {});

    // 구독 해제 성공 응답
    socket.on('unsubscribed', (data) => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  // 종목 구독 함수
  const subscribeStock = (symbol: string) => {
    if (socketRef.current) {
      socketRef.current.emit('subscribe_stock', { symbol });
    }
  };

  // 종목 구독 해제 함수
  const unsubscribeStock = (symbol: string) => {
    if (socketRef.current) {
      socketRef.current.emit('unsubscribe_stock', { symbol });
    }
  };

  // 특정 종목의 실시간 데이터 구독
  const onStockUpdate = (symbol: string, callback: (data: StockData) => void) => {
    if (socketRef.current) {
      socketRef.current.on(`stock_${symbol}`, callback);
    }
  };

  // 특정 종목의 실시간 데이터 구독 해제
  const offStockUpdate = (symbol: string, callback: (data: StockData) => void) => {
    if (socketRef.current) {
      socketRef.current.off(`stock_${symbol}`, callback);
    }
  };

  return {
    subscribeStock,
    unsubscribeStock,
    onStockUpdate,
    offStockUpdate,
    socket: socketRef.current,
  };
};
