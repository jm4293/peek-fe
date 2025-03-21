'use server';

interface IProps {
  title: string;
  type: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
}

export default async function ButtonServer(props: IProps) {
  const { title, type, className, disabled } = props;

  return (
    <button
      className={`w-full bg-[#5A4FCF] hover:bg-[#786DE8] disabled:bg-[#A7A3D3] py-4 ${className}`}
      type={type}
      disabled={disabled}>
      <p className="text-white text-base font-normal whitespace-nowrap">{title}</p>
    </button>
  );
}
