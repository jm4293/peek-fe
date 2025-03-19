'use client';

import { Text } from '@/components/text';

export default function DeactivateLogin() {
  const onClickHandler = () => {
    console.log('Text clicked');
  };

  return (
    <div className="flex flex-col gap-4">
      <Text value="로그인이 필요합니다." color="#000000" />
      <Text value="로그인 하러가기" color="#000000" onClick={onClickHandler} />
    </div>
  );
}
