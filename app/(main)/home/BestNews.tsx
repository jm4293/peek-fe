'use client';

import { EditableText } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

// import { Wrapper } from '@/components/wrapper';

export default function BestNews() {
  return (
    <Wrapper title="인기 뉴스">
      <div className="flex flex-col gap-2">
        <EditableText.PARAGRAPH text="애플 급등" />
        <EditableText.PARAGRAPH text="삼성전자우 급등" />
      </div>
    </Wrapper>
  );
}
