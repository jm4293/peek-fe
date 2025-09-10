import { Dayjs } from '@/utils';

import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { noticeDetailAction } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UserNoticeDetailPage(props: IProps) {
  const { id } = await props.params;

  const { data, success } = await noticeDetailAction(id);

  if (!success || !data) {
    return (
      <Wrapper.SECTION>
        <Text.HEADING text="공지사항 불러오는데 실패했습니다." />
      </Wrapper.SECTION>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH
              text={`[${NoticeTypeEnumList[data.type].label}]`}
              color={NoticeTypeEnumList[data.type].color}
            />
            <Text.HEADING text={data.title} />
          </div>

          <Text.CAPTION text={Dayjs.of(data.createdAt).formatYYMMDDHHmm()} color="gray" />
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <PreText text={data.content} />
      </Wrapper.SECTION>
    </div>
  );
}
