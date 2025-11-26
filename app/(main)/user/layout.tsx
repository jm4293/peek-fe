import { NewsButton, NewsPanel } from '@/components/news';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsButton />
      <NewsPanel />
    </>
  );
}
