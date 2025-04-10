'use client';

import { useBoardCommentListQuery, useBoardCommentMutation } from '@/hooks';
import Text from '@/components/text/text';
import Input from '@/components/input/input';
import { useState } from 'react';
import { DeleteSvg } from '@/asset/svg/deleteSvg';
import Wrapper from '@/components/wrapper/wrapper';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import { Dayjs } from '@/utils';

interface IProps {
  boardSeq: string;
  isAuth: boolean;
}

export default function BoardComment(props: IProps) {
  const { boardSeq, isAuth } = props;

  const [comment, setComment] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isSuccess } = useBoardCommentListQuery({
    boardSeq: Number(boardSeq),
  });

  const { createBoardCommentMutation, deleteBoardCommentMutation } = useBoardCommentMutation();

  const createClickHandler = () => {
    if (!comment || !comment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    createBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), content: comment });
    setComment('');
  };

  const deleteClickHandler = (boardCommentSeq: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq });
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
                  <div
                    key={boardComment.boardCommentSeq}
                    className={`flex flex-col gap-2 ${data.total !== idx + 1 ? 'border-b border-gray-300 pb-2' : ''}`}>
                    <div className="flex justify-between items-center gap-2">
                      <Text value={boardComment.user.nickname} />
                      <Text value={Dayjs.formatMMDD(boardComment.createdAt)} color="gray" />
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <Text value={boardComment.content} />

                      {isAuth && boardComment.isMine && (
                        <DeleteSvg onClick={() => deleteClickHandler(boardComment.boardCommentSeq)} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text value="등록된 댓글이 없습니다." />
            )
          ) : (
            <LineSkeleton text="로딩중..." />
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
            onKeyDown={createClickHandler}
            placeholder="댓글을 입력해주세요"
            isPlus
            plusClick={createClickHandler}
          />
        </Wrapper>
      )}
    </>
  );
}
