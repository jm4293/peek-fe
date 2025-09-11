// hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

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
    const serverUrl = process.env.NEXT_PUBLIC_API_URL;

    socketRef.current = io(`${serverUrl}/kiwoom/korean/stock`, {
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    // 연결 성공 시
    socket.on('connect', () => {
      console.log('키움 주식 웹소켓 연결됨:', socket.id);
    });

    // 연결 해제 시
    socket.on('disconnect', (reason) => {
      console.log('키움 주식 웹소켓 연결 해제됨:', reason);
    });

    // 연결 에러 처리
    socket.on('connect_error', (error) => {
      console.error('웹소켓 연결 에러:', error);
    });

    // 에러 처리
    socket.on('error', (error) => {
      console.error('웹소켓 에러:', error);
    });

    // 구독 성공 응답
    socket.on('subscribed', (data) => {
      console.log('구독 성공:', data);
    });

    // 구독 해제 성공 응답
    socket.on('unsubscribed', (data) => {
      console.log('구독 해제 성공:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 종목 구독 함수
  const subscribeStock = (symbol: string) => {
    if (socketRef.current) {
      console.log('subscribeStock', symbol);

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
