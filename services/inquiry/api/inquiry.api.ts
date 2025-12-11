import createAxiosInstance from '@/lib/axios/axios.config';

import {
  CreateInquiryReq,
  DeleteInquiryReq,
  GetInquiryDetailReq,
  GetInquiryDetailRes,
  GetInquiryListReq,
  GetInquiryListRes,
  UpdateInquiryReq,
} from '../type';

const axios = createAxiosInstance();
const baseURL = '/inquiry';

const inquiryApi = {
  getInquiryDetail: async (dto: GetInquiryDetailReq) => {
    const { inquiryId } = dto;

    return await axios.get<GetInquiryDetailRes, null>({ url: `${baseURL}/${inquiryId}` });
  },

  getInquiryList: async (dto: GetInquiryListReq) => {
    return await axios.get<GetInquiryListRes, GetInquiryListReq>({ url: baseURL, params: dto });
  },

  createInquiry: async (dto: CreateInquiryReq) => {
    return await axios.post<null, CreateInquiryReq>({ url: baseURL, data: dto });
  },

  modifyInquiry: async (dto: UpdateInquiryReq) => {
    const { inquiryId, ...rest } = dto;

    return await axios.put<null, Omit<UpdateInquiryReq, 'inquiryId'>>({
      url: `${baseURL}/${inquiryId}`,
      data: rest,
    });
  },

  deleteInquiry: async (dto: DeleteInquiryReq) => {
    const { inquiryId } = dto;

    return await axios.delete<null, null>({ url: `${baseURL}/${inquiryId}` });
  },
};

export default inquiryApi;
