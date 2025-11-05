// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// import { Button } from '@/components/button';
// import { Input } from '@/components/input';
// import { Text } from '@/components/text';
// import { Wrapper } from '@/components/wrapper';

// import { useInput } from '@/hooks/input';
// import { useToast } from '@/hooks/modal';

// import { ILoginEmailDto, useAuthMutation } from '@/services/auth';

// import { ButtonGoogle } from './ButtonGoogle';
// import { ButtonKakao } from './ButtonKakao';
// import { ButtonNaver } from './ButtonNaver';

// interface IProps {
//   email?: string;
// }

// const initialFormData: ILoginEmailDto = {
//   email: '',
//   password: '',
// };

// export default function Login(props: IProps) {
//   const { email } = props;

//   const { openToast } = useToast();

//   const [isError, setIsError] = useState<boolean>(false);

//   const { signInMutation } = useAuthMutation();
//   const [value, onChange, init] = useInput({ ...initialFormData });

//   const clickHandler = () => {
//     if (!value.email || !value.password) {
//       setIsError(true);
//       openToast({ type: 'error', message: '이메일과 비밀번호를 입력해주세요.' });
//       return;
//     }

//     setIsError(false);

//     signInMutation.mutate({
//       email: value.email,
//       password: value.password,
//     });
//   };

//   const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       clickHandler();
//     }
//   };

//   useEffect(() => {
//     if (email) {
//       init((prev) => ({ ...prev, email }));
//     }
//   }, [email]);

//   return (
//     <Wrapper.SECTION>
//       <div className="flex flex-col gap-12">
//         <div className="w-full flex flex-col gap-4">
//           <Input
//             title="이메일"
//             name="email"
//             value={value.email}
//             onChange={onChange}
//             placeholder="이메일"
//             isError={isError}
//             required
//           />
//           <Input
//             type="password"
//             title="비밀번호"
//             name="password"
//             value={value.password}
//             onChange={onChange}
//             placeholder="비밀번호"
//             onKeyDown={keyDownHandler}
//             isError={isError}
//             required
//           />
//         </div>

//         <Button.CONTAINER text="로그인" onClick={clickHandler} disabled={signInMutation.isPending} />
//       </div>

//       <div className="flex justify-center items-center gap-4">
//         <Link href="">
//           <Text.HEADING text="아이디 찾기" />
//         </Link>
//         <span>|</span>
//         <Link href="/auth/find/password">
//           <Text.HEADING text="비밀번호 찾기" />
//         </Link>
//         <span>|</span>
//         <Link href="/auth/register">
//           <Text.HEADING text="회원가입" />
//         </Link>
//       </div>

//       <div className="flex justify-center items-center mt-8 gap-8">
//         <ButtonKakao />
//         <ButtonNaver />
//         <ButtonGoogle />
//       </div>
//     </Wrapper.SECTION>
//   );
// }
