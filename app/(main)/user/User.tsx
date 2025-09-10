import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

interface IProps {
  my: IUserAccountModel;
}

export default function User(props: IProps) {
  const { my } = props;

  return (
    <Wrapper.SECTION>
      <Link href="/user/detail" className="py-1 flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <Thumbnail thumbnail={my.user.thumbnail} />
          <div>
            <Text.HEADING text={my.user.nickname} />
            <div className="flex items-center gap-2">
              <Text.PARAGRAPH text={userAccountTypeDescription[my.userAccountType]} />
              <span>|</span>
              <Text.PARAGRAPH text={my.email} />
            </div>
          </div>
        </div>
        <ChevronRight />
      </Link>
    </Wrapper.SECTION>
  );
}
