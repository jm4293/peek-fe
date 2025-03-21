import { BackSvg } from '@/asset/svg';
import { Suspense } from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="min-w-[320px] h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-[600px] px-4 flex flex-col overflow-y-auto">
        <div className="w-full h-14  max-h-[56px] grid grid-cols-3 items-center">
          <BackSvg />
        </div>

        <div className="w-full mt-10">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
