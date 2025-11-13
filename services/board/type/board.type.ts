import { z } from 'zod';

const baseBoardSchema = z.object({
  title: z.string().min(1, '제목은 최소 1자 이상이어야 합니다.').max(100, '제목은 최대 100자 이하여야 합니다.'),
  content: z.string().min(1, '내용은 최소 1자 이상이어야 합니다.'),
});

export const createBoardReqSchema = baseBoardSchema.extend({
  categoryId: z.number({ message: '카테고리를 선택해주세요.' }).min(1, '카테고리는 필수입니다.'),
});
export type CreateBoardReq = z.infer<typeof createBoardReqSchema>;

export interface CreateBoardRes {}

export const updateBoardReqSchema = baseBoardSchema.extend({
  boardId: z.number(),
});
export type UpdateBoardReq = z.infer<typeof updateBoardReqSchema>;

export interface UpdateBoardRes {}

export const deleteBoardReqSchema = z.object({
  boardId: z.number(),
});
export type DeleteBoardReq = z.infer<typeof deleteBoardReqSchema>;

export interface DeleteBoardRes {}
