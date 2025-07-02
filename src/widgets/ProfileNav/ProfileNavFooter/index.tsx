import UserCard from '~/entities/user/UserCard';
import Logout from '~/features/auth/ui/Logout';
import { useGetMyProfileQuery } from '~/store/supabaseApi';

import AddTweetButton from '../../../features/tweet/AddTweetButton';
import styles from './styles.module.scss';

const ProfileNavFooter = () => {
  const { data: shortProfile, isLoading } = useGetMyProfileQuery();

  return (
    <footer className={styles.footer}>
      <AddTweetButton />
      <div className={styles.profileAndLogoutBtn}>
        <UserCard
          isUserLoading={isLoading}
          name={shortProfile?.name ?? ''}
          tgId={shortProfile?.tgId ?? ''}
          avatarUrl={shortProfile?.avatarUrl ?? null}
        />
        <Logout />
      </div>
    </footer>
  );
};

export default ProfileNavFooter;
