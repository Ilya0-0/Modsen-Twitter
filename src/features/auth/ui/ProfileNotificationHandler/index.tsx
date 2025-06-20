'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { NotificationVariant } from '~/shared/ui/Notification/NotificationsProps.t';
import { addNotification } from '~/store/notificationsSlice';

interface ProfileNotificationHandlerProps {
  errorMessage?: string;
}

const ProfileNotificationHandler = ({
  errorMessage,
}: ProfileNotificationHandlerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessage) {
      dispatch(
        addNotification({
          type: NotificationVariant.Error,
          title: 'Profile Error',
          message: errorMessage,
        })
      );
    }
  }, [dispatch, errorMessage]);

  return null;
};

export default ProfileNotificationHandler;
