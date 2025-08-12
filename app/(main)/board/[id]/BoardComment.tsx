'use client';

import { Dayjs } from '@/utils';
import { useState } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';

import { Button } from '@/components/button';
import { EditableInput } from '@/components/input';
import { LineSkeleton } from '@/components/skeleton';
import { EditableText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useBoardCommentList({
    boardId: Number(id),
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();

  const onCreateCommentHandler = () => {
    if (!comment || !comment.trim()) {
      alert('댓글을 입력해주세요.');
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
    if (!replyComment || !replyComment.trim()) {
      alert('답글을 입력해주세요.');
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
      <Wrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text.HEADING text="댓글" />
          </div>

          {isSuccess ? (
            data.total > 0 ? (
              <div className="flex flex-col gap-2">
                {data.boardComments.map((boardComment) => (
                  <div key={boardComment.id}>
                    <div
                      className={`flex flex-col gap-2 cursor-pointer`}
                      onClick={() => {
                        setReplyComment('');
                        setIsReply(isReply === boardComment.id ? -1 : boardComment.id);
                      }}>
                      <div className="flex justify-between items-center gap-2">
                        <Text.HEADING text={boardComment.content} />

                        <div className="flex justify-between items-center gap-2">
                          <Text.PARAGRAPH text={boardComment.userAccount.user.nickname} />
                          <Text.PARAGRAPH text={Dayjs.of(boardComment.createdAt).formatMMDD()} color="gray" />
                          {boardComment.userAccount.email === my?.email && (
                            <EditableText.PARAGRAPH
                              text="삭제"
                              color="red"
                              onClick={() => onDeleteCommentHandler(boardComment.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pl-4 flex flex-col gap-2">
                      {boardComment.replies.length > 0 &&
                        boardComment.replies.map((reply) => (
                          <div className="flex justify-between" key={reply.id}>
                            <div className="flex items-center gap-2">
                              <BsArrowReturnRight color="#666666" />
                              <Text.HEADING text={reply.content} />
                            </div>

                            <div className="flex items-center gap-2">
                              <Text.PARAGRAPH text={reply.userAccount.user.nickname} />
                              <Text.PARAGRAPH text={Dayjs.of(reply.createdAt).formatMMDD()} color="gray" />
                              {boardComment.userAccount.email === my?.email && (
                                <EditableText.PARAGRAPH
                                  text="삭제"
                                  color="red"
                                  onClick={() => onDeleteCommentHandler(reply.id)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {isReply === boardComment.id && (
                      <EditableInput.TEXT
                        className="mb-4"
                        title=""
                        name="reply"
                        value={replyComment}
                        onChange={(event) => setReplyComment(event.target.value)}
                        placeholder="답글을 입력해주세요">
                        <Button.CONTAINER text="등록" onClick={() => onCreateReplyCommentHandler(boardComment.id)} />
                      </EditableInput.TEXT>
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
              {isFetchingNextPage ? <LineSkeleton text="로딩" /> : '더보기'}
            </button>
          )}
        </div>
      </Wrapper>

      {!!my && (
        <Wrapper>
          <div className="flex gap-4">
            <EditableInput.TEXT
              title="댓글 등록"
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="댓글을 입력해주세요">
              <Button.CONTAINER text="등록" onClick={onCreateCommentHandler} />
            </EditableInput.TEXT>
          </div>
        </Wrapper>
      )}
    </>
  );
}
