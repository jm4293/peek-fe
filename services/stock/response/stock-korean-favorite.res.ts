import { IUserStockFavoriteModel } from '@/services/user';

export interface IStockKoreanFavoriteRes {
  favoriteStockList: IUserStockFavoriteModel[];
  total: number;
  nextPage: number | null;
}
