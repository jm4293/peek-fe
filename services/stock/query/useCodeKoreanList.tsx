import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import StockApi, { IGetCodeKoreanListDto } from '@/services/stock';

import { QueryKeys } from '@/shared/query-key';

// interface IProps extends Omit<IGetCodeKoreanListDto, 'page'> {}
interface IProps extends IGetCodeKoreanListDto {}

export const useCodeKoreanList = (props: IProps) => {
  const { text, kind } = props;

  return useQuery({
    queryKey: ['stock-list', text, kind],
    queryFn: () => StockApi.getCodeKoreanList(props),
    select: (res) => {
      const { codeList, total } = res.data;

      return { codeList, total };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
  });

  // return useInfiniteQuery({
  //   queryKey: QueryKeys.stock.koreanList(),
  //   queryFn: ({ pageParam }) => StockApi.getCodeKoreanList({ ...props, page: pageParam }),
  //   getNextPageParam: (lastPage) => {
  //     const { nextPage } = lastPage.data;

  //     return nextPage;
  //   },
  //   initialPageParam: 1,
  // });
};
