'use client';

import { useRef } from 'react';

import { useClickOutside } from '~/hooks/useClickOutside';
import { useModal } from '~/hooks/useModal';

import AddTweetModal from '../modal/AddTweetModal';
import NavigationMenu from './NavigationMenu';
import ProfileNavFooter from './ProfileNavFooter';
import ProfileNavHeader from './ProfileNavHeader';
import styles from './styles.module.scss';

interface ProfileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileNav = ({ isOpen, onClose }: ProfileNavProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(false);

  useClickOutside(divRef, onClose);

  return (
    <>
      <div
        ref={divRef}
        className={`${styles.container} ${isOpen ? styles.open : styles.hidden}`}
      >
        <aside className={styles.aside}>
          <ProfileNavHeader />
          <NavigationMenu onClose={onClose} />
          <ProfileNavFooter onNewTweet={openModal} />
        </aside>
      </div>
      {isModalOpen && <AddTweetModal onClose={closeModal} />}
    </>
  );
};

export default ProfileNav;
