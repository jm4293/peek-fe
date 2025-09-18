'use client';

import { DayjsUtil } from '@/utils';
import { CornerDownRight } from 'lucide-react';
import { useState } from 'react';

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
  my: IUserAccountModel | null;
}

export default function BoardComment(props: IProps) {
  const { id, my } = props;

  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [isReply, setIsReply] = useState<number>(-1);

  const { openToast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useBoardCommentList({
    boardId: id,
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();

  const onCreateCommentHandler = () => {
    if (createBoardCommentMutation.isPending) {
      return;
    }

    if (!comment || !comment.trim()) {
      openToast({ message: '댓글을 입력해주세요.', type: 'error' });
      return;
    }

    createBoardCommentMutation.mutate({ boardId: Number(id), content: comment });
    setComment('');
  };

  const onDeleteCommentHandler = (boardCommentId: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardId: Number(id), boardCommentId });
    }
  };

  const onCreateReplyCommentHandler = (commentId: number) => {
    if (createBoardCommentMutation.isPending) {
      return;
    }

    if (!replyComment || !replyComment.trim()) {
      openToast({ message: '답글을 입력해주세요.', type: 'error' });
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

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text.HEADING text="댓글" />
          </div>

          {isSuccess ? (
            data.total > 0 ? (
              <div className="flex flex-col">
                {data.boardComments.map((boardComment) => (
                  <div key={boardComment.id} className="border-b py-2">
                    <div
                      className="flex justify-between items-center cursor-pointer "
                      onClick={() => {
                        setReplyComment('');
                        setIsReply(isReply === boardComment.id ? -1 : boardComment.id);
                      }}>
                      <Text.HEADING text={boardComment.content} />

                      <div className="flex justify-between items-center gap-2">
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            <Thumbnail thumbnail={boardComment.userAccount.user.thumbnail} size={16} />
                            <Text.PARAGRAPH text={boardComment.userAccount.user.nickname} />
                          </div>

                          <Text.CAPTION text={DayjsUtil.of(boardComment.createdAt).formatYYMMDDHHmm()} color="gray" />
                        </div>

                        {boardComment.userAccount.email === my?.email && (
                          <div className="cursor-pointer" onClick={() => onDeleteCommentHandler(boardComment.id)}>
                            <Text.PARAGRAPH text="삭제" color="red" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 mt-1">
                      {boardComment.replies.length > 0 &&
                        boardComment.replies.map((reply) => (
                          <div key={reply.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <CornerDownRight />
                              <Text.HEADING text={reply.content} />
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1">
                                  <Thumbnail thumbnail={reply.userAccount.user.thumbnail} size={16} />
                                  <Text.PARAGRAPH text={reply.userAccount.user.nickname} />
                                </div>

                                <Text.CAPTION text={DayjsUtil.of(reply.createdAt).formatYYMMDDHHmm()} color="gray" />
                              </div>

                              {reply.userAccount.email === my?.email && (
                                <div className="cursor-pointer" onClick={() => onDeleteCommentHandler(reply.id)}>
                                  <Text.PARAGRAPH text="삭제" color="red" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {isReply === boardComment.id && (
                      <Input
                        className="mb-4"
                        title=""
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
                ))}
              </div>
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
        </div>
      </Wrapper.SECTION>

      {!!my && (
        <Wrapper.SECTION>
          <div className="flex gap-4">
            <Input
              title="댓글 등록"
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
          </div>
        </Wrapper.SECTION>
      )}
    </>
  );
}
