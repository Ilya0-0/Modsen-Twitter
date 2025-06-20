'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { NotificationVariant } from '~/shared/ui/Notification/NotificationsProps.t';
import ErrorNotification from '~/shared/ui/Notification/variants/ErrorNotification';
import SuccessNotification from '~/shared/ui/Notification/variants/SuccessNotification';
import { removeNotification } from '~/store/notificationsSlice';

const TTL_NOTIFICATION = 5000;

export function NotificationManager() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      const timeout = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, TTL_NOTIFICATION);
      return () => clearTimeout(timeout);
    });
  }, [notifications, dispatch]);

  return (
    <>
      {notifications.map((notification) => {
        switch (notification.type) {
          case NotificationVariant.Success:
            return (
              <SuccessNotification
                key={notification.id}
                title={notification.title}
                text={notification.message}
                onClose={() => dispatch(removeNotification(notification.id))}
              />
            );
          case NotificationVariant.Error:
            return (
              <ErrorNotification
                key={notification.id}
                title={notification.title}
                text={notification.message}
                onClose={() => dispatch(removeNotification(notification.id))}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
