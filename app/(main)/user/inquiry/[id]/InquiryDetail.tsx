import { DayjsUtil } from '@/utils';
import Image from 'next/image';

import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IInquiryModel } from '@/services/inquiry';

interface IProps {
  inquiry: IInquiryModel;
}

export default function InquiryDetail(props: IProps) {
  const { inquiry } = props;

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <Text.HEADING text={inquiry.title} />
          <Text.PARAGRAPH text={DayjsUtil.of(inquiry.createdAt).formatYYMMDDHHmm()} color="gray" />
        </div>
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <PreText text={inquiry.content} />
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        {inquiry.images.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {inquiry.images.map((image, index) => (
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
    </>
  );
}
