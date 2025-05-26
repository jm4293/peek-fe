export interface IUser {
  id: number;
  name: string;
  nickname: string;
  thumbnail: string | null;
  birth: Date | null;
  createdAt: Date;
}
