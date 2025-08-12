import { IBaseBoardDto } from '@/services/board';

export interface ICreateBoardDto extends IBaseBoardDto {
  categoryId: number;
}
