interface IProps {
  title: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: IProps) {
  const { title, type = 'button', onClick, className, disabled } = props;

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`w-full bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] py-4 ${className}`}
      type={type}
      onClick={onClickHandler}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{title}</p>
    </button>
  );
}
