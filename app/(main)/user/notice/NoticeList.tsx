'use client';

import { Dayjs } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { INoticeModel, useNoticeList } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

export default function NoticeList() {
  const router = useRouter();

  const [list, setList] = useState<INoticeModel[]>([]);

  const { data: noticeList, hasNextPage, fetchNextPage, isFetchingNextPage, isSuccess } = useNoticeList({});

  const clickHandler = (id: number) => {
    router.push(`/user/notice/${id}`);
  };

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
          <div className="flex flex-col gap-1" onClick={() => clickHandler(id)}>
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={`[${NoticeTypeEnumList[type].label}]`} color={NoticeTypeEnumList[type].color} />
              <Text.HEADING text={title} />
            </div>

            <Text.PARAGRAPH text={Dayjs.of(createdAt).formatYYMMDDHHmm()} color="gray" />
          </div>
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
