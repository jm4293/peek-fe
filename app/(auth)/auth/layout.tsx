import { AnimatedBackground } from '@/components/canvas';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-theme-bg-main overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
