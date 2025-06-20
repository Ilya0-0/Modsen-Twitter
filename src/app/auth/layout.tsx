import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Footer from '~/shared/ui/Footer';

import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Authentication - Modsen Twitter',
  description: 'Manage your Modsen Twitter account: log in and sign up.',
  keywords: [
    'Modsen Twitter',
    'Twitter',
    'auth',
    'authentication',
    'login',
    'signup',
    'account',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Modsen Twitter',
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.pageLayout}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
