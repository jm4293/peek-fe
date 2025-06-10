import { isAuth } from '@/app/(main)/_components';
import Board from '@/app/(main)/board/Board';

import { BoardRegisterSvg } from '@/asset/svg';

export default async function BoardPage() {
  const auth = await isAuth();

  return (
    <div>
      <Board />

      {auth && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <BoardRegisterSvg />
        </div>
      )}
    </div>
  );
}
