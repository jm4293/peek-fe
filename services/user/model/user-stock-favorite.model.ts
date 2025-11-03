import { IStockKoreanCompanyModel } from '@/services/stock';

import { IUserAccountModel } from './user-account.model';

export interface IUserStockFavoriteModel {
  userAccountId: number;
  userAccount: IUserAccountModel;
  createdAt: Date;
  uuid: string;

  stockCompany: IStockKoreanCompanyModel;
}
