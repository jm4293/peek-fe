import { Text } from '@/components/text';

import MineBoardList from './MineBoardList';

export default function UserBoardPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="작성한 게시글" />

      <MineBoardList />
    </div>
  );
}
