'use client';

import { useBoardCommentListQuery, useBoardCommentMutation, useBoardCommentReplyMutation } from '@/hooks';
import { Dayjs } from '@/utils';
import { useState } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';
import { HiMiniArrowTurnDownRight } from 'react-icons/hi2';

import { DeleteSvg } from '@/asset/svg/deleteSvg';

import Input from '@/components/input/input';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

interface IProps {
  boardSeq: string;
  isAuth: boolean;
}

export default function BoardComment(props: IProps) {
  const { boardSeq, isAuth } = props;

  const [comment, setComment] = useState('');

  const [isReply, setIsReply] = useState<number>(-1);
  const [reply, setReply] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isSuccess } = useBoardCommentListQuery({
    boardSeq: Number(boardSeq),
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();
  const { createBoardCommentReplyMutation, deleteBoardCommentReplyMutation } = useBoardCommentReplyMutation();

  const clickCreateCommentHandler = () => {
    if (!comment || !comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    createBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), content: comment });
    setComment('');
  };

  const clickDeleteCommentHandler = (boardCommentSeq: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq });
    }
  };

  const clickReplyCommentHandler = (boardCommentSeq: number) => {
    if (!reply || !reply.trim()) {
      alert('답글을 입력해주세요.');
      return;
    }

    createBoardCommentReplyMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq, content: reply });
    setIsReply(-1);
    setReply('');
  };

  const clickDeleteReplyCommentHandler = (params: { boardCommentSeq: number; boardCommentReplySeq: number }) => {
    const { boardCommentSeq, boardCommentReplySeq } = params;

    if (confirm('답글을 삭제하시겠습니까?')) {
      deleteBoardCommentReplyMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq, boardCommentReplySeq });
    }
  };

  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text value="댓글" size="lg" />
            <Text value={`${String(data?.total ?? 0)}개`} />
          </div>

          {isSuccess ? (
            data.total > 0 ? (
              <div className="flex flex-col gap-4">
                {data.boardComments.map((boardComment, idx) => (
                  <div>
                    <div
                      key={boardComment.boardCommentSeq}
                      className={`flex flex-col gap-2 cursor-pointer`}
                      onClick={() => {
                        setReply('');
                        setIsReply(isReply === boardComment.boardCommentSeq ? -1 : boardComment.boardCommentSeq);
                      }}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <Text value={boardComment.content} />

                        <div className="flex justify-between items-center gap-2">
                          <Text value={boardComment.user.nickname} />
                          <Text value={Dayjs.formatMMDD(boardComment.createdAt)} color="gray" />
                          {isAuth && boardComment.isMine && (
                            <DeleteSvg onClick={() => clickDeleteCommentHandler(boardComment.boardCommentSeq)} />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pl-4 flex flex-col gap-2">
                      {boardComment.boardCommentReplies.length > 0 &&
                        boardComment.boardCommentReplies.map((boardCommentReply) => (
                          <div className="flex justify-between" key={boardCommentReply.boardCommentReplySeq}>
                            <div className="flex items-center gap-2">
                              <BsArrowReturnRight color="#666666" />
                              <Text value={boardCommentReply.content} />
                            </div>

                            <div className="flex items-center gap-2">
                              <Text value={boardCommentReply.user.nickname} />
                              <Text value={Dayjs.formatMMDD(boardCommentReply.createdAt)} color="gray" />
                              {isAuth && boardCommentReply.isMine && (
                                <DeleteSvg
                                  onClick={() =>
                                    clickDeleteReplyCommentHandler({
                                      boardCommentSeq: boardComment.boardCommentSeq,
                                      boardCommentReplySeq: boardCommentReply.boardCommentReplySeq,
                                    })
                                  }
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="pl-4 flex">
                      {isReply === boardComment.boardCommentSeq && (
                        <Input
                          type="text"
                          title=""
                          name="reply"
                          value={reply}
                          onChange={(event) => setReply(event.target.value)}
                          placeholder="답글을 입력해주세요"
                          isPlus
                          plusClick={() => clickReplyCommentHandler(boardComment.boardCommentSeq)}
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

      {isAuth && (
        <Wrapper>
          <Input
            type="text"
            title="댓글 등록"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="댓글을 입력해주세요"
            isPlus
            plusClick={clickCreateCommentHandler}
          />
        </Wrapper>
      )}
    </>
  );
}
