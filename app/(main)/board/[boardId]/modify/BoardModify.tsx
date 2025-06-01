'use client';

import { useBoard, useBoardMutation } from '@/hooks';
import React, { useEffect, useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import Textarea from '@/components/textarea/textarea';
import Wrapper from '@/components/wrapper/wrapper';

export default function BoardModify(props: { boardId: string }) {
  const { boardId } = props;

  const { data, isLoading, isSuccess } = useBoard(boardId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { updateBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!title || !title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!content || !content.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    updateBoardMutation.mutate({ boardId: Number(boardId), title, content });
  };

  useEffect(() => {
    if (isSuccess) {
      const { title, article } = data;
      const { content } = article;

      setTitle(title);
      setContent(content);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <LineSkeleton />;
  }

  if (!isSuccess) {
    return <Wrapper>게시글을 찾을 수 없습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="col-span-5 flex flex-col gap-4">
          <Input
            type="text"
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

        <Button title="수정 하기" onClick={clickHandler} />
      </div>
    </Wrapper>
  );
}
