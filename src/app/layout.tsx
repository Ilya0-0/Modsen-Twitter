import { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { ClientProvider } from '~/shared/ui/ClientProvider';
import ThemeManager from '~/shared/ui/theme/ThemeManager';

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
        <ClientProvider>
          <ThemeManager>{children}</ThemeManager>
        </ClientProvider>
      </body>
    </html>
  );
}
