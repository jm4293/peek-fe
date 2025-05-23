'use client';

interface IProps {
  title: string;
  style?: 'contained' | 'border';
  color?: 'base' | 'delete';
  type?: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const buttonColor = {
  base: 'bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3]',
  delete: 'bg-[#FF6666] hover:bg-[#FF9999] disabled:bg-[#FFCCCC]',
};

const buttonBorder = {
  base: 'border border-solid border-[#5A4FCF]',
  delete: 'border border-solid border-[#FF6666]',
};

export default function Button(props: IProps) {
  const { title, style = 'contained', color = 'base', type = 'button', onClick, className, disabled } = props;

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`w-full py-4 ${style === 'contained' ? buttonColor[color] : buttonBorder[color]} ${className}`}
      type={type}
      onClick={clickHandler}
      disabled={disabled}>
      <strong
        className={`text-base font-normal whitespace-nowrap ${style === 'contained' ? 'text-white' : color === 'base' ? 'text-[#5A4FCF]' : 'text-[#FF6666]'}`}>
        {title}
      </strong>
    </button>
  );
}
