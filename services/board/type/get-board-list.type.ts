import { BoardModel } from '../model';

export interface GetBoardListReq {
  page: number;
  stockCategory?: number;
  sort?: 'createdAt' | 'viewCount';
  text?: string;
}

export interface GetBoardListRes {
  boardList: BoardModel[];
  total: number;
  nextPage: number | null;
}
