'use client';

import { useAppSelector } from '~/hooks/useAppSelector';
import BurgerMenu from '~/shared/ui/BurgerMenu';
import ThemeToggle from '~/shared/ui/theme/ThemeToggle';
import { useGetPostCountQuery } from '~/store/supabaseApi';

import Skeleton from '../Skeleton';
import { SkeletonSize } from '../Skeleton/skeletonSize.t';
import styles from './styles.module.scss';

const AppHeader = ({ onBurgerClick }: { onBurgerClick: () => void }) => {
  const { id, name } = useAppSelector((store) => store.user);
  const handleBurgerClick = () => {
    onBurgerClick();
  };

  const {
    data: postCount,
    isLoading: isPostsLoading,
    isUninitialized,
  } = useGetPostCountQuery(id!, { skip: !id });

  return (
    <header className={styles.header}>
      <div className={styles.description}>
        <span>{name}</span>
        <p className={styles.skeletonLoading}>
          {isPostsLoading || isUninitialized ? (
            <Skeleton heightSize={SkeletonSize.Small} />
          ) : (
            `${postCount} Tweets`
          )}
        </p>
      </div>
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
