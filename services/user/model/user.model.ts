export interface IUserModel {
  nickname: string;
  name: string;
  birth: Date | null;
  thumbnail: string | null;
  createdAt: Date;
}
