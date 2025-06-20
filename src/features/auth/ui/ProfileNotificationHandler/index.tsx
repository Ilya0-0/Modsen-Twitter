'use client';

import { useEffect } from 'react';

import useNotifications from '~/hooks/useNotifications';

interface ProfileNotificationHandlerProps {
  errorMessage?: string;
}

const ProfileNotificationHandler = ({
  errorMessage,
}: ProfileNotificationHandlerProps) => {
  const { notifyError } = useNotifications();

  useEffect(() => {
    if (errorMessage) {
      notifyError('Profile Error', errorMessage);
    }
  }, [notifyError, errorMessage]);

  return null;
};

export default ProfileNotificationHandler;
