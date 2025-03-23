'use client';

import Button from '@/components/button/button';
import { useRouter } from 'next/navigation';
import { useBoardMutation } from '@/hooks';

interface IProps {
  boardSeq: string;
}

export default function BoardDetailButton(props: IProps) {
  const { boardSeq } = props;

  const router = useRouter();

  const { deleteBoardMutation } = useBoardMutation();

  const modifyClickHandler = () => {
    router.push(`/board/modify/${boardSeq}`);
  };

  const deleteClickHandler = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate(Number(boardSeq));
    }
  };

  return (
    <div className="flex gap-4">
      <Button title="수정" onClick={modifyClickHandler} />
      <Button title="삭제" color="delete" onClick={deleteClickHandler} />
    </div>
  );
}
