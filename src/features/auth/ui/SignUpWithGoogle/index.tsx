'use client';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import GoogleLogo from '~/public/svg/google-logo.svg?react';
import OutlinePrimaryButton from '~/shared/ui/Button/variants/OutlinePrimaryButton';
import { NotificationVariant } from '~/shared/ui/Notification/NotificationsProps.t';
import { addNotification } from '~/store/notificationsSlice';
import { createClient } from '~/utils/supabase/client';

import styles from './styles.module.scss';

const SignUpWithGoogle = () => {
  const dispatch = useAppDispatch();
  const handleGoogleSignUp = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      dispatch(
        addNotification({
          type: NotificationVariant.Error,
          title: 'Error Google auth',
          message: error.message,
        })
      );
    }
  };

  return (
    <OutlinePrimaryButton
      onClick={handleGoogleSignUp}
      className={styles.googleAuth}
    >
      <GoogleLogo />
      <span>Sign up with Google</span>
    </OutlinePrimaryButton>
  );
};

export default SignUpWithGoogle;
