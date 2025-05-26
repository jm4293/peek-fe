import { IUser } from '@/types/model';

export interface IUserAccount {
  id: number;
  email: string;
  createdAt: Date;
  user: IUser;
}
