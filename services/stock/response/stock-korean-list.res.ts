import { IStockKoreanCompanyModel } from '../model';

export interface IStockKoreanListRes {
  stockKoreanList: IStockKoreanCompanyModel[];
  total: number;
  nextPage: number | null;
}
