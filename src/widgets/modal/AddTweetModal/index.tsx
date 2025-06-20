import AddTweetForm from '~/features/tweet/AddTweetForm';
import Modal from '~/shared/ui/Modal';

import { ModalProps } from '../modal.t';

const AddTweetModal = ({ onClose }: ModalProps) => {
  return (
    <Modal title="Add new Tweet" onClose={onClose}>
      <AddTweetForm />
    </Modal>
  );
};

export default AddTweetModal;
