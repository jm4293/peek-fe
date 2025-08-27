import AXIOS from '@/lib/axios';

import {
  IGetStockKoreanDto,
  IGetStockKoreanListDto,
  IStockKoreanListRes,
  IStockKoreanRes,
  IStockTokenRes,
} from '@/services/stock';

class StockApi extends AXIOS {
  private readonly _baseURL = '/stock';

  async getToken() {
    return await this.get<IStockTokenRes, null>({ url: `${this._baseURL}/token` });
  }

  async getStockKorean(dto: IGetStockKoreanDto) {
    const { code } = dto;

    return await this.get<IStockKoreanRes, IGetStockKoreanDto>({
      url: `${this._baseURL}/korean/${code}`,
    });
  }

  async getStockKoreanList(dto: IGetStockKoreanListDto) {
    return await this.get<IStockKoreanListRes, IGetStockKoreanListDto>({
      url: `${this._baseURL}/korean`,
      params: dto,
    });
  }

  async getStockDetail(code: string) {
    return await this.get({ url: `${this._baseURL}/${code}` });
  }
}

const stockApi = new StockApi();

export default stockApi;
