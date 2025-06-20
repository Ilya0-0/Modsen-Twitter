import TwitterLogo from '~/public/svg/twitter-logo.svg?react';
import SearchInput from '~/shared/ui/Input/variants/SearchInput';
import ThemeToggle from '~/shared/ui/theme/ThemeToggle';

import styles from './styles.module.scss';

const ProfileNavHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoAndSwitch}>
        <TwitterLogo className={styles.logo} />
        <div className={styles.switchContainer}>
          <ThemeToggle />
        </div>
      </div>
      <div className={styles.searchContainer}>
        <SearchInput placeholder="Search Twitter" />
      </div>
    </header>
  );
};

export default ProfileNavHeader;
