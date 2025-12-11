import createAxiosInstance from '@/lib/axios/axios.config';

import { GetNoticeDetailReq, GetNoticeDetailRes } from '../type/get-notice-detail.type';
import { GetNoticeListReq, GetNoticeListRes } from '../type/get-notice-list.type';

const axios = createAxiosInstance();
const baseURL = '/notice';

const noticeApi = {
  getNoticeDetail: async (dto: GetNoticeDetailReq) => {
    const { noticeId } = dto;

    return await axios.get<GetNoticeDetailRes, null>({ url: `${baseURL}/${noticeId}` });
  },

  getNoticeList: async (dto: GetNoticeListReq) => {
    return await axios.get<GetNoticeListRes, GetNoticeListReq>({ url: baseURL, params: dto });
  },
};

export default noticeApi;
