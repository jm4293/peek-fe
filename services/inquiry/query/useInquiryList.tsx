import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import inquiryApi from '../api';
import { IInquiryListDto } from '../dto';
import { IInquiryListRes } from '../response';

export interface IProps extends Omit<IInquiryListDto, 'page'> {}

export const useInquiryList = (props: IProps) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.inquiry.list(),
    queryFn: ({ pageParam }) => inquiryApi.getInquiryList({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: IInquiryListRes, cur) => {
          const { inquiryList, total, nextPage } = cur.data;

          return { inquiryList: [...acc.inquiryList, ...inquiryList], total, nextPage };
        },
        { inquiryList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};
