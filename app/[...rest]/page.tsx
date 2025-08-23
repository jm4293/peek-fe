import Link from 'next/link';

import { Text } from '@/components/text';

export default function CatchAllPage() {
  return (
    <div className="w-screen h-screen">
      <div className="h-1/2 flex flex-col justify-center items-center gap-8">
        <strong>PEEK</strong>

        <div className="flex flex-col items-center gap-4">
          <Text.SUBTITLE text="잘못된 경로입니다." />

          <Link href="/login" className="flex flex-col items-center gap-2">
            <Text.HEADING text="존재하지 않는 페이지입니다." />
            <Text.HEADING text="로그인 페이지로 이동" />
          </Link>
        </div>
      </div>
    </div>
  );
}
