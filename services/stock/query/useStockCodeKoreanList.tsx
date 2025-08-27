import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import StockApi, { IGetCodeKoreanListDto, IStockCodeKoreanListRes } from '@/services/stock';

import { QueryKeys } from '@/shared/query-key';

interface IProps extends Omit<IGetCodeKoreanListDto, 'page'> {}
// interface IProps extends IGetCodeKoreanListDto {}

export const useStockCodeKoreanList = (props: IProps) => {
  const { text, kind } = props;

  // return useQuery({
  //   queryKey: ['stock-list', text, kind],
  //   queryFn: () => StockApi.getStockCodeKoreanList(props),
  //   select: (res) => {
  //     const { codeList, total } = res.data;

  //     return { codeList, total };
  //   },
  //   staleTime: 1000 * 60 * 60 * 6, // 6시간,
  // });

  return useInfiniteQuery({
    queryKey: QueryKeys.stock.koreanList(),
    queryFn: ({ pageParam }) => StockApi.getStockCodeKoreanList({ ...props, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IStockCodeKoreanListRes, cur) => {
          const { stockCodeList, total } = cur.data;

          return {
            stockCodeList: [...acc.stockCodeList, ...stockCodeList],
            total,
            nextPage: cur.data.nextPage,
          };
        },
        { stockCodeList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};
