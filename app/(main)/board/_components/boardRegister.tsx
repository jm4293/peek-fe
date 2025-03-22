'use client';

import { BoardRegisterSvg } from '@/asset/svg/boardRegisterSvg';
import { useRouter } from 'next/navigation';

export default function BoardRegister() {
  const router = useRouter();

  return (
    <div className="absolute bottom-4 right-4">
      <BoardRegisterSvg onClick={() => router.push('/board/register')} />
    </div>
  );
}
