import { IBoardModel } from '@/services/board';

export interface IBoardListRes {
  boards: IBoardModel[];
  total: number;
  nextPage: number | null;
}
