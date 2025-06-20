'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import TwitterLogo from '~/public/svg/twitter-logo.svg?react';
import OutlineGrayButton from '~/shared/ui/Button/variants/OutlineGrayButton';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import { createClient } from '~/utils/supabase/client';

import styles from './styles.module.scss';

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const message = searchParams?.get('message');
  const router = useRouter();

  useEffect(() => {
    if (message) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [message]);

  const handleRefresh = () => {
    router.refresh();
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <main className={styles.errorContainer}>
      <div className={styles.logo}>
        <TwitterLogo />
      </div>
      <section className={styles.errorBody}>
        <div className={styles.messageBlock} aria-live="polite">
          <h1>Oops! Something Went Wrong</h1>
          {message ? <p>{message}</p> : <p>An unexpected error occurred.</p>}
        </div>
        <div className={styles.buttonContainer}>
          <PrimaryButton onClick={handleRefresh}>Refresh</PrimaryButton>
          <OutlineGrayButton onClick={handleLogout}>Log Out</OutlineGrayButton>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
