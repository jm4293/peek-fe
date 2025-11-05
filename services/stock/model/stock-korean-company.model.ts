import { UserStockFavoriteModel } from '@/services/user';

import { StockCategoryModel } from './stock-category.model';

export interface StockKoreanCompanyModel {
  id: number;
  uuid: string;
  code: string;
  companyName: string;
  industry: string;
  products: string;
  ceo: string;
  homePage: string;
  listingAt: Date;
  createdAt: Date;
  updatedAt: Date | null;

  stockCategory: StockCategoryModel;
  userStockFavorites: UserStockFavoriteModel[];
}
