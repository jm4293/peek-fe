import { useAtom } from 'jotai';

import { ModalState, modalAtom } from '@/stores/modal.atom';

export const useModal = () => {
  const [modal, setModal] = useAtom(modalAtom);

  const openModal = (params: Omit<ModalState, 'visible'>) => {
    const { title = '알림', content, onConfirm, confirmText, onCancel, cancelText } = params;

    setModal({
      visible: true,
      title: title,
      content,
      onConfirm,
      confirmText,
      onCancel,
      cancelText,
    });
  };

  const closeModal = () => {
    setModal({
      visible: false,
      title: '',
      content: '',
      onConfirm: undefined,
      confirmText: undefined,
      onCancel: undefined,
      cancelText: undefined,
    });
  };

  return { modal, openModal, closeModal };
};
