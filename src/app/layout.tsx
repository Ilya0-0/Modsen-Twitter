import { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { ClientProvider } from '~/shared/ui/ClientProvider';

import '~/styles/index.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
