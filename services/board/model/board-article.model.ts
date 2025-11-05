import { BoardModel } from './board.model';

export interface BoardArticleModel {
  id: number;
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;

  board: BoardModel;
}
