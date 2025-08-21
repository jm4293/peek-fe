'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

interface IProps {
  token: string;
}

// Bid Price: 매수호가
// Ask Price: 매도호가
// Buy Balance: 매수 잔고
// Sell Balance: 매도 잔고

export default function BestNews(props: IProps) {
  const { token } = props;

  const [priceData, setPriceData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://ops.koreainvestment.com:21000');

    ws.onopen = () => {
      const subscribeMsg = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'HDFSASP0',
            tr_key: 'DNASAAPL',
          },
        },
      };

      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = (event) => {
      const data = event.data?.split('|')[3]?.split('^');

      if (data) {
        setPriceData({
          symbol: data[1],
          localDate: data[3],
          localTime: data[4],
          koreanDate: data[5],
          koreanTime: data[6],
          bidPrice: data[11],
          askPrice: data[12],
          buyBalance: data[13],
          sellBalance: data[14],
        });
      }
    };

    ws.onerror = (error) => {};

    ws.onclose = () => {};

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        const unsubscribeMsg = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '2',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'HDFSASP0',
              tr_key: 'RNASAAPL',
            },
          },
        };

        ws.send(JSON.stringify(unsubscribeMsg));
        ws.close();
      }
    };
  }, []);

  if (!priceData) return <div>로딩 중...</div>;

  return (
    <Wrapper title="애플 실시간 시세">
      <div className="flex flex-col gap-2">
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
