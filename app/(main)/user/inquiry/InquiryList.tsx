'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

import { InquiryModel, useInquiryList } from '@/services/inquiry';

export default function InquiryList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useInquiryList({});

  const renderItem = (item: InquiryModel) => {
    const { id, title, createdAt } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/inquiry/${id}`} className="flex flex-col gap-1">
            <Text.HEADING text={title} />
            <Text.PARAGRAPH text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
          </Link>
        </Wrapper.SECTION>
      </li>
    );
  };

  if (isPending) {
    return <LoadingView />;
  }

  if (!isSuccess) {
    return <InternalErrorView />;
  }

  if (data.inquiryList.length === 0) {
    return <EmptyDataView text="문의 내역" />;
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {data.inquiryList.map(renderItem)}
    </InfinityList>
  );
}
