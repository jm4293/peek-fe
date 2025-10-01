import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

interface IProps {
  myInfo: IUserAccountModel;
}

export default function User(props: IProps) {
  const { myInfo } = props;

  return (
    <Wrapper.SECTION>
      <Link href="/user/detail" className="py-1 flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <Thumbnail thumbnail={myInfo.user.thumbnail} size={32} />
          <div>
            <Text.HEADING text={myInfo.user.nickname} />
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={userAccountTypeDescription[myInfo.userAccountType]} />
              <span>|</span>
              <Text.PARAGRAPH text={myInfo.email} />
            </div>
          </div>
        </div>
        <ChevronRight />
      </Link>
    </Wrapper.SECTION>
  );
}
