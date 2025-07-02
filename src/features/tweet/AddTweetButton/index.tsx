'use client';

import { useModal } from '~/hooks/useModal';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import AddTweetModal from '~/widgets/modal/AddTweetModal';

const AddTweetButton = () => {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <PrimaryButton onClick={openModal}>New tweet</PrimaryButton>
      {isModalOpen && <AddTweetModal onClose={closeModal} />}
    </>
  );
};

export default AddTweetButton;
