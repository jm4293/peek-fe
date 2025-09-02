import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/app/providers';

import { Modal, Toast } from '@/components/modal';

import MessagingConfig from '@/lib/firebase/messaging.config';
import { NetworkError } from '@/lib/network-error';
import QueryProvider from '@/lib/react-query/react-query.config';

import { myAction } from '@/services/user';

import { Header } from './Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'PEEK',
  description: '주식 정보와 커뮤니티 서비스',
  keywords: '주식, 실시간, stock, 커뮤니티',
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'uJW_8OCDzvQJqQgfYwsslu44VsruK8gm346PCn8lVKE',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'PEEK',
    images: {
      url: 'https://stock.peek.run/peek-logo.png',
    },
    description: '주식 정보와 커뮤니티 서비스',
    url: 'https://stock.peek.run',
    type: 'website',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: my } = await myAction();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NetworkError>
            <QueryProvider>
              <MessagingConfig>
                <div className="relative min-h-screen">
                  <Header my={my} />
                  <main className="bg-theme-bg-main">
                    <div className="m-auto max-w-screen-xl">{children}</div>
                  </main>
                </div>
              </MessagingConfig>
            </QueryProvider>
          </NetworkError>

          <Modal />
          <Toast />

          <div id="modal-root" />
          <div id="toast-root" />
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)} />
    </html>
  );
}
