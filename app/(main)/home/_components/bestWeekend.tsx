'use client';

import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

export default function BestWeekend() {
  return (
    <Wrapper title="일주일 종합">
      <div className="flex flex-col gap-2">
        <Text value="애플" onClick={() => {}} />
        <Text value="삼성전자우" onClick={() => {}} />
      </div>
    </Wrapper>
  );
}
