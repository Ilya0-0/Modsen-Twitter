import TweetSearch from '~/features/users/TweetSearch';
import YouMightLike from '~/features/users/YouMightLike';

import styles from './styles.module.scss';

const UserSuggestionsPanel = () => {
  return (
    <div className={styles.container}>
      <TweetSearch />
      <YouMightLike />
    </div>
  );
};

export default UserSuggestionsPanel;
