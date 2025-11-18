import { LineSkeleton } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import KakaoOauth from './KakaoOauth';

export default function KakaoOauthPage() {
  return (
    <Wrapper.MAIN text="카카오 로그인">
      <Wrapper.SECTION>
        {/* <LineSkeleton />
        <LineSkeleton /> */}
        <KakaoOauth />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
