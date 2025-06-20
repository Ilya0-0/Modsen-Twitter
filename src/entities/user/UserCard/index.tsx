import { ShortProfile } from '~/store/types/shortUser';
import Skeleton from '~/widgets/Skeleton';
import { SkeletonSize } from '~/widgets/Skeleton/skeletonSize.t';
import UserAvatar from '~/widgets/UserAvatar';

import styles from './styles.module.scss';

interface UserCardProps extends Partial<Omit<ShortProfile, 'id'>> {
  isUserLoading?: boolean;
}

const UserCard = ({ name, tgId, avatarUrl, isUserLoading }: UserCardProps) => {
  return (
    <article className={styles.card}>
      <UserAvatar avatarUrl={avatarUrl || null} />
      <div className={styles.user}>
        {isUserLoading ? (
          <>
            <Skeleton heightSize={SkeletonSize.Small} />
            <Skeleton heightSize={SkeletonSize.Small} />
          </>
        ) : (
          <>
            <span className={styles.userName}>{name}</span>
            <p className={styles.userId}>{tgId}</p>
          </>
        )}
      </div>
    </article>
  );
};

export default UserCard;
