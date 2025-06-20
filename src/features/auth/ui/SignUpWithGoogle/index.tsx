'use client';

import useNotifications from '~/hooks/useNotifications';
import GoogleLogo from '~/public/svg/google-logo.svg?react';
import OutlinePrimaryButton from '~/shared/ui/Button/variants/OutlinePrimaryButton';
import { createClient } from '~/utils/supabase/client';

import styles from './styles.module.scss';

const SignUpWithGoogle = () => {
  const { notifyError } = useNotifications();

  const handleGoogleSignUp = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      notifyError('Error Google auth', error.message);
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
