import { Footer } from './Footer';
import { Header } from './Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <main className="bg-theme-bg-main">{children}</main>
      <Footer />
      {/* <MobileMenuModal /> */}
    </div>
  );
}
