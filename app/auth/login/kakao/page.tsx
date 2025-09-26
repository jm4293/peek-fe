import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import KakaoOauth from './KakaoOauth';

export default function KakaoOauthPage() {
  return (
    <div className="text-center flex flex-col gap-4">
      <Text.HEADING text="카카오 로그인중..." />
      <LineSkeleton h={2} />
      <LineSkeleton h={2} />
      <KakaoOauth />
    </div>
  );
}
