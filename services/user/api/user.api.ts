import createAxiosInstance from '@/lib/axios/axios.config';

import {
  CreateUserPushTokenReq,
  DeleteUserNotificationReq,
  GetUserInfoRes,
  ResetUserPasswordReq,
  UpdateUserInfoReq,
  UpdateUserNotificationReadReq,
  UpdateUserPasswordReq,
  UpdateUserThumbnailReq,
} from '../type';

const axios = createAxiosInstance();
const baseURL = '/user';

const userApi = {
  getMyInfo: async () => {
    return await axios.get<GetUserInfoRes, null>({ url: baseURL });
  },

  updateUser: async (dto: UpdateUserInfoReq) => {
    return await axios.put<null, UpdateUserInfoReq>({ url: baseURL, data: dto });
  },

  updateThumbnail: async (dto: UpdateUserThumbnailReq) => {
    return await axios.patch<null, UpdateUserThumbnailReq>({ url: `${baseURL}/thumbnail`, data: dto });
  },

  // checkEmail: async (dto: ICheckEmailDto) => {
  //   return await axios.post<ICheckEmailRes, ICheckEmailDto>({
  //     url: `${baseURL}/check-email`,
  //     data: dto,
  //   });
  // },

  // checkEmailCode: async (dto: ICheckEmailCodeDto) => {
  //   return await axios.post<ICheckEmailCodeRes, ICheckEmailCodeDto>({
  //     url: `${baseURL}/check-email-code`,
  //     data: dto,
  //   });
  // },

  updatePassword: async (dto: UpdateUserPasswordReq) => {
    return await axios.patch<null, UpdateUserPasswordReq>({ url: `${baseURL}/password`, data: dto });
  },

  resetPassword: async (dto: ResetUserPasswordReq) => {
    return await axios.patch<null, ResetUserPasswordReq>({ url: `${baseURL}/password/reset`, data: dto });
  },

  withdraw: async () => {
    return await axios.delete<null, null>({ url: baseURL });
  },

  // getNotificationList: async (page: number) => {
  // return await axios.get<INotificationListRes, { page: number }>({
  //   url: `${baseURL}/notifications`,
  //   params: { page },
  // });
  // },

  // postRegisterPushToken: async (dto: CreateUserPushTokenReq) => {
  //   return await axios.post<null, CreateUserPushTokenReq>({ url: `${baseURL}/push-token`, data: dto });
  // },

  // postNotificationRead: async (dto: UpdateUserNotificationReadReq) => {
  //   return await axios.post<null, UpdateUserNotificationReadReq>({ url: `${baseURL}/notification/read`, data: dto });
  // },

  // postNotificationReadAll: async () => {
  //   return await axios.post<null, {}>({ url: `${baseURL}/notification/read-all`, data: {} });
  // },

  // deleteNotification: async (dto: DeleteUserNotificationReq) => {
  //   const { notificationSeq } = dto;

  //   return await axios.delete<null, null>({ url: `${baseURL}/notification/${notificationSeq}` });
  // },
};

export default userApi;
