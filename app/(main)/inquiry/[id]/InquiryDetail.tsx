import { DayjsUtil } from '@/utils';
import Image from 'next/image';

import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IInquiryModel } from '@/services/inquiry';

interface IProps {
  data: IInquiryModel;
}

export default function InquiryDetail(props: IProps) {
  const { data } = props;

  return (
    <>
      <Wrapper.SECTION>
        <Text.HEADING text="제목" />

        <Text.HEADING text={data.title} />
        <Text.PARAGRAPH text={DayjsUtil.of(data.createdAt).formatYYMMDDHHmm()} className="text-end" color="gray" />
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <Text.HEADING text="내용" />

        <PreText text={data.content} />
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <Text.HEADING text="첨부 이미지" />

        {data.images.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.images.map((image, index) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/${image.image}`}
                alt={`Inquiry Image ${index + 1}`}
                width={60}
                height={60}
                priority={index < 3} // 처음 3개 이미지는 우선 로드
              />
            ))}
          </div>
        ) : (
          <Text.PARAGRAPH text="첨부된 이미지가 없습니다." color="gray" />
        )}
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <Text.HEADING text="답변" />

        {data.reply ? (
          <div className="flex flex-col gap-2">
            <Text.PARAGRAPH text={data.reply.content} />
            <Text.CAPTION
              text={DayjsUtil.of(data.reply.createdAt).formatYYMMDDHHmm()}
              className="text-end"
              color="gray"
            />
          </div>
        ) : (
          <Text.PARAGRAPH text="아직 답변이 등록되지 않았습니다." color="gray" />
        )}
      </Wrapper.SECTION>
    </>
  );
}
