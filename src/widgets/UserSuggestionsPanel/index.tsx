import UserSearch from '~/features/users/UserSearch';
import YouMightLike from '~/features/users/YouMightLike';

import styles from './styles.module.scss';

const UserSuggestionsPanel = () => {
  return (
    <div className={styles.container}>
      <UserSearch />
      <YouMightLike />
    </div>
  );
};

export default UserSuggestionsPanel;
