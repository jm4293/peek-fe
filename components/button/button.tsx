'use client';

interface IProps {
  title: string;
  color?: 'base' | 'delete';
  type?: 'submit' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
}

const buttonColor = {
  base: 'bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3]',
  delete: 'bg-[#FF6666] hover:bg-[#FF9999] disabled:bg-[#FFCCCC]',
};

export default function Button(props: IProps) {
  const { title, color = 'base', type = 'button', onClick, className, disabled } = props;

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={`w-full ${buttonColor[color]} py-4 ${className}`}
      type={type}
      onClick={clickHandler}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{title}</p>
    </button>
  );
}
