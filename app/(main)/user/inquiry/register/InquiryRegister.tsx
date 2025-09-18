'use client';

import { ValidationUtil } from '@/utils';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Wrapper } from '@/components/wrapper';

import { useInput } from '@/hooks/input';
import { useModal, useToast } from '@/hooks/modal';

import { ICreateInquiryDto } from '@/services/inquiry';
import { useInquiryMutation } from '@/services/inquiry/mutation/useInquiryMutation';

const initialFormData: ICreateInquiryDto = {
  title: '',
  content: '',
  images: [],
};

export default function InquiryRegister() {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [value, onChange, setValue] = useInput<ICreateInquiryDto>({ ...initialFormData });

  const { openModal, closeModal } = useModal();
  const { toast, closeToast, openToast } = useToast();

  const { createInquiryMutation } = useInquiryMutation();

  const clickHandler = () => {
    const isValid = ValidationUtil.create()
      .required(value.title, '제목을 입력해주세요.')
      .required(value.content, '내용을 입력해주세요.')
      .minLength(value.title, 1, '제목은 최소 1글자 이상이어야 합니다')
      .minLength(value.content, 10, '내용은 최소 10글자 이상이어야 합니다')
      .validate((errorMessage) => {
        openModal({ content: errorMessage, onConfirm: closeModal });
      });

    if (!isValid) {
      return;
    }
  };

  return (
    <Wrapper.SECTION>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Input title="제목" name="title" value={value.title} onChange={onChange} placeholder="제목" required />
          <Textarea title="내용" name="content" value={value.content} onChange={onChange} placeholder="내용" required />
        </div>

        <div className="w-full flex gap-2">
          <Button.OUTLINE
            text="뒤로가기"
            // onClick={() => {
            //   router.push('/auth/login');
            // }}
          />
          <Button.CONTAINER
            text="등록하기"
            onClick={clickHandler}
            // disabled={isPending}
          />
        </div>
      </div>
    </Wrapper.SECTION>
  );
}
