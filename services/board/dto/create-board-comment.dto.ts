import { IBaseBoardCommentDto } from '@/services/board';

export interface ICreateBoardCommentDto extends IBaseBoardCommentDto {
  commentId?: number;
}
