interface IProps {
  isCheck: boolean;
  onClick: () => void;
  id?: string;
}

export const CheckBoxSvg = (props: IProps) => {
  const { isCheck, onClick, id } = props;

  const onClickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  return (
    <svg
      id={id}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClickHandler}
      className="cursor-pointer">
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="1.5"
        fill={isCheck ? '#D1C4E9' : 'white'}
        stroke={isCheck ? '#388E3C' : '#757575'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2803 5.21967C12.5732 5.51256 12.5732 5.98744 12.2803 6.28033L6.78033 11.7803C6.48744 12.0732 6.01256 12.0732 5.71967 11.7803L3.21967 9.28033C2.92678 8.98744 2.92678 8.51256 3.21967 8.21967C3.51256 7.92678 3.98744 7.92678 4.28033 8.21967L6.25 10.1893L11.2197 5.21967C11.5126 4.92678 11.9874 4.92678 12.2803 5.21967Z"
        fill={isCheck ? '#388E3C' : '#757575'}
      />
    </svg>
  );
};
