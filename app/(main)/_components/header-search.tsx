'use client';

import { usePathname, useRouter } from 'next/navigation';

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const clickHandler = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    event.stopPropagation();

    router.push('/stock/search');
  };

  return pathname.includes('/stock') ? (
    <div className="flex justify-end">
      <p className="cursor-pointer" onClick={clickHandler}>
        종목 검색
      </p>
    </div>
  ) : null;
}
