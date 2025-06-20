import UserCard from '~/entities/UserCard';

import styles from './styles.module.scss';

const YouMightLike = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.mightLike}>
        <h3>You might like</h3>
        <ul className={styles.users}>
          <li>
            <UserCard />
          </li>
          <li>
            <UserCard />
          </li>
        </ul>

        <button className={styles.showMore}>Show more</button>
      </div>
      <p className={styles.mightLikeFooter}>
        Modsen Twitter © 2025 Twitter, Inc.
      </p>
    </aside>
  );
};

export default YouMightLike;
