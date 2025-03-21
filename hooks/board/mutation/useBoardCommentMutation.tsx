import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICreateBoardCommentDto, IUpdateBoardCommentDto } from '@/types/dto';
import BoardApi from '@/api/board/board.api';

export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const createBoardCommentMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentDto) => BoardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateBoardCommentMutation = useMutation({
    mutationFn: (dto: IUpdateBoardCommentDto) => BoardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: [] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteBoardCommentMutation = useMutation({
    mutationFn: (params: { boardSeq: number; boardCommentSeq: number }) => BoardApi.deleteBoardComment(params),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['board-comment-list'] });
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
