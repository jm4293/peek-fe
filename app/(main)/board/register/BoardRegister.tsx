'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { SkeletonSuspense } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { InternalErrorView, Wrapper } from '@/components/wrapper';

import { CreateBoardReq, createBoardReqSchema, useBoardMutation } from '@/services/board';
import { useStockCategoryList } from '@/services/stock';

export default function BoardRegister() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBoardReq>({
    resolver: zodResolver(createBoardReqSchema),
  });

  const categoryId = watch('categoryId');

  const { data, isPending, isSuccess } = useStockCategoryList();

  const { createBoardMutation } = useBoardMutation();

  const onSubmit = (formData: CreateBoardReq) => {
    createBoardMutation.mutate({ ...formData });
  };

  if (isPending) {
    return <SkeletonSuspense />;
  }

  if (!isSuccess) {
    return (
      <Wrapper.SECTION>
        <InternalErrorView />
      </Wrapper.SECTION>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Wrapper.SECTION text="카테고리">
        <div className="flex items-center gap-4">
          {data.map((cur) => {
            return (
              <div key={cur.id} onClick={() => setValue('categoryId', cur.id, { shouldValidate: true })}>
                <Text.HEADING text={cur.name} color={categoryId === cur.id ? 'default' : 'gray'} />
              </div>
            );
          })}
        </div>
        {errors.categoryId && <Text.PARAGRAPH text={errors.categoryId.message} color="red" />}
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
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
            <Link href="/board" className="w-full">
              <Button.OUTLINE text="취소" />
            </Link>
            <Button.CONTAINER text="등록하기" type="submit" disabled={createBoardMutation.isPending} />
          </div>
        </div>
      </Wrapper.SECTION>
    </form>
  );
}
