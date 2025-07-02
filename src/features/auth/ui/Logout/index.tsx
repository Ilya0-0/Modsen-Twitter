'use client';

import { useModal } from '~/hooks/useModal';
import SecondaryButton from '~/shared/ui/Button/variants/SecondaryButton';
import ConfirmLogoutModal from '~/widgets/modal/ConfirmLogoutModal';

const Logout = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <SecondaryButton onClick={openModal}>Log out</SecondaryButton>
      {isOpen && <ConfirmLogoutModal onClose={closeModal} />}
    </>
  );
};

export default Logout;
