import { useMutation, useQueryClient } from '@tanstack/react-query';

import BoardApi from '@/api/board/board.api';

import { ICreateBoardCommentDto, IDeleteBoardCommentDto, IUpdateBoardCommentDto } from '@/types/dto';

export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const createBoardCommentMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentDto) => BoardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list', boardSeq] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateBoardCommentMutation = useMutation({
    mutationFn: (dto: IUpdateBoardCommentDto) => BoardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list', boardSeq] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteBoardCommentMutation = useMutation({
    mutationFn: (params: IDeleteBoardCommentDto) => BoardApi.deleteBoardComment(params),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list', boardSeq] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    createBoardCommentMutation,
    updateBoardCommentMutation,
    deleteBoardCommentMutation,
  };
};
