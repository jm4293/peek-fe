import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Text } from '@/components/text';
import { InternalErrorView, NotAuthView, Wrapper } from '@/components/wrapper';

import { getUserInfo } from '@/services/user';

import { ERROR_CODE } from '@/shared/constant/error-code/error-code';
import { userAccountTypeDescription } from '@/shared/enum/user';

import UserWithdraw from './Withdraw';

export default async function UserDetailPage() {
  const { success, data, code } = await getUserInfo();

  if (!success && code === ERROR_CODE.UNAUTHORIZED) {
    return <NotAuthView text="유저 상세" />;
  }

  if (!data) {
    return (
      <Wrapper.MAIN text="유저 상세">
        <InternalErrorView />
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="유저 상세">
      <Wrapper.SECTION text="상세">
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="가입경로:" />
          <Text.HEADING text={`${userAccountTypeDescription[data.userAccountType]}`} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="이메일:" />
          <Text.HEADING text={`${data.email}`} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="이름:" />
          <Text.HEADING text={`${data.user.name}`} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="닉네임:" />
          <Text.HEADING text={`${data.user.nickname}`} />
        </div>
        {/* <div className="flex items-end gap-2">
            <Text.PARAGRAPH text="생년월일:" />
            <Text.HEADING text={`${my.user.birth || '-'}`} />
          </div> */}
      </Wrapper.SECTION>

      <Wrapper.SECTION text="변경">
        <Link href="/user/detail/modify" className="flex items-center justify-between">
          <Text.HEADING text="유저정보 변경" />
          <ChevronRight />
        </Link>
        {/* <Link href="/user/detail/modify/password" className="flex items-center justify-between">
            <Text.HEADING text="비밀번호 변경" />
            <ChevronRight />
          </Link> */}
      </Wrapper.SECTION>

      <UserWithdraw />
    </Wrapper.MAIN>
  );
}
