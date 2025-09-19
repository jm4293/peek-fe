import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function CatchAllPage() {
  return (
    <Wrapper.SECTION>
      <div className="h-[40vh] flex flex-col justify-center items-center gap-8">
        <Text.TITLE text="PEEK" />
        <div className="flex flex-col items-center gap-4">
          <Link href="/home" className="flex flex-col items-center gap-2">
            <Text.HEADING text="존재하지 않는 페이지입니다." color="red" />
            <Text.HEADING text="메인 페이지로 이동" />
          </Link>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
