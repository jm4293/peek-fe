import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { Modal, Toast } from '@/components/modal';

import { NetworkError } from '@/lib/network-error';
import QueryProvider from '@/lib/react-query/react-query.config';

import './globals.css';

export const metadata: Metadata = {
  title: 'Stock Peek',
  description: '실시간 주식 정보 Stock Peek 서비스입니다.',
  keywords: '주식, 실시간, stock',
  verification: {
    google: 'uJW_8OCDzvQJqQgfYwsslu44VsruK8gm346PCn8lVKE',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Stock Peek - 주식 정보 서비스',
    images: {
      url: '/peek-logo.png',
    },
    description: '실시간 주식 정보와 분석을 제공합니다.',
    url: 'https://stock.peek.run',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <NetworkError>
          <QueryProvider>
            {/*<MessagingConfig>*/}
            {children}
            {/*</MessagingConfig>*/}
          </QueryProvider>
        </NetworkError>

        <Modal />
        <Toast />

        <div id="modal-root" />
        <div id="toast-root" />
      </body>

      <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)} />
    </html>
  );
}

{
  /* <meta name="google-site-verification" content="uJW_8OCDzvQJqQgfYwsslu44VsruK8gm346PCn8lVKE" /> */
}
