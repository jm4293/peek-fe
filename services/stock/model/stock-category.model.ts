import { BoardModel } from '@/services/board';

import { StockKoreanCompanyModel } from './stock-korean-company.model';

export interface StockCategoryModel {
  id: number;
  uuid: string;
  name: string;
  enName: string;
  createdAt: Date;
  updatedAt: Date | null;

  boardList: BoardModel[];
  stockKoreanCompanyList: StockKoreanCompanyModel[];
}
