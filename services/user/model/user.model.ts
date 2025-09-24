export interface IUserModel {
  id: number;
  nickname: string;
  name: string;
  birth: Date | null;
  thumbnail: string | null;
  createdAt: Date;
}
