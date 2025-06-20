import React from 'react';

import { SkeletonSize } from './skeletonSize.t';
import styles from './styles.module.scss';

interface SkeletonProps {
  heightSize?: SkeletonSize;
}

const Skeleton = ({ heightSize }: SkeletonProps) => {
  return (
    <span
      className={`${styles.wrapper} ${heightSize && styles[heightSize as string]}`}
    />
  );
};

export default Skeleton;
