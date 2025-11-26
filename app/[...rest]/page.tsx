'use client';

import Link from 'next/link';

import { AnimatedBackground } from '@/components/canvas';
import { Text } from '@/components/text';

export default function CatchAllPage() {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-theme-bg-main overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
        <p className="text-8xl font-bold text-gray-500 dark:text-gray-400 select-none">404</p>

        <div className="text-center space-y-2">
          <Text.HEADING text="앗! 페이지를 찾을 수 없어요" />
          <Text.PARAGRAPH text="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다." color="gray" />
        </div>

        <Link
          href="/home"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 text-sm underline">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
