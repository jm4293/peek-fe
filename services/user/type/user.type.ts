interface BaseUser {
  nickname: string;
  name?: string;
  birthday?: string;
  thumbnail?: string;
}

export interface UpdateUserInfoReq extends BaseUser {}

export interface UpdateUserInfoRes {}

export interface UpdateUserThumbnailReq {
  thumbnail: string;
}

export interface UpdateUserThumbnailRes {}

export interface UpdateUserPasswordReq {
  password: string;
  newPassword: string;
}

export interface UpdateUserPasswordRes {}

export interface ResetUserPasswordReq {
  email: string;
  code: string;
  password: string;
}

export interface ResetUserPasswordRes {}

export interface DeleteUserReq {}

export interface DeleteUserRes {}

////////////////////////////////////////////////////////////////

export interface CreateUserPushTokenReq {
  pushToken: string;
}

export interface CreateUserPushTokenRes {}

export interface UpdateUserNotificationReadReq {
  userNotificationId: number;
}

export interface UpdateUserNotificationReadRes {}

export interface UpdateUserNotificationReadAllReq {}

export interface UpdateUserNotificationReadAllRes {}

export interface DeleteUserNotificationReq {
  notificationId: number;
}

export interface DeleteUserNotificationRes {}
