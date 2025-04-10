'use client';

import { useRouter } from 'next/navigation';

import { BoardRegisterSvg } from '@/asset/svg/boardRegisterSvg';

export default function BoardRegisterButton() {
  const router = useRouter();

  return (
    <div className="absolute bottom-4 right-4">
      <BoardRegisterSvg onClick={() => router.push('/board/register')} />
    </div>
  );
}
