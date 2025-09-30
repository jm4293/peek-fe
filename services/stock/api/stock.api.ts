import AXIOS from '@/lib/axios';

import {
  IGetStockKoreanDto,
  IGetStockKoreanFavoriteDto,
  IGetStockKoreanIndexCandleListDto,
  IGetStockKoreanListDto,
  IGetStockKoreanRankDto,
  IStockKoreanFavoriteRes,
  IStockKoreanIndexCandleListRes,
  IStockKoreanListRes,
  IStockKoreanRankListRes,
  IStockKoreanRes,
  IToggleStockKoreanFavoriteDto,
} from '@/services/stock';

class StockApi extends AXIOS {
  private readonly _baseURL = '/stock';

  // async getToken() {
  //   return await this.get<IStockTokenRes, null>({ url: `${this._baseURL}/token` });
  // }

  async getStockKoreanList(dto: IGetStockKoreanListDto) {
    return await this.get<IStockKoreanListRes, IGetStockKoreanListDto>({
      url: `${this._baseURL}/korean`,
      params: dto,
    });
  }

  async getStockKorean(dto: IGetStockKoreanDto) {
    const { code } = dto;

    return await this.get<IStockKoreanRes, IGetStockKoreanDto>({
      url: `${this._baseURL}/korean/detail/${code}`,
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

  async getStockKoreanFavoriteList(dto: IGetStockKoreanFavoriteDto) {
    return await this.get<IStockKoreanFavoriteRes, IGetStockKoreanFavoriteDto>({
      url: `${this._baseURL}/korean/favorite`,
      params: dto,
    });
  }

  async toggleStockKoreanFavorite(dto: IToggleStockKoreanFavoriteDto) {
    return await this.post<unknown, IToggleStockKoreanFavoriteDto>({
      url: `${this._baseURL}/korean/favorite`,
      data: dto,
    });
  }
}

const stockApi = new StockApi();

export default stockApi;
