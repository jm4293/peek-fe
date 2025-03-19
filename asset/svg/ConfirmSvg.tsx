'use client';

import { useDeviceLayout } from '@/hooks';

interface IProps {
  color: string;
  onClick?: () => void;
  className?: string;
}

export const ConfirmSvg = (props: IProps) => {
  const { color, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <svg
      width={isMobile ? '26' : '34'}
      height={isMobile ? '26' : '34'}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClickHandler}>
      <path
        d="M9.96037 16.3728L10.0725 16.4696C10.464 16.7601 11.0196 16.7279 11.3746 16.3728L15.0004 12.7471L15.0008 21.6667L15.01 21.8024C15.0761 22.2904 15.4945 22.6667 16.0008 22.6667L16.1365 22.6575C16.6247 22.5913 17.0008 22.1729 17.0008 21.6667L17.0004 12.7444L20.628 16.3736L20.7401 16.4705C21.1316 16.7611 21.6871 16.7288 22.0423 16.3739C22.4328 15.9835 22.4329 15.3503 22.0425 14.9597L16.7092 9.62432L16.5969 9.52747C16.2055 9.2369 15.6499 9.26912 15.2948 9.62419L9.96037 14.9587L9.86354 15.0708C9.57308 15.4623 9.60534 16.0177 9.96037 16.3728ZM29.3347 15.9993C29.3347 8.63555 23.3651 2.66602 16.0013 2.66602C8.6375 2.66602 2.66797 8.63555 2.66797 15.9993C2.66797 23.3631 8.6375 29.3327 16.0013 29.3327C23.3651 29.3327 29.3347 23.3631 29.3347 15.9993ZM4.66797 15.9993C4.66797 9.74012 9.74208 4.66602 16.0013 4.66602C22.2605 4.66602 27.3347 9.74012 27.3347 15.9993C27.3347 22.2585 22.2605 27.3327 16.0013 27.3327C9.74208 27.3327 4.66797 22.2585 4.66797 15.9993Z"
        fill={color}
      />
    </svg>
  );
};
