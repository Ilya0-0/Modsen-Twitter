import type { Metadata } from 'next';

import AuthBlock from '~/widgets/AuthBlock';
import SignUpMainBanner from '~/widgets/SignUpMainBanner';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Join Modsen Twitter Today',
  description:
    'Connect with your world. Sign up for Modsen Twitter to discover trending topics, follow your interests, and share your voice.',
  keywords: [
    'Modsen Twitter join',
    'Twitter join',
    'new account',
    'social media',
    'connect',
  ],
  openGraph: {
    url: 'https://modsentwitterilya0-0.netlify.app/auth/signup-main',
    siteName: 'Modsen Twitter',
    type: 'website',
  },
};

const SignUpMain = () => {
  return (
    <div className={styles.container}>
      <SignUpMainBanner />
      <AuthBlock />
    </div>
  );
};

export default SignUpMain;
