'use client';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function BestWeekend() {
  return (
    <Wrapper title="일주일 종합">
      <div className="flex flex-col gap-2">
        <EditableText.PARAGRAPH text="애플" />
        {/* <EditableText.PARAGRAPH text="삼성전자우" /> */}
      </div>
    </Wrapper>
  );
}
