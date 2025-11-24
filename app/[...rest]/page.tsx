import { Home } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

export default function CatchAllPage() {
  return (
    <Wrapper.SECTION>
      <div className="min-h-[70vh] flex flex-col justify-center items-center gap-8">
        {/* <p className="text-8xl font-bold text-gray-500 select-none animate-pulse">404</p> */}
        <p className="text-8xl font-bold text-gray-500 select-none">404</p>

        <div className="text-center">
          <Text.TITLE text="PEEK" color="main" />
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full animate-pulse"></div>
        </div>

        <div className="text-center space-y-2">
          <Text.HEADING text="앗! 페이지를 찾을 수 없어요" />
          <Text.PARAGRAPH text="요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다." color="gray" />
        </div>

        <Link
          href="/home"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
          <Home size={20} />
          <span className="font-medium">홈으로 돌아가기</span>
        </Link>

        <div className="text-center mt-8">
          <Text.PARAGRAPH text="도움이 필요하시면 고객센터에 문의해주세요." color="gray" />
          <Link href="/inquiry" className="text-blue-500 hover:text-blue-600 underline ml-1">
            문의하기
          </Link>
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
