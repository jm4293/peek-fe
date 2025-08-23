'use client';

interface IProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Clickable = (props: IProps) => {
  const { className, onClick, children } = props;

  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
