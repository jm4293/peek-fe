import AXIOS from '@/lib/axios';

import { ICreateInquiryDto, IInquiryListDto, IUpdateInquiryDto } from '../dto';
import { IInquiryDetailRes, IInquiryListRes } from '../response';

class InquiryApi extends AXIOS {
  private readonly _baseURL = '/inquiry';

  async getInquiryDetail(inquiryId: number) {
    return await this.get<IInquiryDetailRes, null>({ url: `${this._baseURL}/${inquiryId}` });
  }

  async getInquiryList(dto: IInquiryListDto) {
    return await this.get<IInquiryListRes, IInquiryListDto>({ url: `${this._baseURL}`, params: dto });
  }

  async createInquiry(dto: ICreateInquiryDto) {
    return await this.post<null, ICreateInquiryDto>({ url: `${this._baseURL}`, data: dto });
  }

  async modifyInquiry(dto: IUpdateInquiryDto) {
    const { inquiryId, ...rest } = dto;

    return await this.put<null, Omit<IUpdateInquiryDto, 'inquiryId'>>({
      url: `${this._baseURL}/${inquiryId}`,
      data: rest,
    });
  }

  async deleteInquiry(inquiryId: number) {
    return await this.delete<null, null>({ url: `${this._baseURL}/${inquiryId}` });
  }
}

const inquiryApi = new InquiryApi();

export default inquiryApi;
