import User from '@/app/(main)/user/User';

import { Text } from '@/components/text';

export default function UserPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원 정보" />
      <User />
    </div>
  );
}
