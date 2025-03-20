'use client';

import { useState } from 'react';
import { useBoardMutation } from '@/hooks';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { onCreateBoardMutation } = useBoardMutation();

  const onClickHandler = () => {
    onCreateBoardMutation.mutate({ title, content });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="col-span-5 flex flex-col gap-4">
        <Input
          type="text"
          title="제목"
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
      <Button text="등록 하기" onClick={onClickHandler} />
    </div>
  );
}
