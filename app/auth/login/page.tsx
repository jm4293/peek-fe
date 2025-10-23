import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { ButtonGoogle } from './ButtonGoogle';
import { ButtonKakao } from './ButtonKakao';
import { ButtonNaver } from './ButtonNaver';

interface IProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function LoginPage(props: IProps) {
  const { email } = await props.searchParams;

  // return (
  //   <Wrapper.MAIN text="로그인">
  //     <Login email={email} />
  //   </Wrapper.MAIN>
  // );

  return (
    <Wrapper.MAIN text="로그인">
      <div className="flex flex-col items-center gap-2">
        <Text.HEADING text="안녕하세요!" />
        <Text.HEADING text="소셜 계정으로 간편하게 로그인하세요." />
      </div>

      <div className="flex flex-col gap-2">
        <Wrapper.SECTION>
          <div className="w-[180px] m-auto">
            <ButtonGoogle />
          </div>
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <div className="w-[180px] m-auto">
            <ButtonNaver />
          </div>
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <div className="w-[180px] m-auto">
            <ButtonKakao />
          </div>
        </Wrapper.SECTION>
      </div>
    </Wrapper.MAIN>
  );
}
