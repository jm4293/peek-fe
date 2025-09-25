'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IInquiryModel, useInquiryList } from '@/services/inquiry';

export default function InquiryList() {
  const [list, setList] = useState<IInquiryModel[]>([]);

  const {
    data: inquiryList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    isFetching,
  } = useInquiryList({});

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setList(inquiryList.inquiryList);
    }
  }, [isSuccess, isFetching]);

  const renderItem = (item: IInquiryModel) => {
    const { id, title, createdAt } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/user/inquiry/${id}`} className="flex flex-col gap-1">
            <Text.HEADING text={title} />
            <Text.PARAGRAPH text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
          </Link>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (list.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="문의내역이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
