import { IStockCategoryModel } from '../model';

export interface ICodeKoreanListRes {
  codeList: IStockCategoryModel[];
  total: number;
  // nextPage: number | null;
}
