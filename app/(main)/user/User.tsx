'use client';

import { validateHeaderName } from 'http';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Thumbnail } from '@/components/image';
import { Datalist } from '@/components/select';
import Select from '@/components/select/select';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { IUserAccountModel } from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

interface IProps {
  myInfo: IUserAccountModel;
}

export default function User(props: IProps) {
  const { myInfo } = props;

  const [datalistValue, setDatalistValue] = useState('');

  return (
    <Wrapper.SECTION>
      <Select
        title="언어"
        name="language"
        options={[
          { value: 'korean', label: '한국어' },
          { value: 'english', label: 'English' },
          { value: 'japanese', label: '日本語' },
        ]}
      />

      <Datalist
        title="국가"
        name="country"
        options={[
          { value: 'kr', label: '대한민국' },
          { value: 'us', label: '미국' },
          { value: 'jp', label: '일본' },
        ]}
        value={datalistValue}
        onChange={(e) => setDatalistValue(e.target.value)}
      />

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
