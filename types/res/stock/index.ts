import { IStock } from '@/types/model';

export interface IStockListRes {
  stocks: IStock[];
  total: number;
}
