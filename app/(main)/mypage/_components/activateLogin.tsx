'use client';

import { Text } from '@/components/text';

export default function ActivateLogin() {
  const onClickHandler = () => {
    console.log('Text clicked');
  };

  return (
    <div className="flex flex-col gap-4">
      <Text value="로그인 중" color="#000000" />
    </div>
  );
}
