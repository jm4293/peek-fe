import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

interface IProps {
  userInfo: IUserAccountModel;
}

export default function User(props: IProps) {
  const { userInfo } = props;

  return (
    <Wrapper.SECTION>
      <Link href="/user/detail" className="py-1 flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <Thumbnail thumbnail={userInfo.user.thumbnail} size={32} />
          <div>
            <Text.HEADING text={userInfo.user.nickname} />
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={userAccountTypeDescription[userInfo.userAccountType]} />
              <span>|</span>
              <Text.PARAGRAPH text={userInfo.email} />
            </div>
          </div>
        </div>
        <ChevronRight />
      </Link>
    </Wrapper.SECTION>
  );
}
