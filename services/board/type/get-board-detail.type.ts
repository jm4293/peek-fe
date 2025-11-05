import { BoardModel } from '../model';

export interface GetBoardDetailReq {}

export interface GetBoardDetailRes {
  board: BoardModel;
}
