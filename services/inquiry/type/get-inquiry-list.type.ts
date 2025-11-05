import { InquiryModel } from '../model';

export interface GetInquiryListReq {
  page: number;
}

export interface GetInquiryListRes {
  inquiryList: InquiryModel[];
  total: number;
  nextPage: number | null;
}
