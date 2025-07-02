'use client';

import { useRouter } from 'next/navigation';

import SquareOutlineGrayButton from '~/shared/ui/Button/variants/SquareOutlineGrayButton';
import SquarePrimaryButton from '~/shared/ui/Button/variants/SquarePrimaryButton';
import { createClient } from '~/utils/supabase/client';

import styles from './styles.module.scss';

interface LogoutFormProps {
  onClose: () => void;
}

const LogoutForm = ({ onClose }: LogoutFormProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <div className={styles.flexRow}>
      <p>Do you really want to get out?</p>
      <div className={styles.buttons}>
        <SquareOutlineGrayButton onClick={onClose}>No</SquareOutlineGrayButton>
        <SquarePrimaryButton onClick={handleLogout}>Yes</SquarePrimaryButton>
      </div>
    </div>
  );
};

export default LogoutForm;
