'use client';

import { redirect, RedirectType } from 'next/navigation';

import { useAppSelector } from '~/hooks/useAppSelector';
import ArrowLeft from '~/public/svg/arrow-left.svg';

import styles from './styles.module.scss';

const FallbackHeader = () => {
  const userId = useAppSelector((store) => store.user.id);
  const handleBackRedirect = () => {
    redirect(`/profile/${userId}`, RedirectType.push);
  };

  return (
    <div className={styles.container} onClick={handleBackRedirect}>
      <ArrowLeft />
      <span>Back</span>
    </div>
  );
};

export default FallbackHeader;
