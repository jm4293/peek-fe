'use client';

interface IProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ButtonClient(props: IProps) {
  const { title, onClick, className, disabled } = props;

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`w-full bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] py-4 ${className}`}
      onClick={onClickHandler}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{title}</p>
    </button>
  );
}
