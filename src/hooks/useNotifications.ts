import { NotificationVariant } from '~/shared/ui/Notification/NotificationsProps.t';
import { addNotification } from '~/store/notificationsSlice';

import { useAppDispatch } from './useAppDispatch';

const useNotifications = () => {
  const dispatch = useAppDispatch();

  const notify = (
    type: NotificationVariant,
    title: string,
    message: string
  ) => {
    dispatch(
      addNotification({
        type,
        title,
        message,
      })
    );
  };

  return {
    notifyError: (title: string, message: string) =>
      notify(NotificationVariant.Error, message, title),
    notifySuccess: (title: string, message: string) =>
      notify(NotificationVariant.Success, message, title),
  };
};

export default useNotifications;
