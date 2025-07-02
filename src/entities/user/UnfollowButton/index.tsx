import React from 'react';

import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import { useUnfollowUserMutation } from '~/store/supabaseApi';
import { getErrorMessage } from '~/utils/errorUtils';

interface UnfollowButtonProps {
  userId: string;
  onUnfollow: (userId: string) => void;
  onError: (userId: string, message: string) => void;
}

export const UnfollowButton = ({
  userId,
  onUnfollow,
  onError,
}: UnfollowButtonProps) => {
  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollow = async () => {
    onUnfollow(userId);
    try {
      await unfollowUser(userId).unwrap();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      onError(userId, errorMessage);
    }
  };

  return <PrimaryButton onClick={handleUnfollow}>Unfollow</PrimaryButton>;
};
