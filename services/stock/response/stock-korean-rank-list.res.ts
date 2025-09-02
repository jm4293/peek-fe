import { IStockKoreanRankModel } from '../model';

export interface IStockKoreanRankListRes {
  stockKoreanRankList: IStockKoreanRankModel[];
  total: number;
  nextPage: number | null;
}
