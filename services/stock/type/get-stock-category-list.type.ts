import { StockCategoryModel } from '../model';

export interface GetStockCategoryListReq {}

export interface GetStockCategoryListRes {
  stockCategoryList: StockCategoryModel[];
}
