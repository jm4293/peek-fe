'use client';

import { useState } from 'react';
import { useBoardMutation } from '@/hooks';
import InputClient from '@/components/input/inputClient';
import TextareaClient from '@/components/textarea/textareaClient';
import ButtonClient from '@/components/button/buttonClient';

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
        <InputClient
          type="text"
          title="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <TextareaClient
          title="내용"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용을 입력해주세요"
        />
      </div>
      <ButtonClient title="등록 하기" onClick={onClickHandler} />
    </div>
  );
}
