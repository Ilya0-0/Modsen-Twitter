'use client';

import { useRouter } from 'next/navigation';

import OutlinePrimaryButton from '~/shared/ui/Button/variants/OutlinePrimaryButton';

const SignUpWithEmail = () => {
  const router = useRouter();

  const onLoginPageRedirect = () => {
    router.push('/auth/sign-up');
  };

  return (
    <OutlinePrimaryButton onClick={onLoginPageRedirect}>
      <span>Sign up with email</span>
    </OutlinePrimaryButton>
  );
};

export default SignUpWithEmail;
