import { DayjsUtil } from '@/utils';
import { Share } from 'lucide-react';

import { Thumbnail } from '@/components/image';
import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { noticeDetailAction } from '@/services/notice';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserNoticeDetailPage(props: IProps) {
  const { id } = await props.params;

  const { success, data } = await noticeDetailAction(id);

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
    <Wrapper.MAIN text="공지사항">
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Thumbnail thumbnail={data.userAccount.user.thumbnail} size={32} />
            <div className="flex flex-col">
              <Text.HEADING text={data.userAccount.user.nickname} />
              <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatYYMMDDHHmm()} color="gray" />
            </div>
          </div>
          <Share />
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <Text.HEADING text={data.title} />
        <PreText text={data.content} />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
