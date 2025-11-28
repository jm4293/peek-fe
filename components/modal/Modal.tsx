'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useModal } from '@/hooks/modal';

import { Button } from '../button';
import { Text } from '../text';

export const Modal = () => {
  const modalRoot = useRef<Element | null>(null);
  const { modal, closeModal } = useModal();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (modal.onCancel) {
      modal.onCancel();
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (modal.onConfirm) {
      modal.onConfirm();
    }
  };

  useEffect(() => {
    modalRoot.current = document.getElementById('modal-root');
  }, []);

  if (!modal.visible || !modalRoot.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 w-screen h-screen bg-black/40 flex items-center justify-center z-[1000]"
      onClick={closeModal}>
      <div
        className="rounded-2xl shadow-2xl p-6 min-w-[320px] flex flex-col backdrop-blur-xl bg-white dark:bg-theme-bg-section/70 border border-white/20 dark:border-white/10 text-theme-txt-default"
        onClick={(e) => e.stopPropagation()}>
        <Text.TITLE text={modal.title} className="mb-4" />

        <div className="mb-6">
          {typeof modal.content === 'string' ? <Text.SUBTITLE text={modal.content} /> : modal.content}
        </div>

        <div className="flex gap-2">
          {modal.onCancel && <Button.OUTLINE text={modal.cancelText || '취소'} onClick={(e) => handleCancel(e)} />}
          {modal.onConfirm && <Button.CONTAINER text={modal.confirmText || '확인'} onClick={(e) => handleConfirm(e)} />}
        </div>
      </div>
    </div>,
    modalRoot.current,
  );
};
