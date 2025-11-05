import { CurrencyHistoryModel } from '../model';

export interface GetCurrencyListReq {}

export interface GetCurrencyListRes {
  currencyList: CurrencyHistoryModel[];
  total: number;
}
