'use client';

import { useBoardCommentListQuery, useBoardCommentMutation } from '@/hooks';
import Text from '@/components/text/text';
import { ImageTypeEnum } from '@/constant/enum';
import dayjs from 'dayjs';
import Image from '@/components/image/image';
import Input from '@/components/input/input';
import Skeleton from '@/components/skeleton/skeleton';
import { useState } from 'react';
import Button from '@/components/button/button';
import { DeleteSvg } from '@/asset/svg/deleteSvg';

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
    createBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), content: comment });
    setComment('');
  };

  const deleteClickHandler = (boardCommentSeq: number) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteBoardCommentMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq });
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-2">
        <Text value="댓글" size="lg" />
        <Text value={`${String(data?.total ?? 0)}개`} />
      </div>

      {data && data.total > 0 ? (
        <div className="flex flex-col gap-8">
          {data.boardComments.map((boardComment) => (
            <div key={boardComment.boardCommentSeq} className="flex flex-col gap-4 pb-4 border-b border-gray-300">
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  {/*<Image*/}
                  {/*  src={boardComment.user.thumbnail}*/}
                  {/*  type={ImageTypeEnum.THUMBNAIL}*/}
                  {/*  alt="board-comment-thumbnail"*/}
                  {/*/>*/}
                  <Text value={boardComment.user.nickname} />
                </div>
                {isAuth && boardComment.isMine && (
                  <DeleteSvg onClick={() => deleteClickHandler(boardComment.boardCommentSeq)} />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input type="text" title="내용" name="title" value={boardComment.content} placeholder="내용" />
                <Text value={dayjs(boardComment.createdAt).format('YY년 MM월 DD일 HH시 mm분')} className="text-end" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pb-4 border-b border-gray-300">
          <Text value="등록된 댓글이 없습니다." />
        </div>
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? <Skeleton /> : '더보기'}
        </button>
      )}

      {isAuth && (
        <>
          <Input
            type="text"
            title="댓글 등록"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={createClickHandler}
            placeholder="댓글을 입력해주세요"
          />
          <Button title="등록" onClick={createClickHandler} />
        </>
      )}
    </div>
  );
}
