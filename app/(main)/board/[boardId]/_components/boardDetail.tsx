'use client';

import { useBoard, useBoardMutation, useMyInfo } from '@/hooks';
import { Dayjs } from '@/utils';
import { useRouter } from 'next/navigation';

import Button from '@/components/button/button';
import LineSkeleton from '@/components/skeleton/lineSkeleton';
import PreText from '@/components/text/preText';
import Text from '@/components/text/text';
import Wrapper from '@/components/wrapper/wrapper';

import { BoardTypeEnumList } from '@/constant/enum/board';

interface IProps {
  boardId: string;
  auth: boolean;
}

export default function BoardDetail(props: IProps) {
  const { boardId, auth } = props;

  const router = useRouter();

  const { data, isLoading, isSuccess } = useBoard(boardId);
  const { data: myInfo } = useMyInfo(auth);

  const { deleteBoardMutation } = useBoardMutation();

  const modifyClickHandler = () => {
    router.push(`/board/${boardId}/modify`);
  };

  const deleteClickHandler = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate(boardId);
    }
  };

  if (isLoading) {
    return <LineSkeleton />;
  }

  if (!isSuccess) {
    return <Wrapper>게시글을 찾을 수 없습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2">
            <Text value={data.userAccount.user.nickname} color="gray" />
            <Text value={Dayjs.formatMMDD(data.createdAt)} color="gray" />
          </div>

          <div className="col-span-5 flex flex-col gap-4">
            <div className="flex gap-2">
              <Text value={`[${BoardTypeEnumList[data.type].label}]`} color="gray" />
              <Text value={data.title} />
            </div>

            <div className="border-[1px]" />

            <PreText value={data.article.content} />
          </div>
        </div>

        {data.userAccount.email === myInfo?.email && (
          <div className="flex gap-4">
            <Button title="수정" onClick={modifyClickHandler} />
            <Button title="삭제" color="delete" onClick={deleteClickHandler} />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
