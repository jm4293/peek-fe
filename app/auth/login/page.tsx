import Login from '@/app/auth/login/Login';

import { Wrapper } from '@/components/wrapper';

interface IProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function LoginPage(props: IProps) {
  const { email } = await props.searchParams;

  return (
    <Wrapper.MAIN text="로그인">
      <Login email={email} />
    </Wrapper.MAIN>
  );
}
