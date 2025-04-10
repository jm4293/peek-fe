import { AxiosConfig } from '@/common/axios';

import { IStockListDto } from '@/types/dto';
import { IStockListRes } from '@/types/res';

class StockApi extends AxiosConfig {
  private readonly _baseURL = '/stock';

  async getStockList(dto: IStockListDto) {
    return await this.get<IStockListRes, IStockListDto>({ url: `${this._baseURL}`, params: dto });
  }

  async getStockDetail(code: string) {
    return await this.get({ url: `${this._baseURL}/${code}` });
  }
}

export default new StockApi();
