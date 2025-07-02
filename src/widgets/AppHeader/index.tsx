'use client';

import { JSX } from 'react';

import { usePathname } from 'next/navigation';

import FallbackHeader from '~/features/header/FallbackHeader';
import HomeHeader from '~/features/header/HomeHeader';
import ProfileHeader from '~/features/header/ProfileHeader';
import BurgerMenu from '~/shared/ui/BurgerMenu';
import ThemeToggle from '~/shared/ui/theme/ThemeToggle';

import styles from './styles.module.scss';

const enum AppRoutes {
  Profile = '/profile',
  Home = '/home',
  CatchAll = 'catchAll',
}

type AppHeaderConfig = Record<AppRoutes, JSX.Element>;

const config: AppHeaderConfig = {
  ['/profile']: <ProfileHeader />,
  ['/home']: <HomeHeader />,
  ['catchAll']: <FallbackHeader />,
};

const AppHeader = ({ onBurgerClick }: { onBurgerClick: () => void }) => {
  const pathname = usePathname();

  const handleBurgerClick = () => {
    onBurgerClick();
  };

  const renderHeader = () => {
    for (const [route, component] of Object.entries(config)) {
      if (pathname.startsWith(route)) return component;
    }

    return config.catchAll;
  };

  return (
    <header className={styles.header}>
      <div className={styles.description}>{renderHeader()}</div>
      <div className={styles.switchContainer}>
        <ThemeToggle />
      </div>
      <div className={styles.burgerContainer}>
        <BurgerMenu onClick={handleBurgerClick} />
      </div>
    </header>
  );
};

export default AppHeader;
