import { StockKoreanCompanyModel } from '@/services/stock';

import { UserAccountModel } from './user-account.model';

export interface UserStockFavoriteModel {
  userAccountId: number;
  stockKoreanCompanyId: number;
  uuid: string;
  createdAt: Date;

  userAccount: UserAccountModel;
  stockKoreanCompany: StockKoreanCompanyModel;
}
