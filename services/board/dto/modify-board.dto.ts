import { IBaseBoardDto } from '@/services/board';

export interface IUpdateBoardDto extends IBaseBoardDto {
  boardId: number;
}
