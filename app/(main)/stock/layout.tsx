import { StockCodeProvider } from './StockCodeProvider';

export default function StockLayout({ children }: { children: React.ReactNode }) {
  return <StockCodeProvider>{children}</StockCodeProvider>;
}
