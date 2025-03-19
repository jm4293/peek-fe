import { BackSvg } from '@/asset/svg';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className=" h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-[600px] flex flex-col overflow-y-auto">
        <div className="w-full h-14  max-h-[56px] grid grid-cols-3 items-center">
          <BackSvg color="#000000" />
        </div>

        <div className="w-full mt-10">{children}</div>
      </div>
    </div>
  );
}
