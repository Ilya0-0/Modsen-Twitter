import type { Metadata } from 'next';

import LoginBanner from '~/widgets/LoginBanner';
import LoginForm from '~/widgets/LoginForm';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Log In to Modsen Twitter',
  description:
    'Log in to your Modsen Twitter account to start sharing and connecting with your world.',
  keywords: [
    'Modsed Twitter login',
    'Twitter login',
    'sign in',
    'account access',
  ],
  openGraph: {
    url: 'https://modsentwitterilya0-0.netlify.app/auth/login',
    siteName: 'Modsen Twitter',
    type: 'website',
  },
};

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginBanner />
      <LoginForm />
    </div>
  );
};

export default Login;
