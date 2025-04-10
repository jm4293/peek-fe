'use client';

import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Textarea from '@/components/textarea/textarea';
import { useState } from 'react';
import { useBoardMutation } from '@/hooks';
import Wrapper from '@/components/wrapper/wrapper';

export default function BoardRegister() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!title || !title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!content || !content.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    createBoardMutation.mutate({ title, content });
  };

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

        <Button title="등록 하기" onClick={clickHandler} disabled={createBoardMutation.isPending} />
      </div>
    </Wrapper>
  );
}
