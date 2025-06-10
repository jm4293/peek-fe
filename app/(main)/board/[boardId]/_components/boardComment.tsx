'use client';

import { useBoardCommentList, useBoardCommentMutation, useMyInfo } from '@/hooks';
import { Dayjs } from '@/utils';
import { useState } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';

import Input from '@/components/input/input';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps {
  boardId: string;
  auth: boolean;
}

export default function BoardComment(props: IProps) {
  const { boardId, auth } = props;

  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [isReply, setIsReply] = useState<number>(-1);

  const myInfo = useMyInfo(auth);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isSuccess } = useBoardCommentList({
    boardId: Number(boardId),
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();

  const onCreateCommentHandler = () => {
    if (!comment || !comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    createBoardCommentMutation.mutate({ boardId: Number(boardId), content: comment });
    setComment('');
  };

  const onDeleteCommentHandler = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent> | undefined,
    boardCommentId: number,
  ) => {
    event?.stopPropagation();

    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardId: Number(boardId), boardCommentId });
    }
  };

  const onCreateReplyCommentHandler = (commentId: number) => {
    if (!replyComment || !replyComment.trim()) {
      alert('답글을 입력해주세요.');
      return;
    }

    createBoardCommentMutation.mutate(
      { boardId: Number(boardId), content: replyComment, commentId },
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
            <Text value="댓글" size="lg" />
          </div>

          {isSuccess ? (
            data.total > 0 ? (
              <div className="flex flex-col gap-2">
                {data.boardComments.map((boardComment, idx) => (
                  <div key={boardComment.id}>
                    <div
                      className={`flex flex-col gap-2 cursor-pointer`}
                      onClick={() => {
                        setReplyComment('');
                        setIsReply(isReply === boardComment.id ? -1 : boardComment.id);
                      }}>
                      <div className="flex justify-between items-center gap-2">
                        <Text value={boardComment.content} />

                        <div className="flex justify-between items-center gap-2">
                          <Text value={boardComment.userAccount.user.nickname} />
                          <Text value={Dayjs.formatMMDD(boardComment.createdAt)} color="gray" />
                          {boardComment.userAccount.email === myInfo.data?.email && (
                            <Text
                              value="삭제"
                              color="red"
                              size="sm"
                              onClick={(event) => onDeleteCommentHandler(event, boardComment.id)}
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
                              <Text value={reply.content} />
                            </div>

                            <div className="flex items-center gap-2">
                              <Text value={reply.userAccount.user.nickname} />
                              <Text value={Dayjs.formatMMDD(reply.createdAt)} color="gray" />
                              {boardComment.userAccount.email === myInfo.data?.email && (
                                <Text
                                  value="삭제"
                                  color="red"
                                  size="sm"
                                  onClick={(event) => onDeleteCommentHandler(event, reply.id)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="pl-4 flex">
                      {isReply === boardComment.id && (
                        <Input
                          type="text"
                          title=""
                          name="reply"
                          value={replyComment}
                          onChange={(event) => setReplyComment(event.target.value)}
                          placeholder="답글을 입력해주세요"
                          isPlus
                          onKeyDown={() => onCreateReplyCommentHandler(boardComment.id)}
                          plusClick={() => onCreateReplyCommentHandler(boardComment.id)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text value="등록된 댓글이 없습니다." />
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
              {isFetchingNextPage ? <LineSkeleton text="로딩!!" /> : '더보기'}
            </button>
          )}
        </div>
      </Wrapper>

      {auth && (
        <Wrapper>
          <Input
            type="text"
            title="댓글 등록"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="댓글을 입력해주세요"
            isPlus
            onKeyDown={onCreateCommentHandler}
            plusClick={onCreateCommentHandler}
          />
        </Wrapper>
      )}
    </>
  );
}
