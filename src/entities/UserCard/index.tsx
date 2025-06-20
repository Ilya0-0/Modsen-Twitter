import UserAvatar from '~/widgets/UserAvatar';

import styles from './styles.module.scss';

const UserCard = () => {
  return (
    <article className={styles.card}>
      <UserAvatar />
      <div className={styles.user}>
        <span className={styles.userName}>Ivan Ivanow</span>
        <p className={styles.userId}>@IvanIvanov</p>
      </div>
    </article>
  );
};

export default UserCard;
