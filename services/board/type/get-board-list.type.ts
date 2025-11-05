import { BoardModel } from '../model';

export interface GetBoardListReq {
  page: number;
  stockCategory?: number;
}

export interface GetBoardListRes {
  boardList: BoardModel[];
  total: number;
  nextPage: number | null;
}
