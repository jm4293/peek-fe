import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import BoardApi from '@/api/board/board.api';

import { IBoardDetailRes } from '@/types/res';
import { ResConfig } from '@/types/res.config';

interface IProps {
  boardSeq: string | undefined;
}

export const useBoardDetailQuery = (props: IProps) => {
  const { boardSeq } = props;

  return useQuery({
    queryKey: ['board-detail', boardSeq],
    queryFn: () => BoardApi.getBoardDetail(Number(boardSeq)),
    select: (res: AxiosResponse<ResConfig<IBoardDetailRes>, any>) => {
      const { boardSeq, title, content, createdAt, updatedAt, user } = res.data.data.board;
      const { name, nickname, birthdate, thumbnail } = user;

      return { title, content, nickname, thumbnail };
    },
    enabled: !!boardSeq,
    staleTime: 1000 * 60 * 60, // 1시간
  });
};
