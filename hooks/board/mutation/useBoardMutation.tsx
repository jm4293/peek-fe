import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import BoardApi from '@/api/board/board.api';

import { ICreateBoardDto, IUpdateBoardDto } from '@/types/dto';

export const useBoardMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createBoardMutation = useMutation({
    mutationFn: (dto: ICreateBoardDto) => BoardApi.createBoard(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['board-list'] });

      router.push('/board');
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: (dto: IUpdateBoardDto) => BoardApi.updateBoard(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      alert('게시글이 수정되었습니다.');

      await queryClient.invalidateQueries({ queryKey: ['board-detail', boardId] });
      await queryClient.refetchQueries({ queryKey: ['board-list'] });

      router.push(`/board/${boardId}`);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (boardId: string) => BoardApi.deleteBoard(Number(boardId)),
    onSuccess: async () => {
      router.push('/board');

      await queryClient.refetchQueries({ queryKey: ['board-list'] });
    },
  });

  const boardLikeMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.boardLike(boardSeq),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['board-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
    boardLikeMutation,
  };
};
