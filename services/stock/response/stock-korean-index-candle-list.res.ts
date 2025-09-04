export interface IStockKoreanIndexCandleListRes {
  code: string;
  candleList: {
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
  }[];
  count: number;
}
