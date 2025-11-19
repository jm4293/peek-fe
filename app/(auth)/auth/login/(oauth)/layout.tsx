import Loading from '@/app/(main)/loading';

export default function AuthOAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Loading />
    </div>
  );
}
