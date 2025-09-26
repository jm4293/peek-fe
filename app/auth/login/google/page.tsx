import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import GoogleOauth from './GoogleOauth';

export default function GoogleOauthPage() {
  return (
    <div className="text-center flex flex-col gap-4">
      <Text.HEADING text="구글 로그인중..." />
      <LineSkeleton h={2} />
      <LineSkeleton h={2} />
      <GoogleOauth />
    </div>
  );
}
