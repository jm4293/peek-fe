'use client';

import { useState } from 'react';

import { useModal } from '@/hooks/modal';

import { useInquiryMutation } from '@/services/inquiry/mutation/useInquiryMutation';

export default function InquiryRegister() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const { openModal, closeModal } = useModal();

  const { createInquiryMutation } = useInquiryMutation();

  const clickHandler = () => {
    if (!title || !title.trim()) {
      openModal({ content: '제목을 입력해주세요.', onConfirm: closeModal });
      return;
    }

    if (!content || !content.trim()) {
      openModal({ content: '내용을 입력해주세요.', onConfirm: closeModal });
      return;
    }
  };

  return <></>;
}
