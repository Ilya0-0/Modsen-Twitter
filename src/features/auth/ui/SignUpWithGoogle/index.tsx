import OutlinePrimaryButton from '~/shared/ui/Button/variants/OutlinePrimaryButton';

import GoogleLogo from '/public/svg/google-logo.svg?react';

import styles from './styles.module.scss';

const SignUpWithGoogle = () => {
  return (
    <OutlinePrimaryButton className={styles.googleAuth}>
      <GoogleLogo />
      <span>Sign up with Google</span>
    </OutlinePrimaryButton>
  );
};

export default SignUpWithGoogle;
