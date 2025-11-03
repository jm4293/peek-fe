import { ICurrencyHistoryModel } from '../model';

export interface ICurrencyListRes {
  currencyList: ICurrencyHistoryModel[];
  total: number;
}
