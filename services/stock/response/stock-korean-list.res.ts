import { IStockCompanyModel } from '../model';

export interface IStockKoreanListRes {
  stockKoreanList: IStockCompanyModel[];
  total: number;
  nextPage: number | null;
}
