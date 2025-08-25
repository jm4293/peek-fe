'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { Wrapper } from '@/components/wrapper';

const KOSPI = '0001';
const KOSDAQ = '1001';

interface IProps {
  tr_id?: string;
  tr_key?: string;
  symbolName?: string;
}

export default function BestWeekend(props: IProps) {
  const { tr_id = 'HDFSASP0', tr_key = 'DNASAAPL', symbolName = '애플' } = props;

  const [priceData, setPriceData] = useState<Record<string, any> | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'closed'>(
    'connecting',
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]); // 디버깅용

  const [kospi, setKospi] = useState<Record<string, string> | null>(null);
  const [kosdaq, setKosdaq] = useState<Record<string, string> | null>(null);

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    const serverUrl = process.env.NODE_ENV === 'production' ? 'https://api.peek.run' : 'http://localhost:42930';

    // addDebugInfo(`서버 연결 시도: ${serverUrl}`);

    const newSocket = io(`${serverUrl}/kis-websocket`, {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      addDebugInfo(`Socket 연결 성공: ${newSocket.id}`);
      setConnectionStatus('connected');

      // 구독 요청
      // addDebugInfo(`구독 요청: tr_id=${tr_id}, tr_key=${tr_key}`);
      // newSocket.emit('subscribe', { tr_id, tr_key });
    });

    // newSocket.on('data', (data) => {
    //   console.log('data', data);
    // });

    newSocket.on(KOSPI, (data) => {
      setKospi(data);
    });

    newSocket.on(KOSDAQ, (data) => {
      setKosdaq(data);
    });

    newSocket.on('subscribed', (data) => {
      // addDebugInfo(`구독 성공: ${JSON.stringify(data)}`);
      // console.log('구독 성공:', data);
    });

    newSocket.on('price-update', (data) => {
      // addDebugInfo(`가격 데이터 수신: ${JSON.stringify(data)}`);
      // setPriceData(data);
    });

    newSocket.on('kis-connected', () => {
      // addDebugInfo('KIS WebSocket 연결됨');
      // console.log('KIS WebSocket 연결됨');
    });

    newSocket.on('kis-error', (error) => {
      // addDebugInfo(`KIS 오류: ${JSON.stringify(error)}`);
      // setConnectionStatus('error');
      // console.error('KIS WebSocket 오류:', error);
    });

    newSocket.on('kis-disconnected', () => {
      // addDebugInfo('KIS WebSocket 연결 해제됨');
      // console.log('KIS WebSocket 연결 해제됨');
    });

    newSocket.on('disconnect', () => {
      addDebugInfo('Socket 연결 해제됨');
      setConnectionStatus('closed');
    });

    newSocket.on('connect_error', (error) => {
      // addDebugInfo(`Socket 연결 오류: ${error.message}`);
      // setConnectionStatus('error');
      // console.error('Socket 연결 오류:', error);
    });

    return () => {
      addDebugInfo('컴포넌트 언마운트 - 구독 해제');
      // newSocket.emit('unsubscribe', { tr_id, tr_key });
      newSocket.disconnect();
    };
  }, [tr_id, tr_key]);

  // if (connectionStatus === 'connecting') {
  //   return (
  //     <Wrapper title={`${symbolName} 실시간 시세`}>
  //       <div>실시간 데이터 연결 중...</div>
  //       <div className="text-xs text-gray-500 mt-2">
  //         <div>디버그 정보:</div>
  //         {debugInfo.slice(-5).map((info, index) => (
  //           <div key={index}>{info}</div>
  //         ))}
  //       </div>
  //     </Wrapper>
  //   );
  // }

  // if (connectionStatus === 'error') {
  //   return (
  //     <Wrapper title={`${symbolName} 실시간 시세`}>
  //       <div className="text-red-500">연결 오류가 발생했습니다.</div>
  //       <div className="text-xs text-gray-500 mt-2">
  //         <div>디버그 정보:</div>
  //         {debugInfo.slice(-5).map((info, index) => (
  //           <div key={index}>{info}</div>
  //         ))}
  //       </div>
  //     </Wrapper>
  //   );
  // }

  // if (!priceData) {
  //   return (
  //     <Wrapper title={`${symbolName} 실시간 시세`}>
  //       <div>데이터 수신 대기 중...</div>
  //       <div className="text-xs text-gray-500 mt-2">
  //         <div>디버그 정보:</div>
  //         {debugInfo.slice(-5).map((info, index) => (
  //           <div key={index}>{info}</div>
  //         ))}
  //       </div>
  //     </Wrapper>
  //   );
  // }

  // return (
  //   <Wrapper title={`${symbolName} 실시간 시세`}>
  //     <div className="flex flex-col gap-2">
  //       <div className="text-green-500 text-sm">🟢 실시간 연결됨</div>
  //       <p>심볼: {priceData.symbol}</p>
  //       <p>로컬 시간: {dayjs(priceData.localDate + ' ' + priceData.localTime).format('YYYY-MM-DD HH:mm:ss')}</p>
  //       <p>한국 시간: {dayjs(priceData.koreanDate + ' ' + priceData.koreanTime).format('YYYY-MM-DD HH:mm:ss')}</p>
  //       <p>매수 호가: {priceData.bidPrice}</p>
  //       <p>매도 호가: {priceData.askPrice}</p>
  //       <p>매수 잔고: {priceData.buyBalance}</p>
  //       <p>매도 잔고: {priceData.sellBalance}</p>
  //     </div>
  //   </Wrapper>
  // );

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p>KOSPI:</p>
          <p style={{ color: kospi?.prev_sign === '2' ? 'blue' : kospi?.prev_sign === '5' ? 'red' : 'black' }}>
            {kospi?.prev_sign === '2' ? '+' : kospi?.prev_sign === '5' ? '-' : '*'}
            {kospi?.price || '-'}
          </p>
          <p style={{ color: kospi?.prev_sign === '2' ? 'blue' : kospi?.prev_sign === '5' ? 'red' : 'black' }}>
            {kospi?.prev || '-'}
          </p>
          <p>{`${
            kospi?.time ? kospi?.time.slice(0, 2) + ':' + kospi?.time.slice(2, 4) + ':' + kospi?.time.slice(4, 6) : '-'
          }
          `}</p>
        </div>

        <div className="flex items-center gap-2">
          <p>KOSDAQ:</p>
          <p style={{ color: kosdaq?.prev_sign === '2' ? 'blue' : kosdaq?.prev_sign === '5' ? 'red' : 'black' }}>
            {kosdaq?.prev_sign === '2' ? '+' : kosdaq?.prev_sign === '5' ? '-' : '*'}
            {kosdaq?.price || '-'}
          </p>
          <p style={{ color: kosdaq?.prev_sign === '2' ? 'blue' : kosdaq?.prev_sign === '5' ? 'red' : 'black' }}>
            {kosdaq?.prev || '-'}
          </p>
          <p>{`${
            kosdaq?.time
              ? kosdaq?.time.slice(0, 2) + ':' + kosdaq?.time.slice(2, 4) + ':' + kosdaq?.time.slice(4, 6)
              : '-'
          }
          `}</p>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
