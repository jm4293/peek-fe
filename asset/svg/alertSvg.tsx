interface IProps {
  onClick: () => void;
}

export const AlertSvg = (props: IProps) => {
  const { onClick } = props;

  const clickHandler = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();

    onClick();
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={clickHandler}>
      <path
        d="M12 5C10 5 6 6.2 6 11V15L4 17H9M12 5C16.8 5 18 9 18 11V15L20 17H15M12 5V3M9 17V18C9 19 9.6 21 12 21C14.4 21 15 19 15 18V17M9 17H15"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
};
