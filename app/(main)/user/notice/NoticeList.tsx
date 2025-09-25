'use client';

import { DayjsUtil } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { INoticeModel, useNoticeList } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

export default function NoticeList() {
  const [list, setList] = useState<INoticeModel[]>([]);

  const { data: noticeList, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess } = useNoticeList({});

  useEffect(() => {
    if (isSuccess && noticeList) {
      setList(noticeList.noticeList);
    }
  }, [isSuccess]);

  const renderItem = (item: INoticeModel) => {
    const { id, type, title, createdAt } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <Link href={`/user/notice/${id}`} className="flex flex-col gap-1">
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

  if (list.length === 0) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="공지사항이 없습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <InfinityList hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage}>
      {list.map(renderItem)}
    </InfinityList>
  );
}
