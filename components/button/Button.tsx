'use client';

interface IProps {
  text: string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const CONTAINER = (props: IProps) => {
  const { text, type = 'button', onClick, className, disabled } = props;

  return (
    <button
      className={`w-full px-2 py-4 bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <strong className="text-base font-normal text-white whitespace-nowrap hover:text-white disabled:text-[#A7A3D3] disabled:cursor-not-allowed">
        {text}
      </strong>
    </button>
  );
};

const OUTLINE = (props: IProps) => {
  const { text, type = 'button', onClick, className, disabled } = props;

  return (
    <button
      className={`w-full px-2 py-4 border border-solid border-[#5A4FCF] bg-white hover:bg-[#F0F0FF] disabled:bg-[#F0F0FF] ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <strong className="text-base font-normal text-[#5A4FCF] whitespace-nowrap hover:text-[#5A4FCF] disabled:text-[#A7A3D3] disabled:cursor-not-allowed">
        {text}
      </strong>
    </button>
  );
};

export const Button = {
  CONTAINER,
  OUTLINE,
};
