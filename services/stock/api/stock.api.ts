import AXIOS from '@/lib/axios';

import { ICodeKoreanListRes, IGetCodeKoreanListDto, IStockTokenRes } from '@/services/stock';

class StockApi extends AXIOS {
  private readonly _baseURL = '/stock';

  async getToken() {
    return await this.get<IStockTokenRes, null>({ url: `${this._baseURL}/token` });
  }

  async getCodeKoreanList(dto: IGetCodeKoreanListDto) {
    return await this.get<ICodeKoreanListRes, IGetCodeKoreanListDto>({
      url: `${this._baseURL}/code/korean`,
      params: dto,
    });
  }

  async getStockDetail(code: string) {
    return await this.get({ url: `${this._baseURL}/${code}` });
  }
}

const stockApi = new StockApi();

export default stockApi;
