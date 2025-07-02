import React from 'react';

import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import { useFollowUserMutation } from '~/store/supabaseApi';
import { getErrorMessage } from '~/utils/errorUtils';

interface FollowButtonProps {
  userId: string;
  onFollow: (userId: string) => void;
  onError: (userId: string, message: string) => void;
}

export const FollowButton = ({
  userId,
  onFollow,
  onError,
}: FollowButtonProps) => {
  const [followUser] = useFollowUserMutation();

  const handleFollow = async () => {
    onFollow(userId);
    try {
      await followUser(userId).unwrap();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      onError(userId, errorMessage);
    }
  };

  return <PrimaryButton onClick={handleFollow}>Follow</PrimaryButton>;
};
