'use client';

import { useDeviceLayout } from '@/hooks';
import { usePathname, useRouter } from 'next/navigation';

export const NavbarHome = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    router.push('/home');
  };

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 33 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="home"
      className="cursor-pointer"
      onClick={onClickHandler}>
      <path
        d="M14.566 3.37552C15.6832 2.43342 17.3168 2.43342 18.434 3.37554L27.434 10.965C28.1099 11.535 28.5 12.3742 28.5 13.2584V25.6715C28.5 26.9602 27.4553 28.0049 26.1667 28.0049H21.5C20.2113 28.0049 19.1667 26.9602 19.1667 25.6715V18.9954C19.1667 18.8114 19.0175 18.6621 18.8333 18.6621H14.1667C13.9825 18.6621 13.8333 18.8114 13.8333 18.9954V25.6715C13.8333 26.9602 12.7887 28.0049 11.5 28.0049H6.83333C5.54467 28.0049 4.5 26.9602 4.5 25.6715V13.2584C4.5 12.3742 4.89007 11.535 5.56603 10.965L14.566 3.37552ZM17.1447 4.90447C16.7723 4.59043 16.2277 4.59043 15.8553 4.90447L6.85535 12.494C6.63003 12.684 6.5 12.9637 6.5 13.2584V25.6715C6.5 25.8557 6.64924 26.0049 6.83333 26.0049H11.5C11.6841 26.0049 11.8333 25.8557 11.8333 25.6715V18.9954C11.8333 17.7067 12.878 16.6621 14.1667 16.6621H18.8333C20.122 16.6621 21.1667 17.7067 21.1667 18.9954V25.6715C21.1667 25.8557 21.3159 26.0049 21.5 26.0049H26.1667C26.3508 26.0049 26.5 25.8557 26.5 25.6715V13.2584C26.5 12.9637 26.37 12.684 26.1447 12.494L17.1447 4.90447Z"
        fill={pathName.includes('home') ? '#9470DC' : '#989898'}
      />
      <path
        d="M21.6836 55.748V60.3008H10.8027V55.748H21.6836ZM9.08008 54.6758V53.3574H15.4258V52.2852C12.6396 52.1709 11.0752 51.4238 11.084 50.0703C11.0752 48.6025 12.9473 47.8467 16.252 47.8379C19.5742 47.8467 21.4287 48.6025 21.4199 50.0703C21.4287 51.4238 19.8906 52.1709 17.0957 52.2852V53.3574H23.4414V54.6758H9.08008ZM9.81836 47.2754V45.9922H15.4258V44.5332H17.0957V45.9922H22.6328V47.2754H9.81836ZM12.4551 59.0176H20.0664V57.0312H12.4551V59.0176ZM12.8594 50.0703C12.8506 50.7822 14.0547 51.1602 16.252 51.1602C18.4668 51.1602 19.6445 50.7822 19.6445 50.0703C19.6445 49.3496 18.4668 48.998 16.252 48.9805C14.0547 48.998 12.8506 49.3496 12.8594 50.0703Z"
        fill="#989898"
      />
    </svg>
  );
};
