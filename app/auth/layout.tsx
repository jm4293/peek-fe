import { BackSvg } from '@/asset/svg';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="h-screen flex justify-center overflow-hidden">
      <div className="w-[720px] px-4 overflow-y-auto bg-white">
        <div className="w-full py-4">
          <BackSvg />
        </div>

        <div className="w-full mb-8">{children}</div>
      </div>
    </div>
  );
}
