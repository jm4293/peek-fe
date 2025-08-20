import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAction } from '@/services/user';

import NotAuth from '../NotAuth';
import UserWithdraw from './Withdraw';

export default async function UserDetailPage() {
  const { data: my } = await myAction();

  if (!my) {
    return <NotAuth />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원 상세" />

      <div className="flex flex-col gap-2">
        <Wrapper>
          <Text.HEADING text={`이메일: ${my.email}`} />
          <Text.HEADING text={`닉네임: ${my.user.nickname}`} />
          <Text.HEADING text={`이름: ${my.user.name}`} />
          <Text.HEADING text={`생년월일: ${my.user.birth || '-'}`} />
        </Wrapper>

        <Wrapper>
          <Link href="" className="flex items-center justify-between">
            <Text.PARAGRAPH text="회원 정보 변경" />
            <MdOutlineArrowForwardIos />
          </Link>
          <Link href="" className="flex items-center justify-between">
            <Text.PARAGRAPH text="비밀번호 변경" />
            <MdOutlineArrowForwardIos />
          </Link>
        </Wrapper>

        <UserWithdraw />
      </div>
    </div>
  );
}
