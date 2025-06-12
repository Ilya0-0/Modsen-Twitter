'use client';

import { NotificationProps, NotificationVariant } from './NotificationsProps.t';
import styles from './styles.module.scss';

const Notification = ({
  svgr: Icon,
  title,
  text,
  variant = NotificationVariant.Success,
  onClose,
}: NotificationProps) => {
  return (
    <div onClick={onClose} className={`${styles.container} ${styles[variant]}`}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.body}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Notification;
