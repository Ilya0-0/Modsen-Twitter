import type { Metadata } from 'next';

import SignUpBanner from '~/widgets/SignUpBanner';
import SignUpForm from '~/widgets/SignUpForm';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Sign Up for Modsen Twitter',
  description:
    'Create your Modsen Twitter account to join the conversation and connect with people worldwide.',
  keywords: [
    'Modsen Twitter sign up',
    'Twitter sign up',
    'create account',
    'register',
  ],
  openGraph: {
    url: 'https://modsentwitterilya0-0.netlify.app/auth/signup',
    siteName: 'Modsen Twitter',
    type: 'website',
  },
};

const SignUp = () => {
  return (
    <div className={styles.container}>
      <SignUpBanner />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
