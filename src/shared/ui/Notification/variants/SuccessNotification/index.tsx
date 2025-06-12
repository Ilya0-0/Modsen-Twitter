import successIcon from '~/public/svg/checkmark.svg?react';

import Notification from '../..';
import {
  NotificationProps,
  NotificationVariant,
} from '../../NotificationsProps.t';

const SuccesNotification = ({
  text,
  title,
  onClose,
}: Omit<NotificationProps, 'svgr' | 'variant'>) => {
  return (
    <Notification
      variant={NotificationVariant.Success}
      svgr={successIcon}
      text={text}
      title={title}
      onClose={onClose}
    />
  );
};

export default SuccesNotification;
