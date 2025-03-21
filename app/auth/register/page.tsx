import { registerUser } from '@/app/auth/register/actions';
import InputServer from '@/components/input/inputServer';
import ButtonServer from '@/components/button/buttonServer';

export default function Page() {
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  // event.preventDefault();
  // const formData = new FormData(event.currentTarget);
  //
  // const email = formData.get('email') as string;
  // const password = formData.get('password') as string;
  // const passwordConfirm = formData.get('passwordConfirm') as string;
  // const nickname = formData.get('nickname') as string;
  // const name = formData.get('name') as string;
  // const birthdate = formData.get('birthdate') as string;
  //
  // if (!email || !password || !nickname || !name) {
  //   alert('모든 필드를 입력해주세요.');
  //   return;
  // }

  // await registerUser(formData);
  // };

  return (
    <form className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-2">
        <div className="w-full grid grid-cols-6 items-center gap-2">
          <div className="col-span-4">
            <InputServer type="email" title="이메일" name="email" placeholder="이메일 주소" />
          </div>
          <div className="col-span-2 mt-9">
            <ButtonServer title="중복확인" type="button" />
          </div>
        </div>
        <InputServer type="password" title="비밀번호" name="password" placeholder="비밀번호" />
        <InputServer type="password" title="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" />
      </div>

      <div className="flex flex-col gap-2">
        <InputServer type="text" title="닉네임" name="nickname" placeholder="닉네임" />
        <InputServer type="text" title="이름" name="name" placeholder="이름" />
        <InputServer type="text" title="생년월일 8자리" name="birthdate" placeholder="생년월일 8자리" optional />
      </div>

      <div className="flex flex-col gap-4">
        <ButtonServer type="submit" title="회원가입" />
        <ButtonServer type="button" title="뒤로가기" />
      </div>
    </form>
  );
}
