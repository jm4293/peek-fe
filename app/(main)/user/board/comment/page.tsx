import { Wrapper } from '@/components/wrapper';

import MineBoardCommentList from './MineBoardCommentList';

export default function UserBoardCommentPage() {
  return (
    <Wrapper.MAIN text="작성한 게시글 댓글">
      <MineBoardCommentList />
    </Wrapper.MAIN>
  );
}
