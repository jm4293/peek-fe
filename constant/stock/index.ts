export type IMARKET_TYPE = 'ALL' | 'KOSPI' | 'KOSDAQ' | 'STOCK_US';

export const MARKET_TYPE: {
  [key in IMARKET_TYPE]: string;
} = { ALL: '전체', KOSPI: 'KOSPI', KOSDAQ: 'KOSDAQ', STOCK_US: '미국주식' };
