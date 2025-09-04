import AXIOS from '@/lib/axios';

import {
  IGetStockKoreanDto,
  IGetStockKoreanIndexCandleListDto,
  IGetStockKoreanListDto,
  IGetStockKoreanRankDto,
  IStockKoreanIndexCandleListRes,
  IStockKoreanListRes,
  IStockKoreanRankListRes,
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
      url: `${this._baseURL}/korean/detail/${code}`,
    });
  }

  async getStockKoreanList(dto: IGetStockKoreanListDto) {
    return await this.get<IStockKoreanListRes, IGetStockKoreanListDto>({
      url: `${this._baseURL}/korean`,
      params: dto,
    });
  }

  async getStockKoreanRank(dto: IGetStockKoreanRankDto) {
    return await this.get<IStockKoreanRankListRes, IGetStockKoreanRankDto>({
      url: `${this._baseURL}/korean/rank`,
      params: dto,
    });
  }

  async getStockKoreanIndexCandleList(dto: IGetStockKoreanIndexCandleListDto) {
    const { code, ...rest } = dto;

    return await this.get<IStockKoreanIndexCandleListRes, Omit<IGetStockKoreanIndexCandleListDto, 'code'>>({
      url: `${this._baseURL}/korean/index/candle/${code}`,
      params: rest,
    });
  }
}

const stockApi = new StockApi();

export default stockApi;
