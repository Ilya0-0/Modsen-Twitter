'use client';

import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { login } from '~/features/auth/model/actions';
import useNotifications from '~/hooks/useNotifications';
import TwitterLogo from '~/public/svg/twitter-logo.svg?react';
import { loginSchema } from '~/schemas/loginSchema';
import PrimaryButton from '~/shared/ui/Button/variants/PrimaryButton';
import PrimaryInput from '~/shared/ui/Input/variants/PrimaryInput';

import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { notifyError } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    try {
      await login(formData);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        return;
      }

      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error.message as string)
          : 'Unknown error';

      notifyError('Login failed', errorMessage);
    }
  };

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      <TwitterLogo className={styles.logo} />
      <h1>Log in to Twitter</h1>
      <div className={styles.inputContainer}>
        <PrimaryInput
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Email address"
        />
        <PrimaryInput
          placeholder="Password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <PrimaryButton type="submit">Log In</PrimaryButton>
      <Link className={styles.highlight} href="/auth/sign-up">
        Sign up to Twitter
      </Link>
    </form>
  );
};

export default LoginForm;
