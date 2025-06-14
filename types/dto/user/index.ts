interface IBaseUserDto {
    nickname: string;
    name: string;
    birthday: string | undefined;
    thumbnail: string | undefined;
}

export interface IUpdateUserDto extends IBaseUserDto {}

export interface IUpdateUserThumbnailDto {
    thumbnail: string;
}

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
