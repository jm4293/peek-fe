import { LineSkeleton } from '@/components/skeleton';
import { Wrapper } from '@/components/wrapper';

import NaverOauth from './NaverOauth';

export default function NaverOauthPage() {
  return (
    <Wrapper.MAIN text="네이버 로그인">
      <Wrapper.SECTION>
        {/* <LineSkeleton />
        <LineSkeleton /> */}
        <NaverOauth />
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
