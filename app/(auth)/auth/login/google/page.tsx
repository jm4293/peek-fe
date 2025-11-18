import { LineSkeleton } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import GoogleOauth from './GoogleOauth';

export default function GoogleOauthPage() {
  return (
    <Wrapper.MAIN text="구글 로그인">
      <Wrapper.SECTION>
        {/* <LineSkeleton />
        <LineSkeleton /> */}
        <GoogleOauth />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
