import { StockKoreanCompanyModel } from '../model';

export interface GetStockKoreanDetailReq {
  code: string;
}

export interface GetStockKoreanDetailRes {
  stockKoreanCompany: StockKoreanCompanyModel;
}
