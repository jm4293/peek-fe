import { IBoardModel } from '@/services/board';

export interface IBoardListRes {
  boardList: IBoardModel[];
  total: number;
  nextPage: number | null;
}
