'use client';

import { useBoardMutation } from '@/hooks';
import { useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Text from '@/components/text/text';
import Textarea from '@/components/textarea/textarea';
import Wrapper from '@/components/wrapper/wrapper';

import { IMARKET_TYPE, MARKET_TYPE } from '@/constant/stock';

export default function BoardRegister() {
  const [marketType, setMarketType] = useState<IMARKET_TYPE | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createBoardMutation } = useBoardMutation();

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

    createBoardMutation.mutate({ marketType, title, content });
  };

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
                  onClick={() => setMarketType(key as IMARKET_TYPE)}
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

        <Button title="등록 하기" onClick={clickHandler} disabled={createBoardMutation.isPending} />
      </div>
    </Wrapper>
  );
}
