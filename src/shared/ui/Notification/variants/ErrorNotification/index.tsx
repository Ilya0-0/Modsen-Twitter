import errorIcon from '~/public/svg/cross.svg?react';

import Notification from '../..';
import {
  NotificationProps,
  NotificationVariant,
} from '../../NotificationsProps.t';

const ErrorNotification = ({
  text,
  title,
  onClose,
}: Omit<NotificationProps, 'svgr' | 'variant'>) => {
  return (
    <Notification
      variant={NotificationVariant.Error}
      svgr={errorIcon}
      text={text}
      title={title}
      onClose={onClose}
    />
  );
};

export default ErrorNotification;
