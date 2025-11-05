export interface GetStockKoreanIndexCandleListReq {
  code: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface GetStockKoreanIndexCandleListRes {
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
