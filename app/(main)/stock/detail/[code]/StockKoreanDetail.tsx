'use client';

import { useEffect, useState } from 'react';

import { useStockKorean } from '@/hooks/socket';

interface Props {
  code: string;
}

export default function StockKoreanDetail(props: Props) {
  const { code } = props;

  const { subscribeStock, unsubscribeStock, onStockUpdate, offStockUpdate } = useStockKorean();
  const [stockData, setStockData] = useState<{
    symbol: string;
    name: string;
    price: number;
    change: number;
    changeRate: number;
    volume: number;
    timestamp: Date;
  } | null>(null);
  const [symbol] = useState(code);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (isSubscribed) {
      const handleStockUpdate = (data: {
        symbol: string;
        name: string;
        price: number;
        change: number;
        changeRate: number;
        volume: number;
        timestamp: Date;
      }) => {
        setStockData(data);
      };

      onStockUpdate(symbol, handleStockUpdate);

      return () => {
        offStockUpdate(symbol, handleStockUpdate);
      };
    }
  }, [symbol, isSubscribed, onStockUpdate, offStockUpdate]);

  // 구독 버튼 클릭
  const handleSubscribe = () => {
    if (!isSubscribed) {
      subscribeStock(symbol);
      setIsSubscribed(true);
    }
  };

  // 구독 해제 버튼 클릭
  const handleUnsubscribe = () => {
    if (isSubscribed) {
      unsubscribeStock(symbol);
      setIsSubscribed(false);
      setStockData(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {!isSubscribed ? (
          <button onClick={handleSubscribe} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            구독
          </button>
        ) : (
          <button onClick={handleUnsubscribe} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            구독 해제
          </button>
        )}
      </div>

      {stockData && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">실시간 주식 정보</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">종목명:</span> {stockData.name}
            </div>
            <div>
              <span className="font-medium">종목코드:</span> {stockData.symbol}
            </div>
            <div>
              <span className="font-medium">현재가:</span> {stockData.price?.toLocaleString()}원
            </div>
            <div>
              <span className="font-medium">전일대비:</span>
              <span className={stockData.change >= 0 ? 'text-red-500' : 'text-blue-500'}>
                {stockData.change >= 0 ? '+' : ''}
                {stockData.change?.toLocaleString()}원
              </span>
            </div>
            <div>
              <span className="font-medium">등락률:</span>
              <span className={stockData.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}>
                {stockData.changeRate >= 0 ? '+' : ''}
                {stockData.changeRate?.toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="font-medium">거래량:</span> {stockData.volume?.toLocaleString()}
            </div>
            <div className="col-span-2">
              <span className="font-medium">업데이트 시간:</span> {new Date(stockData.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {isSubscribed && !stockData && <div className="text-gray-500 text-sm">실시간 데이터를 기다리는 중...</div>}
    </div>
  );
}
