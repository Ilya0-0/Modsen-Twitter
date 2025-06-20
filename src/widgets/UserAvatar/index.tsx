import Avatar from '~/public/svg/profile.svg?react';

import styles from './styles.module.scss';

const UserAvatar = () => {
  return (
    <div className={styles.avatar}>
      <Avatar />
    </div>
  );
};

export default UserAvatar;
