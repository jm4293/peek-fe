import { EmailProvider } from './EmailProvider';

export default function FindPasswordLayout({ children }: { children: React.ReactNode }) {
  return <EmailProvider>{children}</EmailProvider>;
}
