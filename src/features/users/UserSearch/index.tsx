import Image from 'next/image';

import { PLACEHOLDERS } from '~/constants/placeholders';
import SearchInput from '~/shared/ui/Input/variants/SearchInput';

import styles from './styles.module.scss';

const PLACEHOLDER_WIDTH = 100;
const PLACEHOLDER_HEIGHT = 100;

const UserSearch = () => {
  return (
    <div className={styles.container}>
      <form>
        <SearchInput placeholder="Search Twitter" />
      </form>
      <ul className={styles.placeholder}>
        {PLACEHOLDERS.map(({ id, placeholder }) => (
          <li key={id} className={styles.imageWrapper}>
            <Image
              priority={true}
              src={placeholder}
              width={PLACEHOLDER_WIDTH}
              height={PLACEHOLDER_HEIGHT}
              alt=""
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
