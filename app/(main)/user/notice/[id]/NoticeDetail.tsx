'use client';

import { DayjsUtil } from '@/utils';
import { use } from 'react';

import { ShareButton } from '@/components/button';
import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { NoticeModel } from '@/services/notice';

import { ResponseType } from '@/shared/types';

interface Props {
  notice: Promise<ResponseType<NoticeModel | null>>;
}

export default function NoticeDetail(props: Props) {
  const { notice } = props;

  const { data, success } = use(notice);

  if (!success) {
    return <InternalErrorView />;
  }

  if (!data) {
    return <EmptyDataView text="공지사항" />;
  }

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Thumbnail thumbnail={data.userAccount.user.thumbnail} size={24} />
            <div className="flex flex-col">
              <Text.HEADING text={data.userAccount.user.nickname} />
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
          <ShareButton text="공지사항" />
        </div>
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <Text.HEADING text={data.title} />
        <PreText text={data.content} />
      </Wrapper.SECTION>
    </>
  );
}
