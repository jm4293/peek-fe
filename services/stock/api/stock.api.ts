import createAxiosInstance from '@/lib/axios/axios.config';

import {
  GetStockCategoryListRes,
  GetStockKoreanDetailReq,
  GetStockKoreanDetailRes,
  GetStockKoreanFavoriteListReq,
  GetStockKoreanFavoriteListRes,
  GetStockKoreanIndexCandleListReq,
  GetStockKoreanIndexCandleListRes,
  GetStockKoreanListReq,
  GetStockKoreanListRes,
  GetStockKoreanRankListReq,
  GetStockKoreanRankListRes,
  UpdateStockKoreanFavoriteReq,
} from '../type';

const axios = createAxiosInstance();
const baseURL = '/stock';

const stockApi = {
  // getToken: async () => {
  //   return await axios.get<IStockTokenRes, null>({ url: `${baseURL}/token` });
  // },

  getStockCategoryList: async () => {
    return await axios.get<GetStockCategoryListRes, null>({ url: `${baseURL}/category` });
  },

  getStockKoreanList: async (dto: GetStockKoreanListReq) => {
    return await axios.get<GetStockKoreanListRes, GetStockKoreanListReq>({
      url: `${baseURL}/korean`,
      params: dto,
    });
  },

  getStockKorean: async (dto: GetStockKoreanDetailReq) => {
    const { code } = dto;

    return await axios.get<GetStockKoreanDetailRes, GetStockKoreanDetailReq>({
      url: `${baseURL}/korean/detail/${code}`,
    });
  },

  getStockKoreanRank: async (dto: GetStockKoreanRankListReq) => {
    return await axios.get<GetStockKoreanRankListRes, GetStockKoreanRankListReq>({
      url: `${baseURL}/korean/rank`,
      params: dto,
    });
  },

  getStockKoreanIndexCandleList: async (dto: GetStockKoreanIndexCandleListReq) => {
    const { code, ...rest } = dto;

    return await axios.get<GetStockKoreanIndexCandleListRes, Omit<GetStockKoreanIndexCandleListReq, 'code'>>({
      url: `${baseURL}/korean/index/candle/${code}`,
      params: rest,
    });
  },

  getStockKoreanFavoriteList: async (dto: GetStockKoreanFavoriteListReq) => {
    return await axios.get<GetStockKoreanFavoriteListRes, GetStockKoreanFavoriteListReq>({
      url: `${baseURL}/korean/favorite`,
      params: dto,
    });
  },

  toggleStockKoreanFavorite: async (dto: UpdateStockKoreanFavoriteReq) => {
    return await axios.post<null, UpdateStockKoreanFavoriteReq>({
      url: `${baseURL}/korean/favorite`,
      data: dto,
    });
  },
};

export default stockApi;
