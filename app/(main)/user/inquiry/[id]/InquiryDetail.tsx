'use client';

import { DayjsUtil } from '@/utils';
import Image from 'next/image';
import { use } from 'react';

import { PreText, Text } from '@/components/text';
import { EmptyDataView, InternalErrorView, Wrapper } from '@/components/wrapper';

import { InquiryModel } from '@/services/inquiry';

import { ResponseType } from '@/shared/types';

interface Props {
  inquiry: Promise<ResponseType<InquiryModel | null>>;
}

export default function InquiryDetail(props: Props) {
  const { inquiry } = props;

  const { data, success } = use(inquiry);

  if (!success) {
    return <InternalErrorView />;
  }

  if (!data) {
    return <EmptyDataView text="문의 내역" />;
  }

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

        {data.inquiryImages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.inquiryImages.map((image, index) => (
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

        {data.inquiryReply ? (
          <div className="flex flex-col gap-2">
            <Text.PARAGRAPH text={data.inquiryReply.content} />
            <Text.CAPTION
              text={DayjsUtil.of(data.inquiryReply.createdAt).formatYYMMDDHHmm()}
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
