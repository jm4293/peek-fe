import { IStockCompanyModel } from '@/services/stock';

import { IUserAccountModel } from './user-account.model';

export interface IUserStockFavoriteModel {
  userAccountId: number;
  createdAt: Date;
  userAccount: IUserAccountModel;
  stockCompany: IStockCompanyModel;
}
