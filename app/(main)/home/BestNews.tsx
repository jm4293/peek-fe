'use client';

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface StockData {
  stock_code: string;
  time: string;
  price: string;
  prev_sign: string;
  prev: string;
  volume: string;
}

export default function StockRealtime() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'closed'>(
    'connecting',
  );
  const [subscribedStock, setSubscribedStock] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [inputStockCode, setInputStockCode] = useState<string>('');

  useEffect(() => {
    const serverUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.peek.run' // 실제 서버 주소로 변경
        : 'http://localhost:42930';

    // 네임스페이스 '/realtime' 연결
    const newSocket = io(`${serverUrl}/realtime`, { transports: ['websocket'] });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnectionStatus('connected');
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('closed');
    });

    newSocket.on('connect_error', () => {
      setConnectionStatus('error');
    });

    newSocket.on('stock_data', (StockData) => {
      setStockData(StockData);
    });

    return () => {
      if (subscribedStock) {
        newSocket.emit('unsubscribe_stock'); // 구독 해제 요청
      }
      newSocket.disconnect();
    };
  }, []);

  const handleSubscribe = () => {
    if (!socket) return;

    if (!inputStockCode.trim()) return alert('종목 코드를 입력해주세요.');

    // 구독 요청
    socket.emit('subscribe_stock', { stock_code: inputStockCode.trim() });
    setSubscribedStock(inputStockCode.trim());
    setStockData(null);
  };

  const handleUnsubscribe = () => {
    if (!socket) return;

    socket.emit('unsubscribe_stock');
    setSubscribedStock(null);
    setStockData(null);
  };

  return (
    <div>
      <h2>실시간 종목 시세 구독</h2>
      <input
        type="text"
        placeholder="종목 코드 입력 (예: AAPL)"
        value={inputStockCode}
        onChange={(e) => setInputStockCode(e.target.value.toUpperCase())}
      />
      <button onClick={handleSubscribe} disabled={connectionStatus !== 'connected'}>
        구독 시작
      </button>
      <button onClick={handleUnsubscribe} disabled={!subscribedStock}>
        구독 해제
      </button>

      <div>
        <p>연결 상태: {connectionStatus}</p>
        {subscribedStock && <p>구독 중: {subscribedStock}</p>}

        {stockData ? (
          <div>
            <p>종목코드: {stockData.stock_code}</p>
            <p>시간: {stockData.time}</p>
            <p>가격: {stockData.price}</p>
            <p>
              직전 변동: {stockData.prev_sign} {stockData.prev}
            </p>
            <p>거래량: {stockData.volume}</p>
          </div>
        ) : (
          <p>데이터 수신 대기 중...</p>
        )}
      </div>
    </div>
  );
}
