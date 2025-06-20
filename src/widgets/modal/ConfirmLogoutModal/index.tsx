import LogoutForm from '~/features/auth/ui/LogoutModal';
import Modal from '~/shared/ui/Modal';

import { ModalProps } from '../modal.t';

const ConfirmLogoutModal = ({ onClose }: ModalProps) => {
  return (
    <Modal onClose={onClose}>
      <LogoutForm onClose={onClose} />
    </Modal>
  );
};

export default ConfirmLogoutModal;
