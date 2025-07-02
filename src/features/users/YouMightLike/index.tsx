'use client';

import { useState } from 'react';

import { FollowButton } from '~/entities/user/FollowButton';
import { UnfollowButton } from '~/entities/user/UnfollowButton';
import UserCard from '~/entities/user/UserCard';
import { useFollowStatus } from '~/hooks/useFollowStatus';
import StatusMessage from '~/shared/ui/StatusMessage';
import { useGetRecommendedUsersQuery } from '~/store/supabaseApi';

import styles from './styles.module.scss';

const MAX_COUNT_USERS = 3;
const SHOW_MORE_TEXT = 'Show more';
const HIDE_TEXT = 'Hide';

const YouMightLike = () => {
  const { data: recommendedUsers = [], isLoading } =
    useGetRecommendedUsersQuery();
  const [isShowAll, setIsShowAll] = useState(false);

  const {
    followedUsers,
    handleFollowOptimistic,
    handleFollowErrorRollback,
    handleUnfollowOptimistic,
    handleUnfollowErrorRollback,
  } = useFollowStatus();

  const handleToggleShowMore = () => {
    setIsShowAll((prev) => !prev);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {Array(MAX_COUNT_USERS)
            .fill(null)
            .map((_, i) => (
              <UserCard key={i} isUserLoading={true} />
            ))}
        </>
      );
    }

    if (recommendedUsers.length === 0) {
      return (
        <StatusMessage className={styles.fetchStatus}>No users.</StatusMessage>
      );
    }

    const visibleUsers = isShowAll
      ? recommendedUsers
      : recommendedUsers.slice(0, MAX_COUNT_USERS);

    return (
      <>
        <ul className={styles.users}>
          {visibleUsers.map(({ id, ...userWithoutId }) => (
            <li key={id}>
              <UserCard {...userWithoutId} />
              {followedUsers.has(id) ? (
                <UnfollowButton
                  userId={id}
                  onUnfollow={handleUnfollowOptimistic}
                  onError={handleUnfollowErrorRollback}
                />
              ) : (
                <FollowButton
                  userId={id}
                  onFollow={handleFollowOptimistic}
                  onError={handleFollowErrorRollback}
                />
              )}
            </li>
          ))}
        </ul>
        {recommendedUsers.length > MAX_COUNT_USERS && (
          <button onClick={handleToggleShowMore} className={styles.showMore}>
            {isShowAll ? HIDE_TEXT : SHOW_MORE_TEXT}
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mightLike}>
        <h3>You might like</h3>
        {renderContent()}
      </div>
      <p className={styles.mightLikeFooter}>
        Modsen Twitter © 2025 Twitter, Inc.
      </p>
    </div>
  );
};

export default YouMightLike;
