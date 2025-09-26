import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import NaverOauth from './NaverOauth';

export default function NaverOauthPage() {
  return (
    <div className="text-center flex flex-col gap-4">
      <Text.HEADING text="네이버 로그인중..." />
      <LineSkeleton h={2} />
      <LineSkeleton h={2} />
      <NaverOauth />
    </div>
  );
}
