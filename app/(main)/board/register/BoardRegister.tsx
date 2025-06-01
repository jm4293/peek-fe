'use client';

import { useBoardCategoryList, useBoardMutation } from '@/hooks';
import { useState } from 'react';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import Text from '@/components/text/text';
import Textarea from '@/components/textarea/textarea';
import Wrapper from '@/components/wrapper/wrapper';

export default function BoardRegister() {
  const [category, setCategory] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: categoryList, isSuccess: categoryListIsSuccess } = useBoardCategoryList();

  const { createBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!category) {
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

    createBoardMutation.mutate({ categoryId: category, title, content });
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="w-1/4 flex gap-4">
            <div className="w-full flex flex-col gap-1">
              <Text value="카테고리" />

              <div className="flex gap-4">
                {categoryList?.map((el) => (
                  <Text
                    key={el.id}
                    value={el.name}
                    color={`${category === el.id ? 'black' : 'gray'}`}
                    onClick={() => setCategory(el.id)}
                  />
                ))}
              </div>
            </div>
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
