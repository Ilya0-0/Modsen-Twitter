'use client';

import { ReactNode, useState } from 'react';

import AppHeader from '~/widgets/AppHeader';
import ProfileNav from '~/widgets/ProfileNav';
import UserSuggestionsPanel from '~/widgets/UserSuggestionsPanel';

import styles from './layout.module.scss';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  const toggleNav = () => setIsNavOpen((prev) => !prev);

  return (
    <div className={styles.pageLayout}>
      <ProfileNav isOpen={isNavOpen} onClose={handleCloseNav} />
      <div className={styles.headerAndMain}>
        <AppHeader onBurgerClick={toggleNav} />
        <main>{children}</main>
      </div>
      <aside className={styles.suggestionsPanel}>
        <UserSuggestionsPanel />
      </aside>
    </div>
  );
};

export default DashboardLayout;
