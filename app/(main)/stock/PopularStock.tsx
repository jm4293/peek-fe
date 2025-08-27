'use client';

import { useStockProvider } from './StockCodeProvider';

export default function PopularStock() {
  const { stock } = useStockProvider();

  return <div>Popular Stock: {stock?.companyName || '선택된 종목이 없습니다.'}</div>;
}
