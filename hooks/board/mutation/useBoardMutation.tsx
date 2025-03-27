import { useMutation, useQueryClient } from '@tanstack/react-query';
import BoardApi from '@/api/board/board.api';
import { IUpdateBoardDto } from '@/types/dto';
import { useRouter } from 'next/navigation';

export const useBoardMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // const createBoardMutation = useMutation({
  //   mutationFn: (dto: ICreateBoardDto) => BoardApi.createBoard(dto),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: ['board-list'] });
  //
  //     router.push('/board');
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  // const updateBoardMutation = useMutation({
  //   mutationFn: (dto: IUpdateBoardDto) => BoardApi.updateBoard(dto),
  //   onSuccess: async (_, variables) => {
  //     alert('게시글이 수정되었습니다.');
  //
  //     await queryClient.invalidateQueries({ queryKey: ['board-detail', variables.boardSeq] });
  //     // navigate('/board');
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

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
    deleteBoardMutation,
    boardLikeMutation,
  };
};
