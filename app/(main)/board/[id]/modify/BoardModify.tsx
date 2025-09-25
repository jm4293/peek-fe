'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { useToast } from '@/hooks/modal';

import { IBoardModel, useBoardMutation } from '@/services/board';

interface IProps {
  board: IBoardModel;
  id: string;
}

export default function BoardModify(props: IProps) {
  const { board, id } = props;
  const router = useRouter();

  const [title, setTitle] = useState(board.title || '');
  const [content, setContent] = useState(board.article.content || '');

  const { openToast } = useToast();

  const { updateBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!title || !title.trim()) {
      openToast({ message: '제목을 입력해주세요', type: 'error' });
      return;
    }

    if (!content || !content.trim()) {
      openToast({ message: '내용을 입력해주세요', type: 'error' });
      return;
    }

    updateBoardMutation.mutate({ boardId: Number(id), title, content });
  };

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-8">
        <div className="col-span-5 flex flex-col gap-4">
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
          <Link href={`/board/${id}`} className="w-full">
            <Button.OUTLINE text="취소" />
          </Link>
          <Button.CONTAINER text="수정하기" onClick={clickHandler} />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
