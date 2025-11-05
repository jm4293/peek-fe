'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { SkeletonSuspense } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { InternalErrorView, Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useBoardMutation } from '@/services/board';
import { useStockCategoryList } from '@/services/stock';

export default function BoardRegister() {
  const [category, setCategory] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { openModal, closeModal } = useModal();

  const { data, isPending, isSuccess } = useStockCategoryList();

  const { createBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!category) {
      openModal({
        title: '알림',
        content: '카테고리를 선택해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    if (!title || !title.trim()) {
      openModal({
        title: '알림',
        content: '제목을 입력해주세요.',
        onConfirm: closeModal,
      });

      return;
    }

    if (!content || !content.trim()) {
      openModal({
        title: '알림',
        content: '내용을 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    createBoardMutation.mutate({ categoryId: category, title, content });
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
    <>
      <Wrapper.SECTION text="카테고리">
        <div className="flex items-center gap-4">
          {data.map((cur) => {
            return (
              <div key={cur.id} onClick={() => setCategory(cur.id)}>
                <Text.HEADING text={cur.name} color={category === cur.id ? 'default' : 'gray'} />
              </div>
            );
          })}
        </div>
      </Wrapper.SECTION>

      <Wrapper.SECTION>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Input
              title="제목"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              required
            />
            <Textarea
              title="내용"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Link href="/board" className="w-full">
              <Button.OUTLINE text="취소" />
            </Link>
            <Button.CONTAINER text="등록하기" onClick={clickHandler} disabled={createBoardMutation.isPending} />
          </div>
        </div>
      </Wrapper.SECTION>
    </>
  );
}
