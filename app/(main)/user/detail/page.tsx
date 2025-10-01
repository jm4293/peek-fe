import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { myAccountAction } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

import NotAuth from '../NotAuth';
import UserWithdraw from './Withdraw';

export default async function UserDetailPage() {
  const { data: myInfo } = await myAccountAction();

  if (!myInfo) {
    return <NotAuth />;
  }

  return (
    <Wrapper.MAIN text="유저 상세">
      <div className="flex flex-col gap-2">
        <Wrapper.SECTION text="상세">
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH text="가입경로:" />
            <Text.HEADING text={`${userAccountTypeDescription[myInfo.userAccountType]}`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH text="이메일:" />
            <Text.HEADING text={`${myInfo.email}`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH text="이름:" />
            <Text.HEADING text={`${myInfo.user.name}`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.PARAGRAPH text="닉네임:" />
            <Text.HEADING text={`${myInfo.user.nickname}`} />
          </div>
          {/* <div className="flex items-end gap-2">
            <Text.PARAGRAPH text="생년월일:" />
            <Text.HEADING text={`${my.user.birth || '-'}`} />
          </div> */}
        </Wrapper.SECTION>

        <Wrapper.SECTION text="변경">
          <Link href="/user/modify" className="flex items-center justify-between">
            <Text.HEADING text="유저정보 변경" />
            <ChevronRight />
          </Link>
          <Link href="/user/modify/password" className="flex items-center justify-between">
            <Text.HEADING text="비밀번호 변경" />
            <ChevronRight />
          </Link>
        </Wrapper.SECTION>

        <UserWithdraw />
      </div>
    </Wrapper.MAIN>
  );
}
