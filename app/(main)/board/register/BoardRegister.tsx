'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { EditableButton } from '@/components/button';
import { EditableInput } from '@/components/input';
import { EditableText } from '@/components/text';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useBoardMutation } from '@/services/board';
import { IStockCategoryListRes } from '@/services/stock';

interface IProps extends IStockCategoryListRes {}

export default function BoardRegister(props: IProps) {
  const { stockCategoryList } = props;
  const router = useRouter();

  const [category, setCategory] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { openModal, closeModal } = useModal();

  const { createBoardMutation } = useBoardMutation();

  const clickHandler = () => {
    if (!category) {
      openModal({
        content: '카테고리를 선택해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    if (!title || !title.trim()) {
      openModal({
        content: '제목을 입력해주세요.',
        onConfirm: closeModal,
      });

      return;
    }

    if (!content || !content.trim()) {
      openModal({
        content: '내용을 입력해주세요.',
        onConfirm: closeModal,
      });
      return;
    }

    createBoardMutation.mutate({ categoryId: category, title, content });
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {stockCategoryList?.map((el) => (
              <EditableText.HEADING
                key={el.id}
                text={el.name}
                color={`${category === el.id ? 'black' : 'gray'}`}
                onClick={() => setCategory(el.id)}
              />
            ))}
          </div>

          <EditableInput.TEXT
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

        <div className="flex justify-end gap-4">
          <EditableButton.OUTLINE text="취소" onClick={() => router.back()} />
          <EditableButton.CONTAINER text="등록 하기" onClick={clickHandler} disabled={createBoardMutation.isPending} />
        </div>
      </div>
    </Wrapper>
  );
}
