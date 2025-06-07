import Link from 'next/link';

import { SignUpWithEmail, SignUpWithGoogle } from '~/features/auth/ui';

import TwitterLogo from '/public/svg/twitter-logo.svg?react';

import styles from './AuthBlock.module.scss';

const AuthBlock = () => {
  return (
    <section className={styles.authContainer}>
      <TwitterLogo className={styles.logo} />
      <h1>Happening now</h1>
      <div className={styles.auth}>
        <h2>Join Twitter today</h2>
        <div className={styles.btnContainer}>
          <SignUpWithGoogle />
          <SignUpWithEmail />
        </div>
        <p>
          By signing up you agree to the{' '}
          <span className={styles.highlight}>Terms of Service</span>
          <span className={styles.spacedParagraph} /> and{' '}
          <span className={styles.highlight}>Privacy Policy</span>, including{' '}
          <span className={styles.highlight}>Cookie Use</span>.
        </p>
        <p>
          Already have an account?{' '}
          <Link className={styles.highlight} href="/login">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthBlock;
