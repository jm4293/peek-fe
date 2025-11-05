import { InquiryModel } from '../model';

export interface GetInquiryDetailReq {
  inquiryId: number;
}

export interface GetInquiryDetailRes {
  inquiry: InquiryModel;
}
