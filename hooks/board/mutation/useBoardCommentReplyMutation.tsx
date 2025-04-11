import { useMutation, useQueryClient } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { ICreateBoardCommentReplyDto, IDeleteBoardCommentReplyDto } from '@/types/dto';

export const useBoardCommentReplyMutation = () => {
  const queryClient = useQueryClient();

  const createBoardCommentReplyMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentReplyDto & { boardSeq: number }) => BoardApi.createBoardCommentReply(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.refetchQueries({ queryKey: ['board-comment-list', boardSeq] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteBoardCommentReplyMutation = useMutation({
    mutationFn: (dto: IDeleteBoardCommentReplyDto & { boardSeq: number }) => BoardApi.deleteBoardCommentReply(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.refetchQueries({ queryKey: ['board-comment-list', boardSeq] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    createBoardCommentReplyMutation,
    deleteBoardCommentReplyMutation,
  };
};
