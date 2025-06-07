import Link from 'next/link';

import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import PrimaryInput from '~/shared/ui/Input/variants/PrimaryInput';

import TwitterLogo from '/public/svg/twitter-logo.svg?react';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <section className={styles.loginContainer}>
      <TwitterLogo className={styles.logo} />
      <h1>Log in to Twitter</h1>
      <div className={styles.inputContainer}>
        <PrimaryInput placeholder="Phone number, email address" />
        <PrimaryInput
          error="Password must contain a minimum of 8 characters, 1 lower case letter, 1 upper case letter"
          placeholder="Password"
        />
      </div>
      <PrimaryButton>Log In</PrimaryButton>
      <Link className={styles.highlight} href="/sign-up">
        Sign up to Twitter
      </Link>
    </section>
  );
};

export default LoginForm;
