// import { Wrapper } from '@/components/wrapper';
// import { LoginClient } from './LoginClient';
// interface IProps {
//   searchParams: Promise<{ email?: string }>;
// }
// export default async function LoginPage(props: IProps) {
//   const { email } = await props.searchParams;
//   return (
//     <Wrapper.MAIN text="로그인">
//       <LoginClient />
//     </Wrapper.MAIN>
//   );
// }
import { Wrapper } from '@/components/wrapper';

import { LoginOAuth } from './LoginOAuth';

export default function LoginPage() {
  return (
    <Wrapper.MAIN text="로그인">
      <LoginOAuth />
    </Wrapper.MAIN>
  );
}
