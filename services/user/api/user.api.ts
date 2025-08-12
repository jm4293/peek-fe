import AXIOS from '@/lib/axios';

import {
  IMyInfoRes,
  IReadNotificationDto,
  IRegisterPushTokenDto,
  IUpdateUserDto,
  IUpdateUserPasswordDto,
  IUpdateUserThumbnailDto,
} from '@/services/user';

class UserApi extends AXIOS {
  private readonly _baseURL = '/user';

  async getMyInfo() {
    return await this.get<IMyInfoRes, null>({ url: `${this._baseURL}` });
  }

  // 유저 정보 수정
  async updateUser(dto: IUpdateUserDto) {
    return await this.put<null, IUpdateUserDto>({ url: `${this._baseURL}`, data: dto });
  }

  async updateThumbnail(dto: IUpdateUserThumbnailDto) {
    return await this.patch<null, IUpdateUserThumbnailDto>({ url: `${this._baseURL}/thumbnail`, data: dto });
  }

  async updatePassword(dto: IUpdateUserPasswordDto) {
    return await this.patch<null, IUpdateUserPasswordDto>({ url: `${this._baseURL}/password`, data: dto });
  }

  async postRegisterPushToken(dto: IRegisterPushTokenDto) {
    return await this.post<null, IRegisterPushTokenDto>({ url: `${this._baseURL}/push-token`, data: dto });
  }

  // 알림
  async getNotificationList(page: number) {
    // return await this.get<INotificationListRes, { page: number }>({
    //   url: `${this._baseURL}/notifications`,
    //   params: { page },
    // });
  }

  async postNotificationRead(dto: IReadNotificationDto) {
    return await this.post<null, IReadNotificationDto>({ url: `${this._baseURL}/notification/read`, data: dto });
  }

  async postNotificationReadAll() {
    return await this.post<null, {}>({ url: `${this._baseURL}/notification/read-all`, data: {} });
  }

  async deleteNotification(notificationSeq: number) {
    return await this.delete<null, null>({ url: `${this._baseURL}/notification/${notificationSeq}` });
  }
}

const userApi = new UserApi();

export default userApi;
