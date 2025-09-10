import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import noticeApi from '../api/notice.api';
import { INoticeListDto } from '../dto';
import { INoticeListRes } from '../response';

export interface IProps extends Omit<INoticeListDto, 'page'> {}

export const useNoticeList = (props: IProps) => {
  const { type } = props;

  return useInfiniteQuery({
    queryKey: QueryKeys.notice.list(type),
    queryFn: ({ pageParam }) => noticeApi.getNoticeList({ ...props, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: INoticeListRes, cur) => {
          const { noticeList, total, nextPage } = cur.data;
          return { noticeList: [...acc.noticeList, ...noticeList], total, nextPage };
        },
        { noticeList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};
