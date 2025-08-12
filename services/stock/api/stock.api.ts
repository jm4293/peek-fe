import AXIOS from '@/lib/axios';

import { IStockListDto, IStockListRes } from '@/services/stock';

class StockApi extends AXIOS {
  private readonly _baseURL = '/stock';

  async getStockList(dto: IStockListDto) {
    return await this.get<IStockListRes, IStockListDto>({ url: `${this._baseURL}`, params: dto });
  }

  async getStockDetail(code: string) {
    return await this.get({ url: `${this._baseURL}/${code}` });
  }
}

const stockApi = new StockApi();

export default stockApi;
