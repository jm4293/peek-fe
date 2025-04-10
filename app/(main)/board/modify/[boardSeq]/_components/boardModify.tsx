'use client';

import { useBoardMutation } from '@/hooks';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Text from '@/components/text/text';
import Textarea from '@/components/textarea/textarea';
import Wrapper from '@/components/wrapper/wrapper';

import { IMARKET_TYPE, MARKET_TYPE } from '@/constant/stock';

import { IBoard } from '@/types/interface';

interface IProps {
  board: IBoard;
}

export default function BoardModify(props: IProps) {
  const { board } = props;

  const pathName = usePathname();

  const [marketType, setMarketType] = useState<IMARKET_TYPE | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const boardSeqRef = useRef(pathName.split('/').at(-1));

  const { modifyBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!marketType) {
      alert('종목을 선택해주세요');
      return;
    }

    if (!title || !title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!content || !content.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    modifyBoardMutation.mutate({ marketType, boardSeq: Number(boardSeqRef.current), title, content });
  };

  useEffect(() => {
    const { marketType, title, content } = board;

    setMarketType(marketType);
    setTitle(title);
    setContent(content);
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="col-span-5 flex flex-col gap-4">
          <div className="flex gap-4">
            {Object.entries(MARKET_TYPE).reduce((acc: React.ReactNode[], [key, value]) => {
              if (key === 'ALL') {
                return acc;
              }

              acc.push(
                <Text
                  key={key}
                  value={value}
                  color={`${marketType === key ? 'black' : 'gray'}`}
                  weight={`${marketType === key ? 'bold' : 'normal'}`}
                />,
              );

              return acc;
            }, [])}
          </div>

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
