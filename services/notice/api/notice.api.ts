import AXIOS from '@/lib/axios';

import { INoticeListDto } from '../dto';
import { INoticeDetailRes, INoticeListRes } from '../response';

class NoticeApi extends AXIOS {
  private readonly _baseURL = '/notice';

  async getNoticeDetail(noticeId: number) {
    return await this.get<INoticeDetailRes, null>({ url: `${this._baseURL}/${noticeId}` });
  }

  async getNoticeList(dto: INoticeListDto) {
    return await this.get<INoticeListRes, INoticeListDto>({ url: `${this._baseURL}`, params: dto });
  }
}

const noticeApi = new NoticeApi();

export default noticeApi;
