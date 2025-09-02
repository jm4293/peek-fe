import AXIOS from '@/lib/axios';

import { ICurrencyListRes } from '../response';

class CurrencyApi extends AXIOS {
  private readonly _baseURL = '/currency';

  async getCurrencyList() {
    return await this.get<ICurrencyListRes, null>({ url: `${this._baseURL}/list` });
  }
}

const currencyApi = new CurrencyApi();

export default currencyApi;
