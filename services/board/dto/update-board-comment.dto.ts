import { IBaseBoardCommentDto } from '@/services/board';

export interface IUpdateBoardCommentDto extends IBaseBoardCommentDto {
  boardCommentSeq: number;
}
