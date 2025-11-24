'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { UserAccountModel, useUserMutation } from '@/services/user';
import { UpdateUserInfoReq, updateUserInfoReqSchema } from '@/services/user/type';

interface Props {
  userInfo: UserAccountModel;
}

export default function ModifyUser(props: Props) {
  const { userInfo } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInfoReq>({
    resolver: zodResolver(updateUserInfoReqSchema),
    defaultValues: {
      nickname: userInfo.user.nickname,
    },
  });

  const { updateUserMutation } = useUserMutation();

  const onSubmit = async (formData: UpdateUserInfoReq) => {
    updateUserMutation.mutate({ ...formData });
  };

  return (
    <Wrapper.SECTION>
      <form className="flex flex-col gap-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Input label="이메일" name="email" placeholder="이메일" defaultValue={userInfo.email} disabled />

          <div className="flex flex-col gap-2">
            <Input
              label="이름"
              name="name"
              placeholder="이름"
              defaultValue={userInfo.user.name}
              disabled
              helperText="이름은 변경할 수 없습니다."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Input label="닉네임" placeholder="닉네임" {...register('nickname')} helperText="공개되는 정보입니다." />
            {errors.nickname && <Text.PARAGRAPH text={errors.nickname.message} color="red" />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link href="/user/detail">
            <Button.OUTLINE text="뒤로가기" />
          </Link>
          <Button.CONTAINER type="submit" text="변경하기" disabled={updateUserMutation.isPending} />
        </div>
      </form>
    </Wrapper.SECTION>
  );
}
