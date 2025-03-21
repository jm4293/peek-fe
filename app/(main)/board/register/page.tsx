'use client';

import { useState } from 'react';
import { useBoardMutation } from '@/hooks';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createBoardMutation } = useBoardMutation();

  const onClickHandler = () => {
    createBoardMutation.mutate({ title, content });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="col-span-5 flex flex-col gap-4">
        <Input
          type="text"
          title="제목"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <Textarea
          title="내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요"
        />
      </div>
      <Button title="등록 하기" onClick={onClickHandler} />
    </div>
  );
}
