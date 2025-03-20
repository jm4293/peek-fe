'use client';

import { useDeviceLayout } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';

export const NavbarStock = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    router.push('/stock');
  };

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 33 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="stock"
      className="cursor-pointer"
      onClick={onClickHandler}>
      <path
        d="M15.0648 53.6211V54.9746H8.66633V60.4766H7.03156V54.9746H0.703438V53.6211H15.0648ZM1.51203 51.1074C4.44758 50.7031 6.89094 48.9541 6.94367 47.0117H2.03938V45.6758H13.7113V47.0117H8.84211C8.86848 48.9541 11.2943 50.7031 14.2738 51.1074L13.6585 52.4258C11.0745 52.0215 8.84211 50.7471 7.8841 48.9541C6.9173 50.7471 4.69367 52.0215 2.14484 52.4258L1.51203 51.1074ZM21.6305 47.0117C21.6218 49.1914 23.0983 51.1865 25.5329 51.9863L24.6891 53.3047C22.861 52.6719 21.4987 51.3887 20.7868 49.7451C20.0837 51.5029 18.695 52.9004 16.8317 53.5684L15.988 52.2676C18.4401 51.3975 19.9167 49.2617 19.9255 47.0117V45.5H21.6305V47.0117ZM18.2907 56.3105V54.957H28.9606V60.4941H27.2907V56.3105H18.2907ZM27.2907 54.2012V44.7441H28.9606V54.2012H27.2907Z"
        fill={pathName.includes('stock') ? '#9470DC' : '#989898'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.6712 6.35721C26.8619 6.58456 26.9418 6.88489 26.8893 7.17699L26.1982 11.0205C26.1004 11.564 25.5805 11.9254 25.037 11.8277C24.4934 11.7299 24.132 11.21 24.2297 10.6665L24.4368 9.51497L15.0616 15.8775C14.7099 16.1161 14.2459 16.1064 13.9045 15.8534L10.4663 13.3047L6.55022 15.885C6.08905 16.1889 5.46885 16.0614 5.16498 15.6002C4.86111 15.1391 4.98862 14.5189 5.44979 14.215L9.94979 11.2499C10.3005 11.0188 10.7581 11.0315 11.0955 11.2815L14.5255 13.8242L23.0935 8.00955L22.0034 8.01325C21.4511 8.01512 21.0019 7.56893 21 7.01665C20.9981 6.46436 21.4443 6.01513 21.9966 6.01326L25.9017 6.00001C26.1985 5.999 26.4804 6.12987 26.6712 6.35721Z"
        fill={pathName.includes('stock') ? '#9470DC' : '#989898'}
      />
      <rect x="6" y="20.0849" width="3" height="6" rx="1" fill={pathName.includes('stock') ? '#9470DC' : '#989898'} />
      <rect
        x="11.6"
        y="18.0849"
        width="3"
        height="8"
        rx="1"
        fill={pathName.includes('stock') ? '#9470DC' : '#989898'}
      />
      <rect
        x="17.2"
        y="16.0849"
        width="3"
        height="10"
        rx="1"
        fill={pathName.includes('stock') ? '#9470DC' : '#989898'}
      />
      <rect
        x="22.8"
        y="14.0849"
        width="3"
        height="12"
        rx="1"
        fill={pathName.includes('stock') ? '#9470DC' : '#989898'}
      />
    </svg>
  );
};
