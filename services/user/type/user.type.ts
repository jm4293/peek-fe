import { z } from 'zod';

const baseUserSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1자 이상이어야 합니다.').max(100, '닉네임은 최대 100자 이하여야 합니다.'),
  // name: z.string().min(1, '이름은 최소 1자 이상이어야 합니다.').max(100, '이름은 최대 100자 이하여야 합니다.'),
  // birthday: z.string().optional(),
  // thumbnail: z.string().optional(),
});

export const updateUserInfoReqSchema = baseUserSchema;

export type UpdateUserInfoReq = z.infer<typeof updateUserInfoReqSchema>;

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
