'use client';

import { usePathname } from 'next/navigation';
import { AlertSvg } from '@/asset/svg';

export default function HeaderAlert() {
  const pathname = usePathname();

  const clickHandler = () => {};

  return pathname.includes('/user') ? (
    <div className="flex justify-end">
      <AlertSvg onClick={clickHandler} />
    </div>
  ) : null;
}
