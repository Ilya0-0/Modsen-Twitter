import { ReactNode } from 'react';

import Footer from '~/shared/ui/Footer';

import styles from './layout.module.scss';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.pageLayout}>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
