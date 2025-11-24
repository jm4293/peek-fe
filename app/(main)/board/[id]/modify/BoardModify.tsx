'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { BoardModel, UpdateBoardReq, updateBoardReqSchema, useBoardMutation } from '@/services/board';

interface Props {
  data: BoardModel;
  id: string;
}

export default function BoardModify(props: Props) {
  const { data, id } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBoardReq>({
    resolver: zodResolver(updateBoardReqSchema),
    defaultValues: {
      title: data.title || '',
      content: data.boardArticle.content || '',
      boardId: Number(id),
    },
  });

  const { updateBoardMutation } = useBoardMutation();

  const onSubmit = (data: UpdateBoardReq) => {
    updateBoardMutation.mutate({ ...data });
  };

  return (
    <Wrapper.SECTION>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <div className="col-span-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input label="제목" placeholder="제목을 입력해주세요" {...register('title')} />
              {errors.title && <Text.PARAGRAPH text={errors.title.message} color="red" />}
            </div>
            <div className="flex flex-col gap-2">
              <Textarea label="내용" placeholder="내용을 입력해주세요" {...register('content')} />
              {errors.content && <Text.PARAGRAPH text={errors.content.message} color="red" />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/board/${id}`} className="w-full">
              <Button.OUTLINE text="취소" />
            </Link>
            <Button.CONTAINER text="수정하기" type="submit" disabled={updateBoardMutation.isPending} />
          </div>
        </div>
      </form>
    </Wrapper.SECTION>
  );
}
