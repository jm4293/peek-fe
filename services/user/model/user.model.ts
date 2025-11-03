export interface IUserModel {
  id: number;
  uuid: string;
  nickname: string;
  name: string;
  birth: Date | null;
  thumbnail: string | null;
  createdAt: Date;
}
