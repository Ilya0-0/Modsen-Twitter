'use client';

import UserCard from '~/entities/UserCard';
import Logout from '~/features/auth/ui/Logout';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';

import styles from './styles.module.scss';

interface ProfileNavFooterProps {
  onNewTweet: () => void;
}

const ProfileNavFooter = ({ onNewTweet }: ProfileNavFooterProps) => {
  return (
    <footer>
      <PrimaryButton onClick={onNewTweet}>New tweet</PrimaryButton>
      <div className={styles.profileAndLogoutBtn}>
        <UserCard />
        <Logout />
      </div>
    </footer>
  );
};

export default ProfileNavFooter;
