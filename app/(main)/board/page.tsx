'use client';

import { useRouter } from 'next/navigation';
import BoardList from '@/app/(main)/board/_components/boardList';
import { BoardRegisterSvg } from '@/asset/svg/boardRegisterSvg';
import useIsAuth from '@/hooks/useIsAuth';

export default function Page() {
  const router = useRouter();

  const [isAuth] = useIsAuth();

  const onClickHandler = () => {
    router.push('/board/register');
  };

  return (
    <div>
      <BoardList />

      {isAuth && (
        <div className="bottom-28 absolute right-8">
          <BoardRegisterSvg onClick={onClickHandler} />
        </div>
      )}
    </div>
  );
}
