import { Wrapper } from '@/components/wrapper';

import MineBoardList from './MineBoardList';

export default function UserBoardPage() {
  return (
    <Wrapper.MAIN text="작성한 게시글">
      <MineBoardList />
    </Wrapper.MAIN>
  );
}
