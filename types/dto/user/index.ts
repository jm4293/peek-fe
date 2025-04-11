interface IBaseUserDto {
  nickname: string;
  name: string;
  birthday: string | undefined;
  thumbnailUrl: string | undefined;
}

export interface IUpdateUserDto extends IBaseUserDto {}

export interface IUpdateUserPasswordDto {
  password: string;
  newPassword: string;
}

export interface IRegisterPushTokenDto {
  pushToken: string;
}

export interface IReadNotificationDto {
  userNotificationSeq: number;
}
