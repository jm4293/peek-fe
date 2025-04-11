import { AxiosConfig } from '@/common/axios';

import { IReadNotificationDto, IRegisterPushTokenDto, IUpdateUserDto, IUpdateUserPasswordDto } from '@/types/dto';
import { IMyInfoRes, INotificationListRes } from '@/types/res';

class UserApi extends AxiosConfig {
  private readonly _baseURL = '/user';

  async getMyInfo() {
    return await this.get<IMyInfoRes, null>({ url: `${this._baseURL}` });
  }

  // 유저 정보 수정
  async updateUser(dto: IUpdateUserDto) {
    return await this.put<null, IUpdateUserDto>({ url: `${this._baseURL}`, data: dto });
  }

  async updatePassword(dto: IUpdateUserPasswordDto) {
    return await this.patch<null, IUpdateUserPasswordDto>({ url: `${this._baseURL}/password`, data: dto });
  }

  async postRegisterPushToken(dto: IRegisterPushTokenDto) {
    return await this.post<null, IRegisterPushTokenDto>({ url: `${this._baseURL}/push-token`, data: dto });
  }

  // 알림
  async getNotificationList(pageParam: number) {
    return await this.get<INotificationListRes, { pageParam: number }>({
      url: `${this._baseURL}/notifications`,
      params: { pageParam },
    });
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

export default new UserApi();
