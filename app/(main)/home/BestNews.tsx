'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

interface IProps {
  token: string;
}

export default function BestNews(props: IProps) {
  const { token } = props;

  const [priceData, setPriceData] = useState<Record<string, any> | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'closed'>(
    'connecting',
  );
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 환경에 따른 서버 URL 설정
    const serverUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.peek.run' // 프로덕션 백엔드 URL
        : 'http://localhost:42930'; // 개발 백엔드 URL

    const newSocket = io(`${serverUrl}/kis-websocket`, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('서버에 연결됨');
      setConnectionStatus('connected');

      // 구독 요청
      newSocket.emit('subscribe', { token, symbol: 'DNASAAPL' });
    });

    newSocket.on('subscribed', (data) => {
      console.log('구독 완료:', data);
    });

    newSocket.on('price-update', (data) => {
      console.log('가격 데이터 수신:', data);
      setPriceData(data);
    });

    newSocket.on('kis-connected', () => {
      console.log('KIS WebSocket 연결됨');
    });

    newSocket.on('kis-error', (error) => {
      console.error('KIS WebSocket 오류:', error);
      setConnectionStatus('error');
    });

    newSocket.on('kis-disconnected', () => {
      console.log('KIS WebSocket 연결 해제됨');
    });

    newSocket.on('disconnect', () => {
      console.log('서버 연결 해제됨');
      setConnectionStatus('closed');
    });

    newSocket.on('connect_error', (error) => {
      console.error('연결 오류:', error);
      setConnectionStatus('error');
    });

    return () => {
      // 구독 해제
      newSocket.emit('unsubscribe', { token, symbol: 'DNASAAPL' });
      newSocket.disconnect();
    };
  }, [token]);

  if (connectionStatus === 'connecting') {
    return (
      <Wrapper title="애플 실시간 시세">
        <div>실시간 데이터 연결 중...</div>
      </Wrapper>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <Wrapper title="애플 실시간 시세">
        <div className="text-red-500">연결 오류가 발생했습니다.</div>
      </Wrapper>
    );
  }

  if (!priceData) {
    return (
      <Wrapper title="애플 실시간 시세">
        <div>데이터 수신 대기 중...</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="애플 실시간 시세">
      <div className="flex flex-col gap-2">
        <div className="text-green-500 text-sm">🟢 실시간 연결됨</div>
        <p>심볼: {priceData.symbol}</p>
        <p>로컬 시간: {dayjs(priceData.localDate + ' ' + priceData.localTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>한국 시간: {dayjs(priceData.koreanDate + ' ' + priceData.koreanTime).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>매수 호가: {priceData.bidPrice}</p>
        <p>매도 호가: {priceData.askPrice}</p>
        <p>매수 잔고: {priceData.buyBalance}</p>
        <p>매도 잔고: {priceData.sellBalance}</p>
      </div>
    </Wrapper>
  );
}
