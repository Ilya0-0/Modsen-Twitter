import { useAppSelector } from '~/hooks/useAppSelector';
import { useGetPostCountQuery } from '~/store/supabaseApi';
import Skeleton from '~/widgets/Skeleton';
import { SkeletonSize } from '~/widgets/Skeleton/skeletonSize.t';

import styles from './styles.module.scss';

const ProfileHeader = () => {
  const { id, name } = useAppSelector((store) => store.user);
  const {
    data: postCount,
    isLoading: isPostsLoading,
    isUninitialized,
  } = useGetPostCountQuery(id!, { skip: !id });

  return (
    <>
      <span>{name}</span>
      <p className={styles.skeletonLoading}>
        {isPostsLoading || isUninitialized ? (
          <Skeleton heightSize={SkeletonSize.Small} />
        ) : (
          `${postCount} Tweets`
        )}
      </p>
    </>
  );
};

export default ProfileHeader;
