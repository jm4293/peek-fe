export interface KoreanStockTop10 {
  shcode: string; // 종목코드
  hname: string; // 종목명
  price: number; // 현재가
  sign: string; // 전일대비구분
  change: number; // 전일대비
  diff: number; // 등락율
  volume: number; // 거래량
  vol_rate: number; // 거래비중
  total: number; // 시가총액
  rate: number; // 비중
  for_rate: number; // 외인비중

  createdAt: Date;
}
