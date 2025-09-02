import { ICurrencyModel } from '../model';

export interface ICurrencyListRes {
  currencyList: ICurrencyModel[];
  total: number;
}
