'use client';

import { DayjsUtil, ValidationUtil } from '@/utils';
import { useEffect, useState } from 'react';

import { Thumbnail } from '@/components/image';
import { Input } from '@/components/input';
import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useToast } from '@/hooks/modal';

import { useBoardCommentList, useBoardCommentMutation } from '@/services/board';
import { IUserAccountModel } from '@/services/user';

interface IProps {
  id: string;
  myInfo: IUserAccountModel | null;
}

export default function BoardComment(props: IProps) {
  const { id, myInfo } = props;

  const [replyComment, setReplyComment] = useState('');
  const [isReply, setIsReply] = useState<number>(-1);

  const { openToast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useBoardCommentList({
    boardId: id,
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();

  const onDeleteCommentHandler = (boardCommentId: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardId: Number(id), boardCommentId });
    }
  };

  const onCreateReplyCommentHandler = (commentId: number) => {
    if (createBoardCommentMutation.isPending) {
      return;
    }

    const isValid = ValidationUtil.create()
      .required(replyComment, '답글을 입력해주세요.')
      .maxLength(replyComment, 500, '답글은 최대 500자까지 입력 가능합니다.')
      .validate((errorMessage) => {
        openToast({ message: errorMessage, type: 'error' });
      });

    if (!isValid) {
      return;
    }

    createBoardCommentMutation.mutate(
      { boardId: Number(id), content: replyComment, commentId },
      {
        onSuccess: () => {
          setIsReply(-1);
          setReplyComment('');
        },
      },
    );
  };

  useEffect(() => {
    setReplyComment('');
  }, [isReply]);

  return (
    <Wrapper.SECTION>
      <Text.HEADING text="댓글" />

      {isSuccess ? (
        data.total > 0 ? (
          data.boardCommentList.map((boardComment) => (
            <div key={boardComment.id} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Thumbnail thumbnail={boardComment.userAccount.user.thumbnail} size={32} />

                <div className="w-full">
                  <Text.PARAGRAPH text={boardComment.userAccount.user.nickname} />
                  <Text.HEADING text={boardComment.content} className="break-words" />
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-end gap-4">
                      <Text.CAPTION text={DayjsUtil.of(boardComment.createdAt).formatYYMMDDHHmm()} color="gray" />
                      <Text.PARAGRAPH
                        text="답글 쓰기"
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => setIsReply(isReply === boardComment.id ? -1 : boardComment.id)}
                      />
                    </div>

                    {boardComment.userAccount.id === myInfo?.id && (
                      <div className="cursor-pointer" onClick={() => onDeleteCommentHandler(boardComment.id)}>
                        <Text.PARAGRAPH text="삭제" color="red" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {boardComment.replies.length > 0 &&
                boardComment.replies.map((reply) => (
                  <div key={reply.id} className="flex flex-col pl-8">
                    <div className="flex gap-2">
                      <Thumbnail thumbnail={reply.userAccount.user.thumbnail} size={32} />

                      <div className="w-full">
                        <Text.PARAGRAPH text={reply.userAccount.user.nickname} />
                        <Text.HEADING text={reply.content} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <Text.CAPTION text={DayjsUtil.of(reply.createdAt).formatYYMMDDHHmm()} color="gray" />
                      {reply.userAccount.id === myInfo?.id && (
                        <div className="cursor-pointer" onClick={() => onDeleteCommentHandler(reply.id)}>
                          <Text.PARAGRAPH text="삭제" color="red" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {isReply === boardComment.id && (
                <Input
                  className="mb-4"
                  name="reply"
                  value={replyComment}
                  onChange={(event) => setReplyComment(event.target.value)}
                  placeholder="답글을 입력해주세요">
                  <div className="cursor-pointer" onClick={() => onCreateReplyCommentHandler(boardComment.id)}>
                    <Text.HEADING
                      text={createBoardCommentMutation.isPending ? '등록 중...' : '등록'}
                      color={createBoardCommentMutation.isPending ? 'gray' : 'blue'}
                    />
                  </div>
                </Input>
              )}
            </div>
          ))
        ) : (
          <Text.HEADING text="등록된 댓글이 없습니다." />
        )
      ) : (
        <>
          <LineSkeleton />
          <LineSkeleton />
          <LineSkeleton />
        </>
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? <LineSkeleton h={2} /> : '더보기'}
        </button>
      )}
    </Wrapper.SECTION>
  );
}
