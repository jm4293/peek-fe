'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { InternalErrorView, LoadingView, Wrapper } from '@/components/wrapper';

import { INoticeModel, useNoticeList } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

export default function NoticeList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useNoticeList({});

  const renderItem = (item: INoticeModel) => {
    const { id, type, title, createdAt } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/notice/${id}`} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`[${NoticeTypeEnumList[type].label}]`} color={NoticeTypeEnumList[type].color} />
              <Text.HEADING text={title} />
            </div>

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

  if (data.noticeList.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="공지사항이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {data.noticeList.map(renderItem)}
    </InfinityList>
  );
}
