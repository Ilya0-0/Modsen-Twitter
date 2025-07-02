import Image from 'next/image';

import Avatar from '~/public/svg/profile.svg?react';

import styles from './styles.module.scss';

interface UserAvatarProps {
  avatarUrl: string | null;
}

const UserAvatar = ({ avatarUrl }: UserAvatarProps) => {
  return (
    <div className={`${styles.avatar} ${avatarUrl && styles.hasAvatar}`}>
      {avatarUrl ? <Image src={avatarUrl} fill alt="avatar" /> : <Avatar />}
    </div>
  );
};

export default UserAvatar;
