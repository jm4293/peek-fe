'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/input/input';
import Textarea from '@/components/textarea/textarea';
import Button from '@/components/button/button';
import { useBoardMutation } from '@/hooks';
import { IBoard } from '@/types/interface';

interface IProps {
  board: IBoard;
}

export default function BoardModify(props: IProps) {
  const { board } = props;

  const pathName = usePathname();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const boardSeqRef = useRef(pathName.split('/').at(-1));

  const { modifyBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요');
      return;
    }

    modifyBoardMutation.mutate({ boardSeq: Number(boardSeqRef.current), title, content });
  };

  useEffect(() => {
    const { title, content } = board;

    setTitle(title);
    setContent(content);
  }, []);

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
  );
}
