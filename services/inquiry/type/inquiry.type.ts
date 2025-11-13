import { z } from 'zod';

const baseInquirySchema = z.object({
  title: z.string().min(1, '제목은 최소 1자 이상이어야 합니다.').max(100, '제목은 최대 100자 이하여야 합니다.'),
  content: z.string().min(10, '내용은 최소 10자 이상이어야 합니다.'),
  images: z.array(z.string()).optional(),
});

export const createInquiryReqSchema = baseInquirySchema.extend({});
export type CreateInquiryReq = z.infer<typeof createInquiryReqSchema>;

export const updateInquiryReqSchema = baseInquirySchema.extend({
  inquiryId: z.number(),
});
export type UpdateInquiryReq = z.infer<typeof updateInquiryReqSchema>;

export interface UpdateInquiryRes {}

export const deleteInquiryReqSchema = z.object({
  inquiryId: z.number(),
});
export type DeleteInquiryReq = z.infer<typeof deleteInquiryReqSchema>;

export interface DeleteInquiryRes {}
