export interface IUserRes {
  nickname: string;
  name: string;
  birth: Date | null;
  thumbnail: string | null;
  createdAt: Date;
}

export interface IUserAccountRes {
  email: string;
  createdAt: Date;
  user: IUserRes;
}

export interface IMyInfoRes extends IUserAccountRes {}
