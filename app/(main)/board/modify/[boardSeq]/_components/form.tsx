'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';
import { ResCodeEnum } from '@/constant/enum';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import Button from '@/components/button/button';
import { updateBoard } from '@/app/(main)/board/modify/[boardSeq]/action';
import { IBoard } from '@/types/interface';

interface IProps {
  board: IBoard;
}

export default function Form(props: IProps) {
  const { board } = props;

  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(async () => {
      const ret = await updateBoard({ boardSeq: Number(board.boardSeq), formData });

      if (ret.result === ResCodeEnum.SUCCESS) {
        await queryClient.invalidateQueries({ queryKey: ['board-list'] });
        router.push(`/board/detail/${board.boardSeq}`);
      } else if (ret.result === ResCodeEnum.FAIL) {
        alert(ret.message);
      }
    });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="col-span-5 flex flex-col gap-4">
        <Input
          type="text"
          title="제목"
          name="title"
          defaultValue={board.title}
          placeholder="제목을 입력해주세요"
          required
        />
        <Textarea title="내용" name="content" defaultValue={board.content} placeholder="내용을 입력해주세요" required />
      </div>

      <Button title="수정 하기" type="submit" disabled={isPending} />
    </form>
  );
}
