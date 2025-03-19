import { useDeviceLayout } from '@/hooks/useDeviceLayout';

interface IProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button = (props: IProps) => {
  const { className, text, onClick, disabled } = props;

  const { isMobile } = useDeviceLayout();

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`w-full bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] ${isMobile ? 'py-4' : 'py-5'} ${className}`}
      name={text}
      onClick={onClickHandler}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{text}</p>
    </button>
  );
};
