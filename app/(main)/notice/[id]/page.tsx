import { DayjsUtil } from '@/utils';

import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { noticeDetailAction } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

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
    <div className="flex flex-col gap-2">
      <Wrapper.SECTION>
        <Text.HEADING text="제목" />

        <div className="flex items-center gap-2">
          <Text.PARAGRAPH
            text={`[${NoticeTypeEnumList[data.type].label}]`}
            color={NoticeTypeEnumList[data.type].color}
          />
          <Text.HEADING text={data.title} />
        </div>

        <Text.CAPTION text={DayjsUtil.of(data.createdAt).formatYYMMDDHHmm()} className="text-end" color="gray" />
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <Text.HEADING text="내용" />

        <PreText text={data.content} />
      </Wrapper.SECTION>
    </div>
  );
}
