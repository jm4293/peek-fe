'use client';

import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

export default function BestNews() {
  return (
    <Wrapper title="인기 뉴스">
      <div className="flex flex-col gap-2">
        <Text value="애플 급등" onClick={() => {}} />
        <Text value="삼성전자우 급등" onClick={() => {}} />
      </div>
    </Wrapper>
  );
}
