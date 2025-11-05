'use client';

import { DayjsUtil } from '@/utils';
import { use } from 'react';

import { ShareButton } from '@/components/button';
import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { NoticeModel } from '@/services/notice';

import { IResponseType } from '@/shared/types';

interface IProps {
  notice: Promise<IResponseType<NoticeModel | null>>;
}

export default function NoticeDetail(props: IProps) {
  const { notice } = props;

  const { data, success } = use(notice);

  if (!success) {
    return (
      <Wrapper.MAIN text="공지사항">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="공지사항">
        <EmptyDataView text="공지사항" />
      </Wrapper.MAIN>
    );
  }

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Thumbnail thumbnail={data.userAccount.user.thumbnail} size={32} />
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
