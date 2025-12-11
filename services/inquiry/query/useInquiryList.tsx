import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/constant/query-key';

import inquiryApi from '../api/inquiry.api';
import { GetInquiryListReq, GetInquiryListRes } from '../type';

export interface Props extends Omit<GetInquiryListReq, 'page'> {}

export const useInquiryList = (props: Props) => {
  return useInfiniteQuery({
    queryKey: QueryKeys.inquiry.list(),
    queryFn: ({ pageParam }) => inquiryApi.getInquiryList({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage.data;

      return nextPage;
    },
    select: (data) => {
      return data.pages.reduce(
        (acc: GetInquiryListRes, cur) => {
          const { inquiryList, total, nextPage } = cur.data;

          return { inquiryList: [...acc.inquiryList, ...inquiryList], total, nextPage };
        },
        { inquiryList: [], total: 0, nextPage: null },
      );
    },
    initialPageParam: 1,
  });
};
