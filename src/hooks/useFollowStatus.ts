import { useCallback, useState } from 'react';

import useNotifications from './useNotifications';

interface UseFollowStatusResult {
  followedUsers: Set<string>;
  handleFollowOptimistic: (userId: string) => void;
  handleFollowErrorRollback: (userId: string, message: string) => void;
  handleUnfollowOptimistic: (userId: string) => void;
  handleUnfollowErrorRollback: (userId: string, message: string) => void;
}

export const useFollowStatus = (): UseFollowStatusResult => {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const { notifyError } = useNotifications();

  const handleFollowOptimistic = useCallback((userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.add(userId);
      return newSet;
    });
  }, []);

  const handleFollowErrorRollback = useCallback(
    (userId: string, message: string) => {
      setFollowedUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
      notifyError('Failed follow', message);
    },
    [notifyError]
  );

  const handleUnfollowOptimistic = useCallback((userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  }, []);

  const handleUnfollowErrorRollback = useCallback(
    (userId: string, message: string) => {
      setFollowedUsers((prev) => {
        const newSet = new Set(prev);
        newSet.add(userId);
        return newSet;
      });
      notifyError('Failed unfollow', message);
    },
    [notifyError]
  );

  return {
    followedUsers,
    handleFollowOptimistic,
    handleFollowErrorRollback,
    handleUnfollowOptimistic,
    handleUnfollowErrorRollback,
  };
};
