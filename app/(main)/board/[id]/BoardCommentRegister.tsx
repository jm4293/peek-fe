'use client';

import { ValidationUtil } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useModal } from '@/hooks/modal';

import { useBoardCommentMutation } from '@/services/board';
import { UserAccountModel } from '@/services/user';

interface Props {
  id: string;
  userInfo: UserAccountModel | null;
}

export default function BoardCommentRegister(props: Props) {
  const { id, userInfo } = props;
  const router = useRouter();

  const [comment, setComment] = useState('');

  const { openModal, closeModal } = useModal();

  const { createBoardCommentMutation } = useBoardCommentMutation();

  const onCreateCommentHandler = () => {
    if (!userInfo) {
      openModal({
        title: '알림',
        content: (
          <div className="text-center">
            <Text.SUBTITLE text="로그인 후 이용가능한 서비스입니다." />
            <Text.SUBTITLE text="지금 로그인하고 시작하세요!" />
          </div>
        ),
        onConfirm: () => {
          closeModal();
          router.push('/auth/login');
        },
      });
      return;
    }

    if (createBoardCommentMutation.isPending) {
      return;
    }

    const isValid = ValidationUtil.create()
      .required(comment, '댓글을 입력해주세요.')
      .maxLength(comment, 500, '댓글은 최대 500자까지 입력 가능합니다.')
      .validate((errorMessage) => {
        openModal({
          title: '알림',
          content: errorMessage,
          onConfirm: closeModal,
        });
      });

    if (!isValid) {
      return;
    }

    createBoardCommentMutation.mutate({ boardId: Number(id), content: comment });
    setComment('');
  };

  return (
    <div className="w-full max-w-screen-xl fixed left-1/2 bottom-0 transform -translate-x-1/2">
      <Wrapper.SECTION>
        <Input
          className="pb-4"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="댓글을 입력해주세요">
          <div className="cursor-pointer" onClick={onCreateCommentHandler}>
            <Text.HEADING
              text={createBoardCommentMutation.isPending ? '등록 중...' : '등록'}
              color={createBoardCommentMutation.isPending ? 'gray' : 'blue'}
            />
          </div>
        </Input>
      </Wrapper.SECTION>
    </div>
  );
}
