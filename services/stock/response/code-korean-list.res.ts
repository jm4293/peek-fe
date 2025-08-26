import { IStockCompanyModel } from '../model';

export interface ICodeKoreanListRes {
  codeList: IStockCompanyModel[];
  total: number;
  // nextPage: number | null;
}
