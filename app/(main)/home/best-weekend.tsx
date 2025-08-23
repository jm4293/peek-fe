'use client';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function BestWeekend() {
  return (
    <Wrapper.SECTION text="일주일 종합">
      <div className="flex flex-col gap-2">
        <Text.PARAGRAPH text="애플" />
      </div>
    </Wrapper.SECTION>
  );
}
