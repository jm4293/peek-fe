import { IStockCompanyModel } from '../model';

export interface IStockCodeKoreanListRes {
  stockCodeList: IStockCompanyModel[];
  total: number;
  nextPage: number | null;
}
