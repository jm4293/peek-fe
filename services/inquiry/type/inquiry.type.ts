export interface BaseInquiry {
  title: string;
  content: string;
  images: string[];
}

export interface CreateInquiryReq extends BaseInquiry {}

export interface CreateInquiryRes {}

export interface UpdateInquiryReq extends BaseInquiry {
  inquiryId: number;
}

export interface UpdateInquiryRes {}

export interface DeleteInquiryReq {
  inquiryId: number;
}

export interface DeleteInquiryRes {}
