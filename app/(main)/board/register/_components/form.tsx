'use client';

import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Textarea from '@/components/textarea/textarea';
import { useTransition } from 'react';
import { registerBoard } from '@/app/(main)/board/register/action';
import { ResCodeEnum } from '@/constant/enum';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);

    startTransition(async () => {
      const ret = await registerBoard(formData);

      if (ret.result === ResCodeEnum.SUCCESS) {
        await queryClient.invalidateQueries({ queryKey: ['board-list'] });
        router.push('/board/list');
      } else if (ret.result === ResCodeEnum.FAIL) {
        alert(ret.message);
      }
    });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="col-span-5 flex flex-col gap-4">
        <Input type="text" title="제목" name="title" placeholder="제목을 입력해주세요" required />
        <Textarea title="내용" name="content" placeholder="내용을 입력해주세요" required />
      </div>

      <Button title="등록 하기" type="submit" disabled={isPending} />
    </form>
  );
}
