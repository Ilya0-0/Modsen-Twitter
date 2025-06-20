import { MouseEvent } from 'react';

import styles from './styles.module.scss';

type BurgerMenuProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  };

  return (
    <button className={styles.burgerContainer} onClick={handleClick}>
      <span className={styles.burgerItem} />
      <span className={styles.burgerItem} />
      <span className={styles.burgerItem} />
    </button>
  );
};

export default BurgerMenu;
