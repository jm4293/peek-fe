'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface IProps {
  token: string;
}

// Bid Price: 매수호가
// Ask Price: 매도호가
// Buy Balance: 매수 잔고
// Sell Balance: 매도 잔고

const KOSPI = '0001';
const KOSDAQ = '1001';

const KOSPI_005930 = '005930'; // 삼성전자
const KOSPI_005935 = '005935'; // 삼성전자우
const KOSPI_063300 = '063300'; // 엘지씨엔에스
const KOSPI_225570 = '225570'; // 넥슨게임즈

export default function BestNews(props: IProps) {
  const { token } = props;

  const [priceData, setPriceData] = useState<Record<string, any> | null>(null);
  const [priceData2, setPriceData2] = useState<string | null>(null);
  const [priceData3, setPriceData3] = useState<string | null>(null);
  const [priceData4, setPriceData4] = useState<string | null>(null);
  const [priceData5, setPriceData5] = useState<string | null>(null);
  const [priceData6, setPriceData6] = useState<string | null>(null);
  const [priceData7, setPriceData7] = useState<string | null>(null);

  useEffect(() => {
    const ws =
      process.env.NODE_ENV === 'production'
        ? new WebSocket('wss://ops.koreainvestment.com:21000')
        : new WebSocket('ws://ops.koreainvestment.com:21000');

    ws.onopen = () => {
      //   const subscribeMsg = {
      //     header: {
      //       approval_key: token,
      //       custtype: 'P',
      //       tr_type: '1',
      //       'content-type': 'utf-8',
      //     },
      //     body: {
      //       input: {
      //         tr_id: 'HDFSASP0',
      //         tr_key: 'DNASAAPL',
      //       },
      //     },
      //   };

      const subscribeMsg2 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0UPCNT0',
            tr_key: KOSPI,
          },
        },
      };

      const subscribeMsg3 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0UPCNT0',
            tr_key: KOSDAQ,
          },
        },
      };

      const subscribeMsg4 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0',
            tr_key: KOSPI_005930,
          },
        },
      };

      const subscribeMsg5 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0',
            tr_key: KOSPI_005935,
          },
        },
      };

      const subscribeMsg6 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0',
            tr_key: KOSPI_063300,
          },
        },
      };

      const subscribeMsg7 = {
        header: {
          approval_key: token,
          custtype: 'P',
          tr_type: '1',
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0',
            tr_key: KOSPI_225570,
          },
        },
      };

      // ws.send(JSON.stringify(subscribeMsg));
      ws.send(JSON.stringify(subscribeMsg2));
      ws.send(JSON.stringify(subscribeMsg3));
      ws.send(JSON.stringify(subscribeMsg4));
      ws.send(JSON.stringify(subscribeMsg5));
      ws.send(JSON.stringify(subscribeMsg6));
      ws.send(JSON.stringify(subscribeMsg7));
    };

    ws.onmessage = (event) => {
      const data = event.data?.split('|')[3]?.split('^');

      // if (data) {
      //   setPriceData({
      //     symbol: data[1],
      //     localDate: data[3],
      //     localTime: data[4],
      //     koreanDate: data[5],
      //     koreanTime: data[6],
      //     bidPrice: data[11],
      //     askPrice: data[12],
      //     buyBalance: data[13],
      //     sellBalance: data[14],
      //   });
      // }

      switch (data[0]) {
        case KOSPI:
          setPriceData2(data[2]);

          break;
        case KOSDAQ:
          setPriceData3(data[2]);
          break;
        case KOSPI_005930:
          setPriceData4(data[2]);
          break;
        case KOSPI_005935:
          setPriceData5(data[2]);
          break;
        case KOSPI_063300:
          setPriceData6(data[2]);
          break;
        case KOSPI_225570:
          setPriceData7(data[2]);
          break;
        default:
          break;
      }
    };

    ws.onerror = (error) => {};

    ws.onclose = () => {};

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        // const unsubscribeMsg = {
        //   header: {
        //     approval_key: token,
        //     custtype: 'P',
        //     tr_type: '2',
        //     'content-type': 'utf-8',
        //   },
        //   body: {
        //     input: {
        //       tr_id: 'HDFSASP0',
        //       tr_key: 'RNASAAPL',
        //     },
        //   },
        // };

        const unsubscribeMsg2 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0UPCNT0',
              tr_key: '0001',
            },
          },
        };

        const unsubscribeMsg3 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0UPCNT0',
              tr_key: '1001',
            },
          },
        };

        const unsubscribeMsg4 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0STCNT0',
              tr_key: '005930',
            },
          },
        };

        const unsubscribeMsg5 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0STCNT0',
              tr_key: '005935',
            },
          },
        };

        const unsubscribeMsg6 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0STCNT0',
              tr_key: '063300',
            },
          },
        };

        const unsubscribeMsg7 = {
          header: {
            approval_key: token,
            custtype: 'P',
            tr_type: '1',
            'content-type': 'utf-8',
          },
          body: {
            input: {
              tr_id: 'H0STCNT0',
              tr_key: '225570',
            },
          },
        };

        // ws.send(JSON.stringify(unsubscribeMsg));
        ws.send(JSON.stringify(unsubscribeMsg2));
        ws.send(JSON.stringify(unsubscribeMsg3));
        ws.send(JSON.stringify(unsubscribeMsg4));
        ws.send(JSON.stringify(unsubscribeMsg5));
        ws.send(JSON.stringify(unsubscribeMsg6));
        ws.send(JSON.stringify(unsubscribeMsg7));
        ws.close();
      }
    };
  }, []);

  // if (!priceData) return <div>로딩 중...</div>;

  // return (
  //   <Wrapper title="애플 실시간 시세">
  //     <div className="flex flex-col gap-2">
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
    <div className="flex flex-col gap-2">
      <p>2: {priceData2 || '-'}</p>
      <p>3: {priceData3 || '-'}</p>
      <p>4: {priceData4 || '-'}</p>
      <p>5: {priceData5 || '-'}</p>
      <p>6: {priceData6 || '-'}</p>
      <p>7: {priceData7 || '-'}</p>
    </div>
  );
}
