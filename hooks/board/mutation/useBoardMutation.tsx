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
      await queryClient.invalidateQueries({ queryKey: ['board-list'] });

      router.push('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const modifyBoardMutation = useMutation({
    mutationFn: (dto: IUpdateBoardDto) => BoardApi.updateBoard(dto),
    onSuccess: async (_, variables) => {
      alert('게시글이 수정되었습니다.');

      await queryClient.resetQueries({ queryKey: ['board-detail', variables.boardSeq] });
      // navigate('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.deleteBoard(boardSeq),
    onSuccess: () => {
      router.push('/board');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const boardLikeMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.boardLike(boardSeq),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board-list'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    createBoardMutation,
    modifyBoardMutation,
    deleteBoardMutation,
    boardLikeMutation,
  };
};
