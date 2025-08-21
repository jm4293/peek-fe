'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export const BackButton = () => {
  const router = useRouter();

  return <IoIosArrowBack size={24} onClick={() => router.back()} />;
};
